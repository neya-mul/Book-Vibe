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
        // main div
        <div className='container mx-auto justify-between items-center flex gap-5 flex-col lg:flex-row mt-10 text-center lg:text-left'>
            {/* image div */}
            <div className='max-w-[500px]  mx-auto p-10'>
                <img src={expectedBook.image} alt="" className='h-[700px] mx-auto' />
            </div>
            {/* description */}
            <div className=' max-w-[600px] space-y-5 p-6 mx-auto'>
                <div className='border-b border-gray-400'>
                    <h1 className='text-5xl'>{expectedBook.bookName}</h1>
                    <p>By:{expectedBook.author}</p>
                </div>
                <div className='border-b border-gray-400 py-6'>
                    {
                        expectedBook.tags.map((tag) => (
                            <span className='border border-green-400 text-green-500 rounded-2xl p-1'>{tag}</span>
                        ))
                    }
                </div>
                <div className='border-b border-gray-400 py-5'>
                    <p><span className='font-bold '>Review: </span>{expectedBook.review}</p>
                </div>
                <div className='border-b border-gray-400 py-5'>
                    <p>Number or pages : {expectedBook.totalPages}</p>
                    <p>Publisher : {expectedBook.publisher}</p>
                    <p>Year of Publishing : {expectedBook.yearOfPublishing}</p>
                    <p>Rating : {expectedBook.rating}</p>
                </div>
                <div className='flex gap-3'>
                    <button className='btn'>Read</button>
                    <button className='btn bg-[#50B1C9] text-white'>WishList</button>
                </div>
            </div>
        </div>
    )
}
