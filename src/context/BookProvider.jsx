import React, { Children, createContext, useState } from 'react'
import { toast } from 'react-toastify'
export const bookContext = createContext()
export default function BookProvider({ children }) {

    const [storedBook, setStoredBook] = useState([])
    const [wishList, setWishList] = useState([])

    const handelMarkAsRead = (currentbook) => {

        const isExist = storedBook.find(book => book.bookId === currentbook.bookId)
        if (isExist) {
            toast.warn(
                <p>
                    <span className='font-bold'>{currentbook.bookName}</span> already exists
                </p>
            )
        }
        else {
            setStoredBook([...storedBook, currentbook])
            toast.success(
                <p>
                    <span className='font-bold'>{currentbook.bookName}</span> has added to the list
                </p>
            )
        }

        // console.log(storedBook);

    }


    const handelWishList = (currentbook) => {

        const isExistInReadList = storedBook.find((book) =>
            book.bookId === currentbook.bookId
        )
        if (isExistInReadList) {
            toast.error('This book is already exist in read list')
            return;
        }



        const isExist = wishList.find(book => book.bookId === currentbook.bookId)
        if (isExist) {
            toast.warn(
                <p>
                    <span className='font-bold'>{currentbook.bookName}</span> already exists
                </p>
            )
        }
        else {
            setWishList([...wishList, currentbook])
            toast.success(
                <p>
                    <span className='font-bold'>{currentbook.bookName}</span> has added to the list
                </p>
            )
        }

        // console.log(storedBook);

    }



    const data = {
        storedBook,
        setStoredBook,
        handelMarkAsRead,
        wishList,
        setWishList,
        handelWishList
    }
    return (
        <bookContext.Provider value={data}>
            {children}
        </bookContext.Provider>
    )
}
