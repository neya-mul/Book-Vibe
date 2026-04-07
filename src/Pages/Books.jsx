import React, { useContext } from 'react'
import { bookContext } from '../context/BookProvider';

export default function Books() {
  const { storedBook } = useContext(bookContext)
  // console.log(BookContext)
  console.log(   storedBook);

  return (
    <div>Books</div>
  )
}
