import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { translateType } from '@/app/context/translate';

interface DynamicProfileSectionProps {
  data: Array<any>;
  setData: Dispatch<SetStateAction<any>>;
  type: 'profile' | 'education' | 'experience';
  onAdd: (setFormData: Dispatch<SetStateAction<any>>) => void;
  onDelete: (id: string) => void;
  styles: any;
}

const DynamicProfileSection = ({ data, setData, type, onAdd, onDelete, styles }: DynamicProfileSectionProps) => {
  const sectionEndRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, property: string) => {
    const updatedData = [...data];
    updatedData[index][property] = e.target.value;
    setData(updatedData);
  };

  return (
    <>
      <button ref={topRef} onClick={() => onAdd(setData)} className={`${styles.addButton} antialised`}>Añade {translateType(type)}</button>

      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className={styles.editContainer}>
            <h3 className={styles.titleContainer}>{type.charAt(0).toUpperCase() + type.slice(1)} {index + 1}</h3>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onDelete(item.id ?? '')}
              className={`${styles.editIcon} ${styles.deleteIcon}`}
            />

            {Object.keys(item)
              .filter(property => property !== 'id' && property !== 'profile')
              .map((property) => (
                <input
                  key={property}
                  type={property.includes('date') || property === 'startDate' || property === 'endDate' ? 'date' : 'text'}
                  name={property}
                  value={item[property]?.toString() || ''}
                  onChange={(e) => handleChange(e, index, property)}
                  placeholder={property.charAt(0).toUpperCase() + property.slice(1)}
                  className={`${styles.editInput} ${(property.includes('date') || property === 'startDate' || property === 'endDate') ? styles.dateInput : ''}`}
                />
              ))}

          </div>
        ))
      ) : (
        <p>No tienes {translateType(type)} guardados.</p>
      )}

      <button ref={sectionEndRef} onClick={scrollToTop} className={`${styles.scrollButton} antialised`}>Volver arriba</button>
    </>
  );
};

export default DynamicProfileSection;
