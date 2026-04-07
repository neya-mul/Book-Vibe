import React, { Children, createContext, useState } from 'react'
export const bookContext = createContext()
export default function BookProvider({ children }) {

    const [storedBook, setStoredBook] = useState([])


    const handelMarkAsRead = (currentbook) => {
       
        const isExist = storedBook.find(book => book.bookId === currentbook.bookId)
        if (isExist) {
            alert("The book is already exist")
        }
        else {
            setStoredBook([...storedBook, currentbook])

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
