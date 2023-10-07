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

export default Item;
