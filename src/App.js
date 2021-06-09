import './index.css'

import React, {useContext} from 'react'
import {Context} from './Context'

import Characters from './components/Characters'
import Pagination from './components/Pagination'


function App() {
    const {searchText, handleSearchTextChange, displaySearchResults} = useContext(Context)

    return (
        <div className='main-grid'>
            <input
                className='search-bar'
                type='text'
                onChange={e => handleSearchTextChange(e)}
                value={searchText}
                placeholder='Find marvel character...'
            >
            </input>

            <div className='cards-grid'>
                <Characters />
            </div>

            <div className='pagination'>
                <Pagination />
            </div>
            
            <div className='search-results'>
                {displaySearchResults()}
            </div>
        </div>
    )
}

export default App
