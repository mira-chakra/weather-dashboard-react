import React from 'react';

export default function SearchBar({ value, onChange, onSearch, loading }) {
  return (
    <form className="search-box" onSubmit={onSearch}>
      <label className="visually-hidden" htmlFor="city-search">City name</label>
      <input
        id="city-search"
        type="text"
        placeholder="Enter a city name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
}
