import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        placeholder="国名を入力"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">検索</button>
    </form>
  );
}

export default SearchForm;
