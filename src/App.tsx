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
        if (word.includes(event.key)) return

        if (event.key.match(/[a-z]/i)) {
            const charaToAdd = event.key.toString()
            addChara(charaToAdd)
        } 
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [word])

  const fetchWord = async () => {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1')

    const data = await response.json()

    if (!response.ok) {
        alert('Error fetching word! Click ok to try again.')
        fetchWord()
    } else {
      setCurrentWord(data[0])
      setIsLoading(false)
      setIsCorrect(false)
      setWord('')
    }
  }

  useEffect(() => {
    fetchWord()
  }, [isCorrect])

  useEffect(() => {
    if (lives > 0) return

    alert('You have ran out of chances, the word was ' + currentWord)
    setLives(9)
    fetchWord()
  }, [lives])

  useEffect(() => {
    console.log(word)
    if (currentWord === '') return
    
    let allContained = true;
    for (let char of currentWord) {
      if (word.indexOf(char) === -1) { 
        allContained = false;
        break;
      }
    }

    if (allContained) {
      alert('Correct! The chosen word is ' + currentWord)
      setWord('')
      setLives(9)
      fetchWord()
      setIsCorrect(true)
    }
  }, [word])

  const addChara = (chara: string) => {
    setWord(prev => prev + chara)

    if (!currentWord.includes(chara)) {
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
