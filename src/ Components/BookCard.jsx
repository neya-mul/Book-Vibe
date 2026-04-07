import React from 'react'
import { CiStar } from 'react-icons/ci'

export default function BookCard({ book }) {
    return (
        <div className='mx-auto border w-[300px] p-5 rounded-2xl border-gray-300'>
            <div className='p-5 bg-gray-100'>
                {/* image div */}
                <img src={book.image} className='h-[150px] w-fit mx-auto' alt="" />
            </div>
            <div className='text-left border-b border-dashed  border-gray-400 my-5'>
                <h1 className=' min-h-[60px] text-left text-xl font-bold'>{book.bookName}</h1>
                <p>By: {book.author}</p>
            </div>
            <div className='flex gap-2 text-green-400 '>
                {
                    book.tags.map((tag) => (
                        <span className='border rounded-2xl p-1'>{tag}</span>
                    ))
                }
            </div>
            <div className='text-right mt-5'>
                <span className='flex items-center'>{book.rating} <CiStar />
                </span>
            </div>
        </div>
    )
}
