import React, { Children, createContext, useState } from 'react'
import { toast } from 'react-toastify'
export const bookContext = createContext()
export default function BookProvider({ children }) {

    const [storedBook, setStoredBook] = useState([])


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
    const data = {
        storedBook,
        setStoredBook,
        handelMarkAsRead,
    }
    return (
        <bookContext.Provider value={data}>
            {children}
        </bookContext.Provider>
    )
}
