import { useState } from 'react';
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

const Logo = () => {
  return <h1>🏝 Far Away 🧳</h1>;
};

const Form = ({ handleItems }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();

    if (!description) {
      alert('Please enter an item to add to your list!');
      return;
    }

    //* Get the data from the form.
    const newItem = { description, quantity, packed: false, id: Date.now() };

    handleItems(newItem);

    //* Clear the form.
    setDescription('');
    setQuantity(1);
  };

  const handleChange = e => {
    setDescription(e.target.value);
  };

  const handleSelect = e => {
    setQuantity(Number(e.target.value));
  };

  //* This code is just to generate an array of numbers from 1 to 20. Very important lesson learnt today!
  const array = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <form className='add-form' onSubmit={handleSubmit} data-testid='form'>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name='select'
        id='select'
        onChange={handleSelect}
        value={quantity}
        data-testid='form-select'
      >
        {array.map(num => (
          <option value={num} key={num} data-testid={`option-${num}`}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='item...'
        value={description}
        onChange={handleChange}
        data-testid='form-input'
      />
      <button data-testid='add-button'>Add</button>
    </form>
  );
};

const PackingList = ({
  items,
  handleDeleteItem,
  handleToggleItem,
  handleClearList,
}) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );

  if (sortBy === 'packed')
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  return (
    <div className='list' data-testid='packing-list'>
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleToggleItem={handleToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className='actions'>
        <select
          name='select'
          id='select'
          data-testid='select'
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value='input' data-testid='input'>
            Sort by the input order
          </option>
          <option value='description' data-testid='description'>
            Sort by description
          </option>
          <option value='packed' data-testid='packed'>
            Sort by packed status
          </option>
        </select>

        <button onClick={handleClearList} data-testid='clear-list'>
          clear list
        </button>
      </div>
    </div>
  );
};

const Item = ({ item, handleDeleteItem, handleToggleItem }) => {
  return (
    <li
      className='item'
      data-testid={`item-${item.description.toLowerCase().replace(/ /g, '-')}`}
    >
      <input
        type='checkbox'
        name='checkbox'
        id='checkbox'
        value={item.packed}
        onChange={() => handleToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <footer className='stats'>
        <em>Start adding items to your list 🚀</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentagePacked = Math.round((numPacked / numItems) * 100);

  return (
    <footer className='stats'>
      <em>
        {percentagePacked === 100
          ? `You've got everything to go ✈️`
          : `🧳 You have ${numItems} items on your list, and you already packed
        ${numPacked} (${percentagePacked}%)`}
      </em>
    </footer>
  );
};
