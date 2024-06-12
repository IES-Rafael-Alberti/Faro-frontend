'use client'

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
import Icon from '@/components/icons';
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
  const [profileData, setProfileData] = useState<CompleteProfile | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface>();
  const [ediatableProfileData, setEditableProfileData] = useState<EditableProfileData>({
    id: '',
    name: '',
    headline: '',
    description: '',
    education: [{ id: '', degree: '', institution: '', start_date: '', end_date: null }],
    experience: [{ id: '', company: '', position: '', startDate: '', endDate: null, description: '' }],
    recommendations: [{ message: '', date: '', senderId: '' }],
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
        updatedArray[index] = Object.assign({}, updatedArray[index], { [name]: value });
        return Object.assign({}, prevFormData, { [type]: updatedArray });
      });
    } else {
      setEditableProfileData((prevFormData) => (Object.assign({}, prevFormData, { [name]: value })));
    }
  }

  const editProfile = async () => {
    try {
      // First, update the profile with all data
      const updatedFormData = { ...ediatableProfileData };
      const response = await updateProfileData(id, updatedFormData, token);
      console.log("Response", response);

      for (const id of deletedEducationIds) {
        await deleteData(`education/${id}`, token);
      }

      for (const id of deletedExperienceIds) {
        await deleteData(`experience/${id}`, token);
      }

      // Filter and submit new education entries
      const filteredEducation = await getFilteredEducation(ediatableProfileData, id, token);
      for (const edu of filteredEducation) {
        await submitEducation(edu, id, token);
      }

      // Filter and submit new experience entries
      const filteredExperience = await getFilteredExperience(ediatableProfileData, id, token);
      for (const exp of filteredExperience) {
        await submitExperience(exp, id, token);
      }

      // If there is additional user info to update
      let userResponse;
      if (userInfo !== undefined) {
        console.log("User Info", userInfo);
        userResponse = await updateUserData(id, userInfo, token);
        setUserInfo(userResponse);
        console.log("User Response", userResponse);
      }

      // Update the response name with the name from userResponse if userResponse is defined
      if (userResponse && userResponse.name) {
        response.name = userResponse.name;
      }

      // Update the profile data in the state
      setProfileData(response);

      // Refresh profile data
      const updatedProfile = await getProfileData(id, token, setProfileData, setRequests);
      if (updatedProfile !== undefined) {
        console.log("Updated Profile", updatedProfile);
        if (userResponse && userResponse.name) {
          updatedProfile.name = userResponse.name;
        }
        setProfileData(updatedProfile);
      }

      setDeletedEducationIds([]);
      setDeletedExperienceIds([]);
      // Toggle edit mode
      toggleEditProfile();
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
        console.log('Image uploaded successfully:', response);
        // Set the new image URL
        setImageUrl(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileResponse = await getProfileData(id, token, setProfileData, setRequests);
      const userResponse = await getUserBasicData(id, token, setProfileData, setUserInfo);
      setProfileData(profileResponse);
      if (userResponse !== null) {
        setUserInfo(userResponse);
        if (userResponse && 'profile_picture' in userResponse) {
          setImageUrl(userResponse.profile_picture); // assuming the avatar URL is stored in userResponse.avatar
        }
      }
    };

    fetchData();
  }, [id, token]);

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
          <h1 className={styles.name}>{userInfo?.username}</h1>
          <h2 className={styles.rol}>{translateRol(userInfo?.rol ? userInfo.rol : '')}</h2>
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
                  value={ediatableProfileData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="headline"
                  value={ediatableProfileData.headline}
                  onChange={handleInputChange}
                  placeholder="Headline"
                  className={styles.editInput}
                />
                <div className={isFocused ? `${styles.editTextArea} ${styles.focusTextArea}` : styles.editTextArea}>
                  <textarea
                    name="description"
                    value={ediatableProfileData.description}
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
              <>
                <DynamicProfileSection
                  data={ediatableProfileData.education}
                  setData={setEditableProfileData}
                  setListIds={setDeletedEducationIds}
                  type={'education'}
                  onAdd={addEducation}
                  onDelete={deleteEducation}
                  onChange={(e, index, type) => handleInputChange(e, index, type as "education" | "experience" | "recommendations")}
                  styles={styles}
                />
              </>
            )}

            {currentSection === 'experience' && (
              <>
                <DynamicProfileSection
                  data={ediatableProfileData.experience}
                  setData={setEditableProfileData}
                  setListIds={setDeletedExperienceIds}
                  type={'experience'}
                  onAdd={addExperience}
                  onDelete={deleteExperience}
                  onChange={(e, index, type) => handleInputChange(e, index, type as "education" | "experience" | "recommendations")}
                  styles={styles}
                />
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faEdit} onClick={toggleEditProfile} className={styles.editIcon} />

          <div className={styles.currentSection}>
            {
              <DisplayedProfileSection
                currentSection={currentSection}
                profileData={profileData}
                styles={styles}
              />
            }
            {
              <DisplayedProfileSection
                currentSection={currentSection}
                profileData={profileData}
                styles={styles}
              />
            }
            {
              <DisplayedProfileSection
                currentSection={currentSection}
                profileData={profileData}
                styles={styles}
              />
            }
            {currentSection === 'recommendations' && Array.isArray(profileData?.recommendations) && profileData.recommendations.map((rec, index) => (
              <div key={index}>
                <p>{rec.message}</p>
                <p>{rec.date?.toString()}</p>
              </div>
            ))}
            {currentSection === 'recommendations' && Array.isArray(profileData?.contacts) && profileData.contacts.map((contact) => (
              <div key={String(contact)}>
                {String(contact)}
              </div>
            ))}
            {/* <h2>Request recibidas de otros usuarios</h2> */}
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