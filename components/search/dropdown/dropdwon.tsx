import React, { useState, useEffect } from 'react';
import { montserrat } from '@/app/ui/fonts';
import styles from './dropdown.module.css';
import translateRol from '@/context/translate';

interface DropdownProps {
  options: string[];
  onSelect: (filter: string) => void;
  reset: boolean; // Nueva prop para controlar el reset
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, reset }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

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
