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
  const [isLoding, setIsLoding] = useState(false);   // ローディング状態

  // useEffect で keyword 変更時に API 呼び出し
  useEffect(() => {
    if (!keyword) return; // キーワードが空の場合は何もしない

    const fetchCountryData = async () => {
      try {
        setIsLoding(true);
        setError(''); // エラーリセット
        setCountry(null); // 新しい検索前にリセット

        const response = await fetch(`https://restcountries.com/v2/name/${encodeURIComponent(keyword)}?fullText=true`);
        if (!response.ok) {
          throw new Error("国情報が取得できませんでした");
        }
        const data = await response.json();
        // 仮に取得したデータが配列の先頭要素だとする
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          throw new Error("該当する国が見つかりませんでした")
        }
      } catch (err) {
        setError(err.message);
        setCountry(null);
      } finally {
        setIsLoding(false);
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
    <div className="app-container">
      <h2 className="app-title">国情報取得アプリ</h2>
      <SearchForm onSearch={handleSearch} />
      <ErrorMessage error={error} />
      {/* ローディング表示 */}
      {isLoding && <div className='loding'>Loding...</div>}
      {/* 検索結果の表示 */}
      {!isLoding && country && <CountryInfo country={country} />}
    </div>
  );
}

export default App;
