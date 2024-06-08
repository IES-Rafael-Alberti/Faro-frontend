'use client';

import { checkEducationExists, checkExperienceExists, fetchProfileData, fetchSenderRecommendations } from '../../utils/fetchData';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/context/auth';
import { CompleteProfile } from '../../types/profile/CompleteProfile.interface';
import { updateProfileData } from '../../utils/updateData';
import { EditableProfileData } from '@/types/profile/editableProfileData.interface';
import { RequestInterface } from '@/types/profile/requests.interface';
import { submitEducation, submitExperience } from '@/utils/submitData';

export default function Profile() {
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
    education: [{ degree: '', institution: '', start_date: '', end_date: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
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
          degree: ed.degree || '',
          institution: ed.institution || '',
          start_date: ed.start_date ? new Date(ed.start_date).toISOString().split('T')[0] : '',
          end_date: ed.end_date ? new Date(ed.end_date).toISOString().split('T')[0] : ''
        })),
        experience: profileData.experience.map(ex => ({
          company: ex.company || '',
          position: ex.position || '',
          startDate: ex.startDate ? new Date(ex.startDate).toISOString().split('T')[0] : '',
          endDate: ex.endDate ? new Date(ex.endDate).toISOString().split('T')[0] : '',
          description: ex.description || ''
        })),
        recommendations: profileData.recommendations.map(rec => ({
          message: rec.message || '',
          date: rec.date ? new Date(rec.date).toISOString().split('T')[0] : '',
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
      education: [...prevFormData.education, { degree: '', institution: '', start_date: '', end_date: '' }]
    }));
  };

  const addExperience = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: [...prevFormData.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
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
    <div>
      <div>
        <button onClick={() => setCurrentSection('profile')}>Profile</button>
        <button onClick={() => setCurrentSection('education')}>Education</button>
        <button onClick={() => setCurrentSection('experience')}>Experience</button>
        <button onClick={() => setCurrentSection('recommendations')}>Recommendations</button>
      </div>
      {editMode ? (
        <div>
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
                      value={edu.start_date}
                      onChange={(e) => handleInputChange(e, index, 'education')}
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      name="end_date"
                      value={edu.end_date || ''}
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
                      value={exp.startDate}
                      onChange={(e) => handleInputChange(e, index, 'experience')}
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={exp.endDate || ''}
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
                    value={rec.date}
                    onChange={(e) => handleInputChange(e, index, 'recommendations')}
                    placeholder="Date"
                  />
                </div>
              ))
            ) : (
              <p>You don't have any recommendations.</p>
            )
          )}

          <button onClick={editProfile}>Save</button>
          <button onClick={toggleEditProfile}>Cancel</button>
        </div>
      ) : (
        <div>
          {currentSection === 'profile' && (
            <>
              <h2>{profileData?.name}</h2>
              <h1>{profileData?.headline}</h1>
              <p>{profileData?.description}</p>
            </>
          )}
          {currentSection === 'education' && Array.isArray(profileData?.education) && profileData.education.map((edu, index) => (
            <div key={index}>
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <p>{edu.start_date?.toString()} - {edu.end_date?.toString()}</p>
            </div>
          ))}
          {currentSection === 'experience' && Array.isArray(profileData?.experience) && profileData.experience.map((exp, index) => (
            <div key={index}>
              <h3>{exp.company}</h3>
              <p>{exp.position}</p>
              <p>{exp.startDate?.toString()} - {exp.endDate?.toString()}</p>
              <p>{exp.description}</p>
            </div>
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
          <h2>Request recibidas de otros usuarios</h2>
          {currentSection === 'recommendations' && Array.isArray(requests) && requests.map((req) => (
            <div key={String(req)}>
              {String(req)}
            </div>
          ))}
          <button onClick={toggleEditProfile}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}
