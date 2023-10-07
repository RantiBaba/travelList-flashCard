import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';
// import FlashCards from './Flashcards';

export default function App() {
  const [items, setItems] = useState([]);

  const handleItems = item => {
    //* This code practically says; take the items array and spread it out, then add the new item to the end of the array.

    setItems(items => [...items, item]);
  };

  const handleDeleteItem = id => {
    //* This code practically says; filter through the items array and return a new array with all the items that do not have the same id as the item that was passed in.

    setItems(items => items.filter(item => item.id !== id));
  };

  const handleToggleItem = id => {
    //* This code practically says; map through the items array and return a new array with all the items that have the same id as the item that was passed in, and change the packed value to the opposite of what it was.

    setItems(
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    );
    if (confirmed) setItems([]);
  };

  return (
    //* This code is for the packing list app.
    <div className='app'>
      <Logo />
      <Form handleItems={handleItems} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>

    //* This code is for the flashCard app which is just a practice app and unrelated to the packing list app.
    // <div className='App'>
    //   <FlashCards />
    // </div>
  );
}
