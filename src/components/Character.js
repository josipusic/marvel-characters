import React, {useState} from 'react'

export default function Character({imgUrl, characterName}) {
    const favourite = window.localStorage.getItem(characterName) ? true : false
    const [isFavourite, setIsFavourite] = useState(favourite)
    
    const toggleIsFavourite = () => {
        setIsFavourite(isFavourite => {
            if (!isFavourite) {
                window.localStorage.setItem(characterName, imgUrl)
            } else {
                window.localStorage.removeItem(characterName)
            }
            return !isFavourite
        })
    }

    // trip description in parentheses for better appearance
    [characterName] = characterName.split('(')

    return (
        <div className='card'>
            <div className='card-image' style={{backgroundImage: `url(${imgUrl})`}}></div>
            <div className='card-footer'>
                <p className='card-name'>{characterName}</p>
                <button className='favourite-btn' onClick={toggleIsFavourite}>
                    <i className={`${isFavourite ? 'fas' : 'far'} fa-heart`}></i>
                </button>
            </div>
        </div>
    )
}
