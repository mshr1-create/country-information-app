import React from 'react';

function CountryInfo({ country }) {
  if (!country) {
    return <div>国情報がありません。</div>;
  }

  // 仮に API のデータ構造が以下のようになっていると仮定
  // country = {
  //   name: "Japan",
  //   capital: "Tokyo",
  //   population: 126300000,
  //   languages: ["日本語"],
  //   flag: "https://restcountries.com/data/jpn.svg",
  //   currency: "円"
  // }

  return (
    <div className="country-card" style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <img src={country.flag} alt={`Flag of ${country.name}`} style={{ width: '100px', height: 'auto' }} />
      <h3>{country.name}</h3>
      <p>首都: {country.capital}</p>
      <p>人口: {country.population.toLocaleString()}</p>
      <p>言語: {Array.isArray(country.languages) ? country.languages.join(', ') : country.languages}</p>
      <p>通貨: {country.currency}</p>
    </div>
  );
}

export default CountryInfo;
