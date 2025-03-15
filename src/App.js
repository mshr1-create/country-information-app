import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm';

function App() {
  const handleSearch = (searchValue) => {
    console.log("検索された国名:", searchValue);
    // ここに REST Countries API 呼び出しの処理等を追加する
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>国情報取得アプリ</h2>
        <SearchForm onSearch={handleSearch} />
      </header>
    </div>
  );
}

export default App;
