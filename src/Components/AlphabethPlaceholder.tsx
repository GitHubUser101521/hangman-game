type AlphabethPlaceholderType = {
    chara: string
    word: string
    currentWord: string
}

function AlphabethPlaceholder({ chara, word, currentWord }: AlphabethPlaceholderType) {
  return (
    <div className='w-12 aspect-square lg:w-14 rounded-lg border-2 flex justify-center items-center text-2xl'>
        {
            word.includes(chara) && currentWord.includes(chara) ?
            <p>{ chara }</p>
            :
            <></>
        }
    </div>
  )
}

export default AlphabethPlaceholder
