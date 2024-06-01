// Dropdown.tsx
import { useState } from 'react';
import { montserrat } from '@/app/ui/fonts';
import styles from './dropdown.module.css';
import translateRol from '@/context/translate';
const Dropdown = ({ options, onSelect } : any) => {
  const [selectedOption, setSelectedOption] = useState(" ");

  const handleSelect = (option : any) => {
    setSelectedOption(option);
    onSelect(option);
  };


  return (
    <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)} className={[styles.selectFilter, `${montserrat.className} antialiased`].join(' ')}>
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
