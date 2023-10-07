import { useState } from 'react';
import Item from './Item';

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

export default PackingList;