import React, {useContext} from 'react'
import {Context} from '../Context'
import PaginationButton from './PaginationButton'

export default function Pagination() {
    const {calcNumOfPages} = useContext(Context)

    // create pagination
    const pagination = []
    for (let i = 0; i < calcNumOfPages(); i++) {
        pagination.push(<PaginationButton key={i} pageNum={i + 1}></PaginationButton>)
    }
    return pagination
}
