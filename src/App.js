import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import CountryInfo from './components/CountryInfo';
import ErrorMessage from './components/ErrorMessage';

function App() {
  // 検索キーワード、取得した国情報、エラーメッセージ、ローディング状態の管理
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState('');
  const [isLoding, setIsLoding] = useState(false);

  // auto complete 用の state
  const [allCountries, setAllCountries] = useState([]);    // APIで取得した全国名の元データ
  const [suggestions, setSuggestions] = useState([]);        // 現在表示する候補リスト

  // 全国のリストを取得する関数（全国名を allCountries に保存）
  const fetchAllCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      if (!response.ok) {
        throw new Error("国リストの取得に失敗しました");
      }
      const data = await response.json();
      const countryNames = data.map((country) => country.name);
      setAllCountries(countryNames);
    } catch (err) {
      setError(err.message);
    }
  };

  // アプリケーション起動時に全国名リストを取得
  useEffect(() => {
    fetchAllCountries();
  }, []);

  // 入力されたキーワードに基づいて候補をフィルタリング（allCountries を利用）
  useEffect(() => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }
    const filteredSuggestions = allCountries.filter(name =>
      name.toLowerCase().includes(keyword.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [keyword, allCountries]);

  // サジェスト候補をクリックしたときの処理
  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setSuggestions([]);  // 候補リストをクリア
  };

  // useEffect で keyword 変更時に国情報を API から取得する処理
  useEffect(() => {
    if (!keyword) return;

    const fetchCountryData = async () => {
      try {
        setIsLoding(true);
        setError('');
        setCountry(null);
  
        const response = await fetch(`https://restcountries.com/v2/name/${encodeURIComponent(keyword)}?fullText=true`);
        if (!response.ok) {
          throw new Error("国情報が取得できませんでした");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          throw new Error("該当する国が見つかりませんでした");
        }
      } catch (err) {
        setError(err.message);
        setCountry(null);
      } finally {
        setIsLoding(false);
      }
    };

    fetchCountryData();
  }, [keyword]);

  // SearchForm コンポーネントから国名が入力された場合の処理
  const handleSearch = (searchValue) => {
    console.log("検索された国名:", searchValue);
    setKeyword(searchValue);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">国情報取得アプリ</h2>
      <SearchForm onSearch={handleSearch} />
      {/* サジェスト候補のドロップダウン表示 */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list" style={{ listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc' }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ padding: '5px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <ErrorMessage error={error} />
      {isLoding && <div className="loding">Loding...</div>}
      {!isLoding && country && <CountryInfo country={country} />}
    </div>
  );
}

export default App;
