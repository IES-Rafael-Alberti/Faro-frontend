
'use client';

import { fetchBasicUserInfo, fetchProfileData, getUserBasicData } from '@/utils/fetchData';
import { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/auth';
import { updateProfileData, updateUserData } from '@/utils/updateData';
import { RequestInterface } from '@/types/profile/requests.interface';
import { submitAvatar, submitEducation, submitExperience, submitProfileData } from '@/utils/submitData';
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
import { addEducation, addExperience, deleteEducation, deleteEducationExperience, deleteExperience, getFilteredEducation, getFilteredExperience, submitNewEducations, submitNewExperience } from '@/utils/profileFunctions';
import { EducationInterface } from '@/types/profile/education.interface';
import { ProfileInterface } from '@/types/profile/Profile.interface';
import ImageInput from '@/components/profile/image/ImageInput';
import { ExperienceInterface } from '@/types/profile/experience.interface';
import { CompleteProfile } from '@/types/profile/CompleteProfile.interface';
import { UpdateProfileData } from '@/types/profile/UpdateProfileData.interface';
import { RecommendationInterface } from '@/types/profile/recomendation.interface';

export default function Profile() {
  const { id, token } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [education, setEducation] = useState<EducationInterface[]>([]);
  const [deletedEducationIds, setDeletedEducationIds] = useState<string[]>([]);
  const [experience, setExperience] = useState<ExperienceInterface[]>([]);
  const [deletedExperienceIds, setDeletedExperienceIds] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationInterface[]>([]);
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [profileData, setProfileData] = useState<ProfileInterface>();
  const [basicUserInfo, setBasicUserInfo] = useState<BasicUserInfoInterface>();
  const [combinedProfileData, setCombinedProfileData] = useState<CompleteProfile>();

  const toggleEditProfile = () => {
    setEditMode(!editMode);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          [name]: value,
        };
      }
      // This should not normally happen if the initial state is properly set
      return undefined;
    });
  };
  
  const saveProfileData = async () => {
    toggleEditProfile();
    console.log("SAAVING Profile DATA", profileData)
    await deleteEducationExperience(deletedEducationIds, deletedExperienceIds, token);
    
    const completeProfileData : UpdateProfileData = {
      ...profileData,
      id: profileData?.id ?? '',
      name: profileData?.name ?? '',
      education: education,
      receivedRequests: requests,
      experience: experience,
      recommendations: recommendations,
      contacts: [],
      publications: []
    }
    console.log("COMPLETE PROFILE DATA", completeProfileData);
    
    await updateProfileData(id, completeProfileData, token);

    fetchData();

  }
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchProfileData(`${id}`, token);
  
      // Extract the profile picture separately
      let profilePicture = null;
      if ('users_profile_profile_picture' in response.profile) {
        profilePicture = response.profile.users_profile_profile_picture;
      }
  
      // Remove the profile picture from the profile data
      const { users_profile_profile_picture, ...profileDataWithoutPicture } = response.profile;
  
      const userInfoResponse = await fetchBasicUserInfo(`${id}`, token);
  
      const completeProfileData = {
        profile: profileDataWithoutPicture, // Profile data without the picture
        education: response.education,
        experience: response.experience,
        receivedRequests: response.receivedRequests,
        contacts: response.contacts || [],
        publications: response.publications || [],
        recommendations: response.recommendations || [], // Add the 'recommendations' property
      };
      console.log("ATTEMPT TO FIX THE IMAGE ISSUE 1: ", completeProfileData);
  
      setBasicUserInfo(userInfoResponse);
      setProfileData(profileDataWithoutPicture);
      setEducation(response.education);
      setExperience(response.experience);
      setRequests(response.receivedRequests);
      setCombinedProfileData(completeProfileData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

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
          <FontAwesomeIcon icon={faSave} onClick={saveProfileData} className={styles.editIcon} />
          <div className={styles.currentSection}>
            {currentSection === 'profile' && (
              <>
                <input
                  type="text"
                  name="name"
                  value={profileData?.name ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Name"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="headline"
                  value={profileData?.headline ?? ''}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Headline"
                  className={styles.editInput}
                />
                <div className={isFocused ? `${styles.editTextArea} ${styles.focusTextArea}` : styles.editTextArea}>
                  <textarea
                    name="description"
                    value={profileData?.description ?? ''}
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
                data={education}
                setData={setEducation}
                setListIds={setDeletedEducationIds}
                type={'education'}
                onAdd={addEducation}
                onDelete={(id) => deleteEducation(setDeletedEducationIds, setEducation,id)}
                styles={styles}
              />
            )}
            {currentSection === 'experience' && (
              <DynamicProfileSection
                data={experience}
                setData={setExperience}
                setListIds={setDeletedExperienceIds}
                type={'experience'}
                onAdd={addExperience}
                onDelete={(id) => deleteExperience(setDeletedExperienceIds, setExperience, id)}
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
              profileData={combinedProfileData}
              styles={styles}
            />
          </div>
        </>
      )}
    </main>
  );
}
