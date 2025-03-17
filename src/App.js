import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import CountryInfo from './components/CountryInfo';
import ErrorMessage from './components/ErrorMessage';

function App() {
  // useState で状態管理
  const [keyword, setKeyword] = useState('');       // 検索キーワード
  const [country, setCountry] = useState(null);       // 取得した国情報
  const [error, setError] = useState('');             // エラーメッセージ

  // useEffect で keyword 変更時に API 呼び出し
  useEffect(() => {
    if (!keyword) return; // キーワードが空の場合は何もしない

    const fetchCountryData = async () => {
      try {
        setError(''); // エラーリセット
        const response = await fetch(`https://restcountries.com/v2/name/${encodeURIComponent(keyword)}?fullText=true`);
        if (!response.ok) {
          throw new Error("国情報が取得できませんでした");
        }
        const data = await response.json();
        // 仮に取得したデータが配列の先頭要素だとする
        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
        setCountry(null);
      }
    };

    fetchCountryData();
  }, [keyword]); // keyword が変わったら再実行

  // SearchForm から国名が入力された場合の処理
  const handleSearch = (searchValue) => {
    console.log("検索された国名:", searchValue);
    setKeyword(searchValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>国情報取得アプリ</h2>
        <SearchForm onSearch={handleSearch} />
        <ErrorMessage error={error} />
        {country && <CountryInfo country={country} />}
      </header>
    </div>
  );
}

export default App;
