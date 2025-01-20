
type AlphabethButtonType = {
    word: string
    chara: string
    currentWord: string
    addChara: (chara: string) => void
}

function AlphabethButton({ word, chara, addChara, currentWord }: AlphabethButtonType ) {
    const check = () => {
        if (word.includes(chara) && !currentWord.includes(chara)) {
            return 'pointer-events-none opacity-55 bg-red-200'
        } else if (word.includes(chara) && currentWord.includes(chara)) {
            return 'pointer-events-none bg-green-200'
        } else {
            return 'bg-blue-200'
        }
    }
  return (
    <div 
        className={`Al-btn ${check()}`}
        onClick={() => addChara(chara)}
    >
        { chara }
    </div>
  )
}

export default AlphabethButton
