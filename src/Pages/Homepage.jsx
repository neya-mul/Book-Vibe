import React from 'react'
import Banner from '../ Components/Banner'
import AllBooks from '../ Components/AllBooks'

export default function Homepage() {
  return (
    <div className=' container mx-auto my-2'>
      <Banner></Banner>
      <AllBooks></AllBooks>

    </div>
  )
}
