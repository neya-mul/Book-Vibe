import React from 'react'

export default function ReadList({book}) {
  return (
    <div>
       <div className='flex my-10  items-center gap-6 bg-white shadow-xl rounded-2xl p-6 w-full'>
    {/* Left - Image */}
    <div className='min-w-[120px]'>
        <img
            src={book.image}
            alt={book.bookName}
            className='h-[160px] w-[120px] object-cover rounded-xl'
        />
    </div>

    {/* Right - Details */} 
    <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold text-gray-800'>{book.bookName}</h1>
        <p className='text-gray-500'>
            <span className='font-semibold text-gray-700'>Author: </span>{book.author}
        </p>
        <p className='text-gray-500'>
            <span className='font-semibold text-gray-700'>Publisher: </span>{book.publisher}
        </p>
        <p className='text-gray-500'>
            <span className='font-semibold text-gray-700'>Pages: </span>{book.totalPages}
        </p>
        <p className='text-gray-500'>
            <span className='font-semibold text-gray-700'>Year: </span>{book.yearOfPublishing}
        </p>
        <p className='text-gray-500'>
            <span className='font-semibold text-gray-700'>Rating: </span>{book.rating}
        </p>
    </div>
</div>

    </div>
  )
}
