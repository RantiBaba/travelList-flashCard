import { useState } from 'react';

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

export default Form;
