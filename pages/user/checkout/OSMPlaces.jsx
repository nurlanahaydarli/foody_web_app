import React, { useState } from 'react';

const OSMPlacesInput = ({ onPlaceSelected }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 2) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.display_name);
    setSuggestions([]);
    onPlaceSelected(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Şehir adı giriniz"
        style={{
          width: '240px',
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '10px'
        }}
      />
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              cursor: 'pointer',
              padding: '8px',
              borderBottom: '1px solid #ccc'
            }}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OSMPlacesInput;
