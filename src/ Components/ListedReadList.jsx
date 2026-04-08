import React, { use, useContext, useEffect, useState } from 'react'
import { bookContext } from '../context/BookProvider'
import ReadList from './ReadList'

export default function ListedReadList({ sortingType }) {
    const { storedBook } = useContext(bookContext)
    const [filterStoredBook, setFilterStoredBook] = useState(storedBook)
    useEffect(() => {
        if (sortingType) {
            if (sortingType === 'pages') {
                const sortedData = [...storedBook].sort((a, b) => a.totalPages - b.totalPages)
                // console.log(sortedData)
                setFilterStoredBook(sortedData)

            }
            else if (sortingType === 'rating') {
                const sortedData = [...storedBook].sort((a, b) => b.rating - a.rating)
                // console.log(sortedData)
                setFilterStoredBook(sortedData)

            }
        }
    }, [sortingType])
    return (
        <div>
            {
                filterStoredBook.length === 0 ? <div className='flex flex-col items-center justify-center py-20 text-center'>
                    <div className='bg-gray-100 rounded-2xl p-12 shadow-inner max-w-md mx-auto'>
                        <p className='text-8xl mb-4'>🔍</p>
                        <h1 className='text-2xl font-bold text-gray-700'>No Books Found</h1>
                        <p className='text-gray-400 mt-2 text-sm'>
                            You haven't added any books to this list yet.
                        </p>
                    </div>
                </div>
                    :
                    filterStoredBook.map(book => <ReadList book={book}></ReadList>)
            }
        </div>
    )
}
