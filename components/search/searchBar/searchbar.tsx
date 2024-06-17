import React, { useState, useEffect } from 'react';
import styles from './searchbar.module.css';
import Icon from '../../icons';
import { montserrat } from '@/app/ui/fonts';


interface SearchBarProps {
  onSearch: (query: string) => void;
  reset: boolean; 
}


/**
 * SearchBar component for entering search queries.
 * 
 * @component
 * @param {function} onSearch - The function to call when a search query is entered.
 * @param {boolean} reset - Flag indicating whether to reset the search bar to its initial state.
 * @returns {JSX.Element} - The JSX element representing the search bar.
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch, reset }) => {
  
  const [query, setQuery] = useState('');

  /**
   * Handler function called when the search query changes.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  useEffect(() => {
    if (reset) {
      setQuery("");
      onSearch("");
    }
  }, [reset]);


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
