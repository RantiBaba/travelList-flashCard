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

export default Stats;