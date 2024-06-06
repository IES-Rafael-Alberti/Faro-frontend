'use client';

import { fetchData, fetchProfileData } from "../../utils/fetchData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { CompleteProfile } from "../../types/profile/CompleteProfile.interface";
import { PROFILE_URL } from "../../types/consts";
import { updateData, updateProfileData } from "../../utils/updateData";
import { get } from "http";


export default function Profile() {
  const { id, token } = useContext(AuthContext);
  const [profileData, setProfileData] = useState<CompleteProfile | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  // TODO: Check if this type of implementation is correct
  const [formData, setFormData] = useState<CompleteProfile>({
    id: '',
    headline: '',
    description: '',
    education: [{ degree: '', institution: '', start_date: '', end_date: '' }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    recommendations: [{ message: '', date: '', senderId: '' }]
  });

  const toggleEditProfile = () => {
    setEditMode(!editMode);
    if (profileData) {
      setFormData({
        id: profileData.id,
        headline: profileData.headline || '',
        description: profileData.description || '',
        education: profileData.education.map(ed => ({
          degree: ed.degree || '',
          institution: ed.institution || '',
          start_date: ed.start_date.toString() || '',
          end_date: ed.end_date.toString() || ''
        })),
        experience: profileData.experience.map(ex => ({
          company: ex.company || '',
          position: ex.position || '',
          startDate: ex.startDate.toString() || '',
          endDate: ex.endDate.toString() || '',
          description: ex.description || ''
        })),
        recommendations: profileData.recommendations.map(rec => ({
          message: rec.message || '',
          date: rec.date.toString() || '',
          senderId: rec.senderId || '',
        }))
      });
    }
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number, type?: 'education' | 'experience' | 'recommendations') => {
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

  const editProfile = async () => {
    try {
      // Send the updated profile data to the backend
      const response = await updateProfileData(formData, token);
      console.log('Updated profile data from response:', response);

      // Update the profile data state with the new response
      setProfileData(response);

      // Fetch the updated profile data from the backend
      const updatedProfile = await getProfileData();
      console.log('Fetched updated profile data:', updatedProfile);

      if (updatedProfile !== undefined) {
        // Update the profile data state with the fetched data
        setProfileData(updatedProfile);
      }
      // Toggle the edit profile view
      toggleEditProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  const getProfileData = async () => {
    try {
      const response = await fetchProfileData(`${id}`, token);
      setProfileData(response);
      console.log('Profile data:', response);
      return response;
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [id, token]);

  return (
    <div>
      {editMode ? (
        <div>
          {currentSection === 'profile' && (
            <>
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
          {currentSection === 'education' && formData.education.map((edu, index) => (
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
                name="startDate"
                value={edu.start_date.toString()}
                onChange={(e) => handleInputChange(e, index, 'education')}
                placeholder="Start Date"
              />
              <input
                type="date"
                name="endDate"
                value={edu.end_date.toString()}
                onChange={(e) => handleInputChange(e, index, 'education')}
                placeholder="End Date"
              />
            </div>
          ))}
          {currentSection === 'experience' && formData.experience.map((exp, index) => (
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
                value={exp.endDate.toString()}
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
          ))}
          {currentSection === 'recommendations' && formData.recommendations.map((rec, index) => (
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
          ))}
          <button onClick={editProfile}>Save</button>
          <button onClick={toggleEditProfile}>Cancel</button>
        </div>
      ) : (
        <div>
          {currentSection === 'profile' && (
            <>
              <h1>{profileData?.headline}</h1>
              <p>{profileData?.description}</p>
            </>
          )}
          {currentSection === 'education' && profileData?.education?.map((edu, index) => (
            <div key={index}>
              <h3>{edu.degree}</h3>
              <p>{edu.institution}</p>
              <p>{edu.start_date?.toString()} - {edu.end_date?.toString()}</p>
            </div>
          ))}
          {currentSection === 'experience' && profileData?.experience?.map((exp, index) => (
            <div key={index}>
              <h3>{exp.company}</h3>
              <p>{exp.position}</p>
              <p>{exp.startDate?.toString()} - {exp.endDate?.toString()}</p>
              <p>{exp.description}</p>
            </div>
          ))}
          {currentSection === 'recommendations' && profileData?.recommendations?.map((rec, index) => (
            <div key={index}>
              <p>{rec.message}</p>
              <p>{rec.date?.toString()}</p>
            </div>
          ))}

          <button onClick={toggleEditProfile}>Edit Profile</button>
        </div>
      )}
      <div>
        <button onClick={() => setCurrentSection('profile')}>Profile</button>
        <button onClick={() => setCurrentSection('education')}>Education</button>
        <button onClick={() => setCurrentSection('experience')}>Experience</button>
        <button onClick={() => setCurrentSection('recommendations')}>Recommendations</button>
      </div>
    </div>
  );
}
