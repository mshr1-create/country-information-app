import React from 'react';
import './CountryInfo.css';

function CountryInfo({ country }) {
  if (!country) return null;

  // REST Countries API (v2) のレスポンス例を想定
  // https://restcountries.com/v2/name/Japan?fullText=true などで取得できる
  const {
    name,
    capital,
    population,
    languages,
    currencies,
    flag
  } = country;

  return (
    <div className="country-card">
      <img src={flag} alt={name} className="country-flag" />
      <h3 className="country-name">{name}</h3>

      {capital && (
        <p className="country-detail">
          <strong>首都:</strong> {capital}
        </p>
      )}
      {population && (
        <p className="country-detail">
          <strong>人口:</strong> {population.toLocaleString()}
        </p>
      )}
      {languages && languages.length > 0 && (
        <p className="country-detail">
          <strong>言語:</strong> {languages.map(lang => lang.name).join(', ')}
        </p>
      )}
      {currencies && currencies.length > 0 && (
        <p className="country-detail">
          <strong>通貨:</strong> {currencies.map(cur => cur.name).join(', ')}
        </p>
      )}
    </div>
  );
}

export default CountryInfo;
