// ProfileSection.tsx

import { Dispatch, SetStateAction, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditableProfileData } from '@/types/profile/editableProfileData.interface';

interface DynamicProfileSectionProps {
  data: Array<any>;
  setData: Dispatch<SetStateAction<EditableProfileData>>;
  setListIds: Dispatch<SetStateAction<string[]>>;
  type: 'profile' | 'education' | 'recommendations' | 'experience';
  onAdd: (setFormData: Dispatch<SetStateAction<EditableProfileData>>) => void;
  onDelete: (setDeletedEducationIds: Dispatch<SetStateAction<string[]>>,
    setFormData: Dispatch<SetStateAction<EditableProfileData>>,id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, property: string) => void;
  styles: any
}

const DynamicProfileSection = ({ data, setData, setListIds, type, onAdd, onDelete, onChange, styles }: DynamicProfileSectionProps) => {
  const sectionEndRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <button ref={topRef} onClick={() => onAdd(setData)} className={`${styles.addButton} antialised`}>Add New {type}</button>

      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className={styles.editContainer}>
            <h3 className={styles.titleContainer}>{type.charAt(0).toUpperCase() + type.slice(1)} {index + 1}</h3>
            <FontAwesomeIcon 
              icon={faTrash} 
              onClick={() => onDelete(setListIds, setData, item.id ?? '')} 
              className={`${styles.editIcon} ${styles.deleteIcon}`} 
            />

            {Object.keys(item).filter(property => property !== 'id').map((property) => (
              <input
                key={property}
                type={property.includes('date') ? 'date' : 'text'}
                name={property}
                value={item[property]?.toString() || ''}
                onChange={(e) => onChange(e, index, type)}
                placeholder={property.charAt(0).toUpperCase() + property.slice(1)}
                className={`${styles.editInput} ${property.includes('date') ? styles.dateInput : ''}`}
              />
            ))}
          </div>
        ))
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <p>You don't have any {type} records.</p>
      )}

      <button ref={sectionEndRef} onClick={scrollToTop} className={`${styles.scrollButton} antialised`}>Scroll to Top</button>
    </>
  );
};

export default DynamicProfileSection;