import AlphabethPlaceholder from './Components/AlphabethPlaceholder'
import AlphabethButton from './Components/AlphabethButton'
import { useEffect, useState } from 'react'

function App() {
  const [ isCorrect, setIsCorrect ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentWord, setCurrentWord ] = useState<string>('')
  const [ word, setWord ] = useState<string>('')
  const [ lives, setLives ] = useState<number>(9)
  const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.match(/[a-z]/i)) {
        if (word.includes(event.key)) return
        addChara(event.key);
      } 
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchWord = async () => {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1')

    const data = await response.json()

    if (!response.ok) {
        alert('Error fetching word! Click ok to try again.')
        fetchWord()
    } else {
      setCurrentWord(data[0])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWord()
  }, [isCorrect])

  useEffect(() => {
    if (lives > 0) return

    alert('You have ran out of chances, click ok to restart the game.')
    setLives(9)
    fetchWord()
  }, [lives])

  useEffect(() => {
    if (currentWord === '') return

    let allContained = true;
    for (let char of currentWord) {
      if (word.indexOf(char) === -1) { // Or !mainString.includes(char)
        allContained = false;
        break;
      }
    }

    if (allContained) {
      alert('Correct! The chosen word is ' + currentWord)
      setWord('')
      fetchWord()
      setLives(9)
    }
  }, [word])

  const addChara = (chara: string) => {
    console.log(currentWord)
    console.log(currentWord.includes(chara))
    console.log(word)
    if (currentWord.includes(chara)) {
      console.log('object')
      setWord(word + chara)
    } else {
      setLives(prev => prev - 1)
    }
  }

  return (
    <div className='w-full md:w-1/2 flex items-center m-8 flex-col mx-auto'>
      <h1 className='text-5xl font-bold mb-4'>Hangman</h1>
      <p>Chances left: { lives }</p>

      <div className='flex mb-8 h-fit m-12'>
        {
          (isLoading || currentWord === '') ? 
            <p>Loading...</p>
            :
            <div className='flex flex-wrap gap-2 justify-center'>
                {
                    currentWord.split('').map((chara, index) => (
                      <AlphabethPlaceholder
                        key={index}
                        chara={chara}
                        word={word}
                        currentWord={currentWord}
                      />
                    ))
                }
            </div>
        }
      </div>

      <div className='flex flex-wrap gap-2 justify-center mx-8'>
          {
            alphabets.map((chara, index) => (
              <AlphabethButton 
                key={index}
                word={word}
                chara={chara}  
                currentWord={currentWord}
                addChara={addChara}
              />
            ))
          }
      </div>
    </div>
  )
}

export default App
