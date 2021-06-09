import React, {useContext} from 'react'
import {Context} from '../Context'

export default function PaginationButton({pageNum}) {
    const {handlePageClick} = useContext(Context)

    return (
        <button 
            onClick={e => handlePageClick(e)}
            value={pageNum}
        >
            {pageNum}
        </button>
    )
}
