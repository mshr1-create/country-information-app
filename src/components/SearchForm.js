import React, { useState } from 'react';
import './SearchForm.css';

// SearchForm.js (例)
function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // ここではサジェスト用の処理だけ行う（onSearchは呼ばない）
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSearch(inputValue.trim());
    // 必要なら、ここではinputValueをクリアしないか、クリアしてもonChangeで再度APIを呼ばない工夫が必要
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">検索</button>
    </form>
  );
}


export default SearchForm;
