import React, {useState, useEffect} from 'react'
const Context = React.createContext()

function ContextProvider({children}) {
    const [isTyping, setIsTyping] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [charactersData, setCharactersData] = useState([])
    const [count, setCount] = useState(0)
    const [limit, setLimit] = useState(20)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(0)

    const apiKey = 'd93a74ecd551c21a14c6097b16d4d766'
    const queryString = `nameStartsWith=${searchText}&limit=${limit}&offset=${offset}&apikey=${apiKey}`
    const url = `https://gateway.marvel.com:443/v1/public/characters?${queryString}`

    useEffect(()=> {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setIsTyping(true)
        const timer = setTimeout(() => {
        if (searchText) {
            fetch(url)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error('Error fetching data')
                    }
                })
                .then(jres => {
                    const {count, limit, offset, results, total} = jres.data
                    setCharactersData(results)
                    setCount(count)
                    setLimit(limit)
                    setOffset(offset)
                    setTotal(total)
                    })
                .then(() => setIsTyping(false))
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setCharactersData([])
            setCount(0)
            setTotal(0)
            // if bookmarked characters exist, pagination results should be visible
            setIsTyping(false)
        }
        }, 700);
        return () => clearTimeout(timer);
    }, [searchText, offset]) // eslint-disable-line react-hooks/exhaustive-deps

    function handleSearchTextChange(event) {
        const {value} = event.target
        setSearchText(value)
        setOffset(0)
    }

    function handlePageClick(event) {
        const {value} = event.target
        setOffset((value - 1) * limit)
    }

    function calcNumOfPages() {
        if (searchText) {
            return Math.ceil(total/limit)
        } else {
            const total = window.localStorage.length
            return Math.ceil(total/limit)
        }
    }

    const bookmarkedCharactersStride = ((ls) => ({start: offset, end: (ls.length - offset) > limit ? offset + limit : ls.length}))


    function displaySearchResults() {
        if (!isTyping) {
            if (searchText) {
                return total ? `Showing ${count} of ${total} results` : `No results for ${searchText}`
            } else {
                const ls = window.localStorage
                const {start, end} = bookmarkedCharactersStride(ls)
                return ls.length ? `Showing ${end - start} of ${ls.length} results` : ''
            }
        }
    }

    return (
        <Context.Provider value={
                {
                    searchText,
                    handleSearchTextChange,
                    charactersData,
                    handlePageClick,
                    calcNumOfPages,
                    bookmarkedCharactersStride,
                    displaySearchResults
                }
            }
        >
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
