import { useState } from 'react';
import FlashCards from './Flashcards';


const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 12, packed: false },
];

export default function App() {
  return (

    //* This code is for the packing list app.
    // <div className='app'>
    //   <Logo />
    //   <Form />
    //   <PackingList />
    //   <Stats />
    // </div>

    //* This code is for the flashCard app which is just a practice app and unrelated to the packing list app.
    <div className='App'>
      <FlashCards />
    </div>
  );
}

const Logo = () => {
  return <h1>🏝 Far Away 🧳</h1>;
};

const Form = () => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();

    if (!description) return;

    //* Get the data from the form.
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    //* Clear the form.
    setDescription('');
    setQuantity(1);
  };

  const handleChange = e => {
    console.log(e.target.value);
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
          <option value={num} key={num}>
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
      <button>Add</button>
    </form>
  );
};

const PackingList = () => {
  return (
    <div className='list' data-testid='packing-list'>
      <ul>
        {initialItems.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li className='item' data-testid='item'>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className='stats'>
      <em>🧳 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
};
