import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // 空文字対策
    onSearch(inputValue.trim());
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        type="text"
        value={inputValue}
        placeholder="国名を入力"
        onChange={(e) => setInputValue(e.target.value)}
        className='search-input'
      />
      <button type="submit" className='search-button'>
        検索
      </button>
    </form>
  );
}

export default SearchForm;
