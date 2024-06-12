'use client'

import { fetchBasicUserInfo, fetchProfileData } from '../../utils/fetchData';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/app/context/auth';
import { CompleteProfile } from '../../types/profile/CompleteProfile.interface';
import { updateProfileData, updateUserData } from '../../utils/updateData';
import { EditableProfileData } from '@/types/profile/editableProfileData.interface';
import { RequestInterface } from '@/types/profile/requests.interface';
import { submitAvatar, submitEducation, submitExperience } from '@/utils/submitData';
import styles from './page.module.css';
import { montserrat } from '../ui/fonts';
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface';
import { deleteData } from '@/utils/deleteData';
import Image from 'next/image';
import Icon from '@/components/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCancel, faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import translateRol from '../context/translate';
import DynamicProfileSection from '@/components/profile/DynamicProfileSection';
import { addEducation, addExperience, deleteEducation, deleteExperience, getFilteredExperience, getFilteredEducation } from '@/utils/profileFunctions';

export default function Profile() {
  const { id, token } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [deletedEducationIds, setDeletedEducationIds] = useState<string[]>([]);
  const [deletedExperienceIds, setDeletedExperienceIds] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<CompleteProfile | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface>();
  const [formData, setFormData] = useState<EditableProfileData>({
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
      setFormData({
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

  const scrollTo = (ref: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: any, index?: number, type?: 'education' | 'experience' | 'recommendations') => {
    const { name, value } = e.target;
    if (type && index !== undefined) {
      setFormData((prevFormData) => {
        const updatedArray = prevFormData[type].slice();
        updatedArray[index] = Object.assign({}, updatedArray[index], { [name]: value });
        return Object.assign({}, prevFormData, { [type]: updatedArray });
      });
    } else {
      setFormData((prevFormData) => (Object.assign({}, prevFormData, { [name]: value })));

    }
  }  

  const editProfile = async () => {
    try {
      // First, update the profile with all data
      const updatedFormData = { ...formData };
      const response = await updateProfileData(id, updatedFormData, token);
      console.log("Response", response);

      for (const id of deletedEducationIds) {
        await deleteData(`education/${id}`, token);
      }

      for (const id of deletedExperienceIds) {
        await deleteData(`experience/${id}`, token);
      }

      // Filter and submit new education entries
      const filteredEducation = await getFilteredEducation(formData, id, token);
      for (const edu of filteredEducation) {
        await submitEducation(edu, id, token);
      }

      // Filter and submit new experience entries
      const filteredExperience = await getFilteredExperience(formData, id, token);
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
      const updatedProfile = await getProfileData();
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

  const getProfileData = async () => {
    const response = await fetchProfileData(`${id}`, token);
    const { receivedRequests } = response;
    setProfileData(response);
    setRequests(receivedRequests);
    return response;
  };


  const getUserBasicData = async () => {
    try {
      const response = await fetchBasicUserInfo(id, token);
      setProfileData((prevProfileData) => {
        const updatedProfileData = {
          id: id,
          name: response.username || 'Default Name',
          experience: prevProfileData?.experience || [],
          education: prevProfileData?.education || [],
          recommendations: prevProfileData?.recommendations || [],
          contacts: prevProfileData?.contacts || [],
          publications: prevProfileData?.publications || [],
          receivedRequests: prevProfileData?.receivedRequests || []
        };
        return Object.assign({}, prevProfileData, updatedProfileData);
      });
      setUserInfo(response);
    } catch (error) {
      console.error('Error fetching user basic data:', error);
      return null;
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      // Now call submitAvatar to upload the image
      submitAvatar(file, id, token)
        .then(response => {
          console.log('Image uploaded successfully:', response);
          // Update the profile data or UI as needed
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const profileResponse = await getProfileData();
      const userResponse = await getUserBasicData();
      setProfileData(profileResponse);
      if (userResponse !== null) {
        setUserInfo(userResponse);
      }
    };

    fetchData();
  }, [id, token]);

  useEffect(() => {
    // console.log("Received Requests from other users", requests);
  }, [requests]);

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        {editMode ? (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        ) : (
          <Image
            src={imageFile ? URL.createObjectURL(imageFile) : "/imgs/no-user-image.jpg"}
            alt="userImg"
            width={120}
            height={120}
            className={styles.userImg}
          />)}
        <section className={styles.nameAndRol}>
          <h1 className={styles.name}>{userInfo?.username}</h1>
          <h2 className={styles.rol}>{translateRol(userInfo?.rol ? userInfo.rol : '')}</h2>
        </section>
      </header>
      <div className={styles.buttonsContainer}>
        <button className={currentSection === 'profile' ? `${styles.sectionButton} ${styles.focus} ${montserrat.className} antialised` : `${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('profile')}>Perfil</button>
        <button className={currentSection === 'education' ? `${styles.sectionButton} ${styles.focus} ${montserrat.className} antialised` : `${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('education')}>Educación</button>
        <button className={currentSection === 'experience' ? `${styles.sectionButton} ${styles.focus} ${montserrat.className} antialised` : `${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('experience')}>Experiencia</button>
        <button className={currentSection === 'recommendations' ? `${styles.sectionButton} ${styles.focus} ${montserrat.className} antialised` : `${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('recommendations')}>Recomendaciones</button>
      </div>
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
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className={styles.editInput}
                />
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  placeholder="Headline"
                  className={styles.editInput}
                />
                <div className={isFocused ? `${styles.editTextArea} ${styles.focusTextArea}` : styles.editTextArea}>
                  <textarea
                    name="description"
                    value={formData.description}
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
                  data={formData.education}
                  setData={setFormData}
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
                  data={formData.experience}
                  setData={setFormData}
                  setListIds={setDeletedExperienceIds}
                  type={'experience'}
                  onAdd={addExperience}
                  onDelete={deleteExperience}
                  onChange={(e, index, type) => handleInputChange(e, index, type as "education" | "experience" | "recommendations")}
                  styles={styles}
                />
              </>
            )}

            {/*currentSection === 'recommendations' && (
              <>
                <DynamicProfileSection/>
              </>
            )*/}
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faEdit} onClick={toggleEditProfile} className={styles.editIcon} />

          <div className={styles.currentSection}>
            {currentSection === 'profile' && (
              <section className={styles.profile}>
                <h3 className={styles.headline}>{profileData?.headline}</h3>
                <p className={styles.biography}>{profileData?.description}</p>
              </section>
            )}
            {currentSection === 'education' && Array.isArray(profileData?.education) && profileData.education.map((edu, index) => (
              <section className={styles.education} key={index}>
                <div className={styles.iconContainer}><Icon src='/icons/studentIcon.svg' width={40} height={40} /></div>
                <div className={styles.studiesInfo}>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <p className={styles.info}>{edu.institution}, {edu.start_date?.toString().slice(0, 4)} - {edu.end_date ? edu.end_date?.toString().slice(0, 4) : 'Actualidad'}</p>
                </div>
              </section>
            ))}
            {currentSection === 'experience' && Array.isArray(profileData?.experience) && profileData.experience.map((exp, index) => (
              <section className={styles.expContainer} key={index}>
                <div className={styles.experience}>
                  <div className={styles.iconContainer}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /></div>
                  <div className={styles.workInfo}>
                    <h3 className={styles.company}>{exp.company}</h3>
                    <p className={styles.info}>{exp.position}, {exp.startDate?.toString().slice(0, 4)} - {exp.endDate ? exp.endDate?.toString().slice(0, 4) : 'Actualidad'}</p>
                  </div>
                </div>
                <p className={styles.description}>{exp.description}</p>
              </section>
            ))}
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