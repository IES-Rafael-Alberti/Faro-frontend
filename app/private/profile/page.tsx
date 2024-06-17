
'use client';

import { getProfileData, getUserBasicData } from '@/utils/fetchData';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/auth';
import { updateProfileData, updateUserData } from '@/utils/updateData';
import { EditableProfileData } from '@/types/profile/editableProfileData.interface';
import { RequestInterface } from '@/types/profile/requests.interface';
import { submitAvatar, submitEducation, submitExperience } from '@/utils/submitData';
import styles from './page.module.css';
import { montserrat } from '@/app/ui/fonts';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCancel, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import translateRol from '@/app/context/translate';

import DisplayedProfileSection from '@/components/profile/DisplayedProfileSection';
import DynamicProfileSection from '@/components/profile/DynamicProfileSection';
import ProfileNavbar from '@/components/profile/ProfileNavbar';
import { CREATE_EDUCATION_URL, CREATE_EXPERIENCE_URL } from '@/types/consts';
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface';
import { deleteData } from '@/utils/deleteData';
import { getFilteredEducation, getFilteredExperience } from '@/utils/profileFunctions';
import { EducationInterface } from '@/types/profile/education.interface';
import { ProfileInterface } from '@/types/profile/Profile.interface';
import ImageInput from '@/components/profile/image/ImageInput';

export default function Profile() {
  const { id, token, setId } = useContext(AuthContext);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [education, setEducation] = useState<EducationInterface[]>([]);
  const [experience, setExperience] = useState<EducationInterface[]>([]);
  const [profileData, setProfileData] = useState<ProfileInterface>();
  const [basicUserInfo, setBasicUserInfo] = useState<BasicUserInfoInterface>();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        <ImageInput
          setBasicUserInfo={setBasicUserInfo}
          styles={styles}
        />
        <section className={styles.nameAndRol}>
          <h1 className={styles.name}>{basicUserInfo?.username}</h1>
          <h2 className={styles.rol}>{translateRol(basicUserInfo?.rol ? basicUserInfo.rol : '')}</h2>

        </section>
      </header>
      <ProfileNavbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        styles={styles}
      />
      {editMode ? (
        <>
          <FontAwesomeIcon icon={faCancel} onClick={toggleEditProfile} className={styles.editIcon} />
          <FontAwesomeIcon icon={faSave} onClick={editProfile} className={styles.editIcon} />
          <div className={styles.currentSection}>
            {currentSection === 'profile' && (
              <>
                <input
                  type="text"
                  name="name"
                  value={editableProfileData.name}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Name"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="headline"
                  value={editableProfileData.headline}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Headline"
                  className={styles.editInput}
                />
                <div className={isFocused ? `${styles.editTextArea} ${styles.focusTextArea}` : styles.editTextArea}>
                  <textarea
                    name="description"
                    value={editableProfileData.description}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Description"
                    rows={3}
                    className={`${styles.textarea} ${montserrat.className} antialiased`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>
              </>
            )}
            {currentSection === 'education' && (
              <DynamicProfileSection
                data={editableProfileData.education}
                setData={setEditableProfileData}
                setListIds={setDeletedEducationIds}
                type={'education'}
                onAdd={addEducation}
                onDelete={deleteEducation}
                onChange={(e, index) => handleInputChange(e, index, 'education')}
                styles={styles}
              />
            )}
            {currentSection === 'experience' && (
              <DynamicProfileSection
                data={editableProfileData.experience}
                setData={setEditableProfileData}
                setListIds={setDeletedExperienceIds}
                type={'experience'}
                onAdd={addExperience}
                onDelete={deleteExperience}
                onChange={(e, index) => handleInputChange(e, index, 'experience')}
                styles={styles}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faEdit} onClick={toggleEditProfile} className={styles.editIcon} />

          <div className={styles.currentSection}>
            <DisplayedProfileSection
              currentSection={currentSection}
              profileData={profileData}
              styles={styles}
            />
          </div>
        </>
      )}
    </main>
  );
}
