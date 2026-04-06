import React, { use } from 'react'
const bookPromise = fetch('/booksData.json')
    .then(res => res.json())
// console.log(bookPromise)

export default function AllBooks() {
    const books = use(bookPromise)
    console.log(books);


    return (
        <div className='contaier mx-auto text-center my-10 py-10'>

            <h1 className='text-2xl font-bold'>Books</h1>

        </div>
    )
}
