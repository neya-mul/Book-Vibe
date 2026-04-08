import React, { useContext, useState } from 'react'
import { bookContext } from '../context/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ListedReadList from '../ Components/ListedReadList';
import ListedWishList from '../ Components/ListedWishList';

export default function Books() {
  const { storedBook, wishList } = useContext(bookContext)
  // console.log(BookContext)
  const [sortingType, setSortingType] = useState('')
  // console.log(sortingType)

  return (
    <div className='container mx-auto my-6 '>
      <div className='flex justify-center'>
        <div className="dropdown dropdown-start">
          <div tabIndex={0} role="button" className="btn m-1">Short By {sortingType} </div>
          <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li onClick={() => setSortingType('pages')}><a>Pages</a></li>
            <li onClick={() => setSortingType('rating')}><a>Rating</a></li>
          </ul>
        </div>
      </div>

      <div>
        <Tabs>
          <TabList>
            <Tab> <h1>Read List : {storedBook.length}</h1></Tab>
            <Tab> <h1>Wish List : {wishList.length}</h1></Tab>
          </TabList>

          <TabPanel>
            <ListedReadList sortingType={sortingType}></ListedReadList>
          </TabPanel>
          <TabPanel>
            <ListedWishList sortingType={sortingType}></ListedWishList>
          </TabPanel>
        </Tabs>
      </div>



    </div>
  )
}
