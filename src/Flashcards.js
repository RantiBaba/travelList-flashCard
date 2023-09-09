import { useState } from 'react';

const questions = [
  {
    id: 3457,
    question: 'What language is React based on?',
    answer: 'JavaScript',
  },
  {
    id: 7336,
    question: 'What are the building blocks of React apps?',
    answer: 'Components',
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: 'JSX',
  },
  {
    id: 1297,
    question: 'How to pass data from parent to child components?',
    answer: 'Props',
  },
  {
    id: 9103,
    question: 'How to give components memory?',
    answer: 'useState hook',
  },
  {
    id: 2002,
    question:
      'What do we call an input element that is completely synchronized with state?',
    answer: 'Controlled element',
  },
];

export default function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = id => {
    //* This code basically says if the id of the question is not equal to the selectedId then set the selectedId to the id of the question,
    //* otherwise if the id of the question is equal to the selectedId then set the selectedId to null.

    setSelectedId(id !== selectedId ? id : null);
  };

  
  return (
    <div className='flashcards'>
      {questions.map(question => (
        <div
          key={question.id}
          onClick={() => handleClick(question.id)}
          className={question.id === selectedId ? 'selected' : ''}
          data-testid={`question-${question.id}`}
        >
          <p>
            {question.id === selectedId ? question.answer : question.question}
          </p>
        </div>
      ))}
    </div>
  );
}
