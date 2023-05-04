import React, { useState } from 'react';
import SearchResult from './SearchResult';

function SearchBox() {
  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  const filteredResults = getFilteredResults(query);

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      {filteredResults.map(result => (
        <SearchResult key={result.id} result={result} />
      ))}
    </div>
  );
}

