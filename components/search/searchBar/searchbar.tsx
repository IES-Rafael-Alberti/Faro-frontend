import React, { useState, useEffect } from 'react';
import styles from './searchbar.module.css';
import Icon from '../../icons';
import { montserrat } from '@/app/ui/fonts';


interface SearchBarProps {
  onSearch: (query: string) => void;
  reset: boolean; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, reset }) => {
  
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <Icon src="/icons/search.svg" className={styles.searchIcon} width={25} height={25} />
      <input
        className={[styles.searchInput, `${montserrat.className} antialiased`].join(' ')}
        type="text"
        value={reset ? '' : query}
        onChange={handleChange}
        placeholder="Escriba su búsqueda aquí..."
        aria-label='search-bar'
      />
    </div>
  );
};

export default SearchBar;
