'use client'
import { AuthContext } from "@/app/context/auth";
import { submitFriendRequest } from "@/utils/submitData";
import { useContext, useEffect, useState } from "react";
import styles from '../page.module.css';
import { translateRol } from "@/app/context/translate";
import ProfileNavbar from "@/components/profile/ProfileNavbar";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";
import { fetchBasicUserInfo, fetchProfileData } from "@/utils/fetchData";
import Image from "next/image";
import DisplayedProfileSection from "@/components/profile/DisplayedProfileSection";
import { CompleteProfile } from "@/types/profile/CompleteProfile.interface";

export default function OtherUsersProfile({ params }: { params: { profileId: string; }; }) {
  const { profileId } = params
  const { id, token, setId } = useContext(AuthContext)
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience'>('profile');
  const [profileData, setProfileData] = useState<CompleteProfile>();
  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [combinedProfileData, setCombinedProfileData] = useState<CompleteProfile>();

  const sendFriendRequest = async () => {
    const response = await submitFriendRequest(id, profileId, token)
  }

  const fetchData = async () => {
    try {

      const response = await fetchProfileData(profileId, token);
      const userInfoResponse = await fetchBasicUserInfo(profileId, token);
  
      const completeProfileData = {
        profile: response.profile, 
        education: response.education,
        experience: response.experience,
        receivedRequests: response.receivedRequests,
        contacts: response.contacts || [],
        publications: response.publications || [],
        recommendations: response.recommendations || [], 
      };

      console.log(completeProfileData)
      console.log(userInfoResponse)
      setCombinedProfileData(completeProfileData);
      setUserInfo(userInfoResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [profileId, token]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        <Image src={userInfo?.profile_picture ? userInfo.profile_picture : '/imgs/no-user-image.jpg'} alt={`${userInfo?.username} avatar`} width={100} height={100} className={styles.userImg} />
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
      <div className={styles.currentSection}>
        <DisplayedProfileSection
          currentSection={currentSection}
          profileData={combinedProfileData}
          styles={styles}
        />
      </div>
    </main >
  ) 
}
