'use client';

import { getProfileData, getUserBasicData } from '@/utils/fetchData';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/auth';
import { CompleteProfile } from '@/types/profile/CompleteProfile.interface';
import { updateProfileData, updateUserData } from '@/utils/updateData';
import { EditableProfileData } from '@/types/profile/editableProfileData.interface';
import { RequestInterface } from '@/types/profile/requests.interface';
import { submitAvatar, submitEducation, submitExperience } from '@/utils/submitData';
import styles from './page.module.css';
import { montserrat } from '@/app/ui/fonts';
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface';
import { deleteData } from '@/utils/deleteData';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCancel, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import translateRol from '@/app/context/translate';
import DynamicProfileSection from '@/components/profile/DynamicProfileSection';
import { addEducation, addExperience, deleteEducation, deleteExperience, getFilteredExperience, getFilteredEducation } from '@/utils/profileFunctions';
import DisplayedProfileSection from '@/components/profile/DisplayedProfileSection';
import ProfileNavbar from '@/components/profile/ProfileNavbar';

export default function Profile() {
  const { id, token } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('/imgs/no-user-image.jpg');
  const [isFocused, setIsFocused] = useState(false);
  const [deletedEducationIds, setDeletedEducationIds] = useState<string[]>([]);
  const [deletedExperienceIds, setDeletedExperienceIds] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<CompleteProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [editableProfileData, setEditableProfileData] = useState<EditableProfileData>({
    id: '',
    name: '',
    headline: '',
    description: '',
    education: [{ id: '', degree: '', institution: '', start_date: '', end_date: null }],
    experience: [{ id: '', company: '', position: '', startDate: '', endDate: null, description: '' }],
    recommendations: [{  message: '', date: '', senderId: '' }],
    publications: [{ user_publication_msg: '', users_publications_created_at: '' }]
  });

  const toggleEditProfile = () => {
    setEditMode(!editMode);
    if (!editMode && profileData) {
      setEditableProfileData({
        id: profileData.id,
        name: profileData.name,
        headline: profileData.headline || '',
        description: profileData.description || '',
        education: profileData.education.map(ed => ({
          id: ed.id || '',
          degree: ed.degree || '',
          institution: ed.institution || '',
          start_date: ed.start_date.toString() || '',
          end_date: ed.end_date?.toString() || null
        })),
        experience: profileData.experience.map(ex => ({
          id: ex.id || '',
          company: ex.company || '',
          position: ex.position || '',
          startDate: ex.startDate.toString() || '',
          endDate: ex.endDate?.toString() || null,
          description: ex.description || ''
        })),
        recommendations: profileData.recommendations.map(rec => ({
          profile: id,
          message: rec.message || '',
          date: rec.date || '',
          senderId: rec.senderId || ''
        })),
        publications: profileData.publications || []
      });
    }
  };

  const handleInputChange = (e: any, index?: number, type?: 'education' | 'experience' | 'recommendations') => {
    const { name, value } = e.target;
    if (type && index !== undefined) {
      setEditableProfileData((prevFormData) => {
        const updatedArray = prevFormData[type].slice();
        updatedArray[index] = { ...updatedArray[index], [name]: value };
        return { ...prevFormData, [type]: updatedArray };
      });
    } else {
      setEditableProfileData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const editProfile = async () => {
    try {
      setLoading(true);
      const updatedFormData = { ...editableProfileData };
      const response = await updateProfileData(id, updatedFormData, token);

      for (const id of deletedEducationIds) {
        await deleteData(`education/${id}`, token);
      }

      for (const id of deletedExperienceIds) {
        await deleteData(`experience/${id}`, token);
      }

      const filteredEducation = await getFilteredEducation(editableProfileData, id, token);
      for (const edu of filteredEducation) {
        await submitEducation(edu, id, token);
      }

      const filteredExperience = await getFilteredExperience(editableProfileData, id, token);
      for (const exp of filteredExperience) {
        await submitExperience(exp, id, token);
      }

      let userResponse;
      if (userInfo) {
        userResponse = await updateUserData(id, userInfo, token);
        setUserInfo(userResponse);
      }

      if (userResponse?.name) {
        response.name = userResponse.name;
      }

      setProfileData(response);

      const updatedProfile = await getProfileData(id, token, setProfileData, setRequests);
      if (updatedProfile) {
        if (userResponse?.name) {
          updatedProfile.name = userResponse.name;
        }
        setProfileData(updatedProfile);
      }

      setDeletedEducationIds([]);
      setDeletedExperienceIds([]);
      toggleEditProfile();
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      try {
        const response = await submitAvatar(file, id, token);
        setImageUrl(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await getProfileData(id, token, setProfileData, setRequests);
        const userResponse = await getUserBasicData(id, token, setProfileData, setUserInfo);
        setProfileData(profileResponse);
        if (userResponse) {
          setUserInfo(userResponse);
          if ('profile_picture' in userResponse) {
            setImageUrl(userResponse.profile_picture);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        {editMode ? (
          <div className={styles.imageUploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className={styles.fileInput}
            />
            <Image
              src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
              alt="userImg"
              width={120}
              height={120}
              className={styles.userImg}
            />
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt="userImg"
            width={120}
            height={120}
            className={styles.userImg}
          />
        )}
        <section className={styles.nameAndRol}>
          <h1 className={styles.name}>{userInfo?.name || profileData?.name}</h1>
          <h2 className={styles.rol}>{translateRol(userInfo?.rol || '')}</h2>
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
                  onChange={handleInputChange}
                  placeholder="Name"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="headline"
                  value={editableProfileData.headline}
                  onChange={handleInputChange}
                  placeholder="Headline"
                  className={styles.editInput}
                />
                <div className={isFocused ? `${styles.editTextArea} ${styles.focusTextArea}` : styles.editTextArea}>
                  <textarea
                    name="description"
                    value={editableProfileData.description}
                    onChange={handleInputChange}
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
                onChange={(e, index, type) => handleInputChange(e, index, type as 'education' | 'experience' | 'recommendations')}
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
                onChange={(e, index, type) => handleInputChange(e, index, type as 'education' | 'experience' | 'recommendations')}
                styles={styles}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faEdit} onClick={toggleEditProfile} className={styles.editIcon} />

          <div className={styles.currentSection}>
            {currentSection === 'education' && (
              <DisplayedProfileSection
                currentSection={currentSection}
                profileData={profileData}
                styles={styles}
              />
            )}
            {currentSection === 'experience' && (
              <DisplayedProfileSection
                currentSection={currentSection}
                profileData={profileData}
                styles={styles}
              />
            )}
            {currentSection === 'recommendations' && (
              <DisplayedProfileSection
                currentSection={currentSection}
                profileData={profileData}
                styles={styles}
              />
            )}
            {currentSection === 'recommendations' && Array.isArray(profileData?.contacts) && profileData.contacts.map((contact) => (
              <div key={String(contact)}>
                {String(contact)}
              </div>
            ))}
            {currentSection === 'recommendations' && Array.isArray(requests) && requests.map((req) => (
              <div key={String(req)}>
                {String(req)}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
