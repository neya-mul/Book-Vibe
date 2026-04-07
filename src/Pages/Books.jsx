import React, { useContext } from 'react'
import { bookContext } from '../context/BookProvider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
            <h2>read list</h2>
          </TabPanel>
          <TabPanel>
            <h2>wishList</h2>
          </TabPanel>
        </Tabs>
      </div>



    </div>
  )
}
