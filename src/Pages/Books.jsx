import React, { useContext } from 'react'
import { bookContext } from '../context/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ListedReadList from '../ Components/ListedReadList';
import ListedWishList from '../ Components/ListedWishList';

export default function Books() {
  const { storedBook, wishList } = useContext(bookContext)
  // console.log(BookContext)
  console.log(storedBook);
  console.log(wishList)

  return (
    <div className='container mx-auto my-6'>

      <div>
        <Tabs>
          <TabList>
            <Tab> <h1>Read List : {storedBook.length}</h1></Tab>
            <Tab> <h1>Wish List : {wishList.length}</h1></Tab>
          </TabList>

          <TabPanel>
            <ListedReadList></ListedReadList>
          </TabPanel>
          <TabPanel>
            <ListedWishList></ListedWishList>
          </TabPanel>
        </Tabs>
      </div>



    </div>
  )
}
