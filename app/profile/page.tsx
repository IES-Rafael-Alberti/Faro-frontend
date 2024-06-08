'use client'

import { checkEducationExists, checkExperienceExists, fetchProfileData, fetchSenderRecommendations } from '../../utils/fetchData';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '@/app/context/auth';
import { CompleteProfile } from '../../types/profile/CompleteProfile.interface';
import { updateProfileData } from '../../utils/updateData';
import { EditableProfileData } from '@/types/profile/editableProfileData.interface';
import { RequestInterface } from '@/types/profile/requests.interface';
import { submitEducation, submitExperience } from '@/utils/submitData';
import styles from './page.module.css';
import { montserrat } from '../ui/fonts';
import Image from 'next/image';
import Icon from '@/components/icons';

export default function Profile() {
  const firstButtonRef = useRef(null);
  const { id, token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState<CompleteProfile | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [formData, setFormData] = useState<EditableProfileData>({
    id: '',
    name: '',
    headline: '',
    description: '',
    education: [{ degree: '', institution: '', start_date: '', end_date: null }],
    experience: [{ company: '', position: '', startDate: '', endDate: null, description: '' }],
    recommendations: [{ message: '', date: '', senderId: '' }],
    publications: [{ user_publication_msg: '', users_publications_created_at: '' }]
  });

  useEffect(() => {
    firstButtonRef.current.focus();
  }, []);

  const toggleEditProfile = () => {
    setEditMode(!editMode);
    if (!editMode && profileData) {
      setFormData({
        id: profileData.id,
        name: profileData.name,
        headline: profileData.headline || '',
        description: profileData.description || '',
        education: profileData.education.map(ed => ({
          degree: ed.degree || '',
          institution: ed.institution || '',
          start_date: ed.start_date.toString() || '',
          end_date: ed.end_date?.toString() || null
        })),
        experience: profileData.experience.map(ex => ({
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

  const getSenderRecommendations = async () => {
    try {
      const senderIds = profileData?.recommendations.map(rec => rec.senderId) || [];
      const response = await fetchSenderRecommendations(senderIds, token);
      // Handle response as needed
    } catch (error) {
      console.error('Error fetching sender recommendations:', error);
    }
  };

  const handleInputChange = (e: any, index?: number, type?: 'education' | 'experience' | 'recommendations') => {
    const { name, value } = e.target;
    if (type && index !== undefined) {
      setFormData((prevFormData) => {
        const updatedArray = [...prevFormData[type]];
        updatedArray[index] = { ...updatedArray[index], [name]: value };
        return { ...prevFormData, [type]: updatedArray };
      });
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const addEducation = () => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        education: [...prevFormData.education, { degree: '', institution: '', start_date: '0000-00-00', end_date: null }]
    }));
};

const addExperience = () => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        experience: [...prevFormData.experience, { company: '', position: '', startDate: '0000-00-00', endDate: null, description: '' }]
    }));
};


  const getFilteredEducation = async () => {
    const newEducation = await Promise.all(formData.education.map(async (ed) => {
      const exists = await checkEducationExists(id, ed, token);
      return { entry: ed, exists };
    }));
    return newEducation.filter(({ exists }) => !exists).map(({ entry }) => entry);
  };

  const getFilteredExperience = async () => {
    const newExperience = await Promise.all(formData.experience.map(async (exp) => {
      const exists = await checkExperienceExists(id, exp, token);
      return { entry: exp, exists };
    }));
    return newExperience.filter(({ exists }) => !exists).map(({ entry }) => entry);
  };

  const editProfile = async () => {
    try {
        const updatedFormData = { ...formData };

        // Submit the entire updated education and experience lists to the backend
        const response = await updateProfileData(updatedFormData, token);
        console.log("Response", response);
        
        setProfileData(response);

        // Refresh profile data
        const updatedProfile = await getProfileData();
        if (updatedProfile !== undefined) {
            console.log("Updated Profile", updatedProfile);
            setProfileData(updatedProfile);
        }
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

  useEffect(() => {
    getProfileData();
  }, [id, token]);

  useEffect(() => {
    console.log("Received Requests from other users", requests);
  }, [requests]);

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        <Image src="/imgs/no-user-image.jpg" alt="userImg" width={120} height={120} className={styles.userImg} />
        <section className={styles.nameAndRol}>
          <h1 className={styles.name}>Pablo Fornell</h1>
          <h2 className={styles.rol}>Estudiante (rol)</h2>
        </section>
      </header>
      <div className={styles.buttonsContainer}>
          <button ref={firstButtonRef} className={`${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('profile')}>Perfil</button>
          <button className={`${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('education')}>Educación</button>
          <button className={`${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('experience')}>Experiencia</button>
          <button className={`${styles.sectionButton} ${montserrat.className} antialised`} onClick={() => setCurrentSection('recommendations')}>Recomendaciones</button>
      </div>
      {editMode ? (
        <div>
          <button onClick={editProfile}>Save</button>
          <button onClick={toggleEditProfile}>Cancel</button>
          {currentSection === 'profile' && (
            <>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleInputChange}
                placeholder="Headline"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
            </>
          )}
          {currentSection === 'education' && (
            <>
              {formData.education.length > 0 ? (
                formData.education.map((edu, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleInputChange(e, index, 'education')}
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      name="institution"
                      value={edu.institution}
                      onChange={(e) => handleInputChange(e, index, 'education')}
                      placeholder="Institution"
                    />
                    <input
                      type="date"
                      name="start_date"
                      value={edu.start_date.toString()}
                      onChange={(e) => handleInputChange(e, index, 'education')}
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={edu.end_date?.toString() || ''}
                      onChange={(e) => handleInputChange(e, index, 'education')}
                      placeholder="End Date"
                    />
                  </div>
                ))
              ) : (
                <p>You don't have any education records.</p>
              )}
              <button onClick={addEducation}>Add Education</button>
            </>
          )}

          {currentSection === 'experience' && (
            <>
              {formData.experience.length > 0 ? (
                formData.experience.map((exp, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleInputChange(e, index, 'experience')}
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleInputChange(e, index, 'experience')}
                      placeholder="Position"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={exp.startDate.toString()}
                      onChange={(e) => handleInputChange(e, index, 'experience')}
                      placeholder="Start Date"
                      />
                      <input
                        type="date"
                        name="endDate"
                        value={exp.endDate?.toString() || ''}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        placeholder="End Date"
                      />
                      <textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleInputChange(e, index, 'experience')}
                        placeholder="Description"
                      />
                    </div>
                  ))
                ) : (
                  <p>You don't have any experience records.</p>
                )}
                <button onClick={addExperience}>Add Experience</button>
              </>
            )}
  
            {currentSection === 'recommendations' && (
              formData.recommendations.length > 0 ? (
                formData.recommendations.map((rec, index) => (
                  <div key={index}>
                    <textarea
                      name="message"
                      value={rec.message}
                      onChange={(e) => handleInputChange(e, index, 'recommendations')}
                      placeholder="Message"
                    />
                    <input
                      type="date"
                      name="date"
                      value={rec.date.toString()}
                      onChange={(e) => handleInputChange(e, index, 'recommendations')}
                      placeholder="Date"
                    />
                  </div>
                ))
              ) : (
                <p>You don't have any recommendations.</p>
              )
            )}
          </div>
        ) : (
          <div>
            {currentSection === 'profile' && (
              <section className={styles.profile}>
                <h3 className={styles.headline}>{profileData?.headline}</h3>
                <p className={styles.biography}>{profileData?.description}</p>
              </section>
            )}
            {currentSection === 'education' && Array.isArray(profileData?.education) && profileData.education.map((edu, index) => (
              <section className={styles.education} key={index}>
                <div className={styles.iconContainer}><Icon src='/icons/studentIcon.svg' width={40} height={40}/></div>
                <div className={styles.studiesInfo}>
                  <h3 className={styles.degree}>{edu.degree}</h3>
                  <p className={styles.info}>{edu.institution}, {edu.start_date?.toString().slice(0, 4)} - {edu.end_date ? edu.end_date?.toString().slice(0, 4) : 'Actualidad'}</p>
                </div>
              </section>
            ))}
            {currentSection === 'experience' && Array.isArray(profileData?.experience) && profileData.experience.map((exp, index) => (
              <section className={styles.experience} key={index}>
                <div className={styles.iconContainer}><Icon src='/icons/studentIcon.svg' width={40} height={40}/></div>
                <div className={styles.workInfo}>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.info}>{exp.position}, {exp.startDate?.toString().slice(0, 4)} - {exp.endDate ? exp.endDate?.toString().slice(0, 4) : 'Actualidad'}</p>
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
            <button onClick={toggleEditProfile}>Edit Profile</button>
          </div>
        )}
      </main>
    );
  }
  