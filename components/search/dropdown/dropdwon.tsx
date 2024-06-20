import React, { useState, useEffect } from 'react';
import { montserrat } from '@/app/ui/fonts';
import styles from './dropdown.module.css';
import { translateRol } from '@/app/context/translate';

interface DropdownProps {
  options: string[];
  onSelect: (filter: string) => void;
  reset: boolean; // Nueva prop para controlar el reset
}

/**
 * Dropdown component for selecting options from a list.
 * 
 * @component
 * @param {string[]} options - The list of options to display in the dropdown.
 * @param {function} onSelect - The function to call when an option is selected.
 * @param {boolean} reset - Flag indicating whether to reset the dropdown to its initial state.
 * @returns {JSX.Element} - The JSX element representing the dropdown menu.
 */
const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, reset }) => {
  const [selectedOption, setSelectedOption] = useState("");

  /**
   * Handler function called when an option is selected from the dropdown.
   * 
   * @param {string} option - The selected option.
   */
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  useEffect(() => {
    if (reset) {
      setSelectedOption("");
    }
  }, [reset]);

  return (
    <select
      value={reset ? '' : selectedOption}
      onChange={(e) => handleSelect(e.target.value)}
      className={[styles.selectFilter, `${montserrat.className} antialiased`].join(' ')}
    >
      <option value="">Todos</option>
      {options.map((option: string, index: number) => (
        <option key={index} value={option} className={styles.option}>
          {translateRol(option)}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
