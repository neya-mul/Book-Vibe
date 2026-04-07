import React, { use } from 'react'
import { useParams } from 'react-router'
const bookPromise = fetch('/booksData.json')
    .then(res => res.json())

export default function BookDetails() {
    const { id } = useParams()
    const books = use(bookPromise)
    const expectedBook = books.find(book => book.bookId == id)
    console.log(expectedBook);
    // const [image, bookName, review] = expectedBook


    return (
        <div className='container mx-auto my-10 flex justify-between items-center'>
            <div className=''>
                <img src={expectedBook.image} alt="" />
            </div>
            <div>
                <h1>{expectedBook.bookName}</h1>
            </div>
        </div>
    )
}
