import React, { useContext } from 'react'
import WishList from './WishList'
import { bookContext } from '../context/BookProvider'

export default function ListedWishList({sortingType}) {
    const { wishList } = useContext(bookContext)
    return (
        <div>
            {
                wishList.length === 0 ? <div className='flex flex-col items-center justify-center py-20 text-center'>
                    <div className='bg-gray-100 rounded-2xl p-12 shadow-inner max-w-md mx-auto'>
                        <p className='text-8xl mb-4'>🔍</p>
                        <h1 className='text-2xl font-bold text-gray-700'>No Books Found</h1>
                        <p className='text-gray-400 mt-2 text-sm'>
                            You haven't added any books to this list yet.
                        </p>
                    </div>
                </div>
                    :
                    wishList.map(book => <WishList book={book}></WishList>)
            }
        </div>
    )
}
