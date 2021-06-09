import React, {useContext} from 'react'
import {Context} from '../Context'
import Character from './Character'

export default function Characters() {
    const {searchText, charactersData, bookmarkedCharactersStride} = useContext(Context)

    if (searchText) {
        return charactersData.map(c => {
            const {path, extension} = c.thumbnail
            const img = `${path}.${extension}`
            return <Character key={c.id} imgUrl={img} characterName={c.name}/>
    })
    // if the text search is empty check for bookmarked characters and return them
    } else {
        const characters = []
        const ls = window.localStorage
        const {start, end} = bookmarkedCharactersStride(ls)
        for (let i = start; i < end; i++) {
            let cName = ls.key(i)
            let img = ls.getItem(cName)
            characters.push(<Character key={i} imgUrl={img} characterName={cName}/>)
        }
        return characters
    }
}
