'use client'
import { AuthContext } from "@/app/context/auth";
import { submitFriendRequest } from "@/utils/submitData";
import { useContext, useEffect, useState } from "react";
import styles from '../page.module.css'
import translateRol from "@/app/context/translate";
import DisplayedProfileSection from "@/components/profile/DisplayedProfileSection";
import ProfileNavbar from "@/components/profile/ProfileNavbar";
import { faCancel, faSave, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userInfo } from "os";
import Image from "next/image";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";
import { CompleteProfile } from "@/types/profile/CompleteProfile.interface";
import { fetchBasicUserInfo, fetchProfileData } from "@/utils/fetchData";

export default function OtherUsersProfile({ params }: { params: { profileId: string; }; }) {
  const { profileId } = params
  const { id, token, setId } = useContext(AuthContext)
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [profileData, setProfileData] = useState<CompleteProfile>();
  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface>();

  const sendFriendRequest = async () => {
    const response = await submitFriendRequest(id, profileId, token)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetchProfileData(profileId, token);
      const responseUserInfo = await fetchBasicUserInfo(profileId, token);
      setProfileData(response);
      setUserInfo(responseUserInfo);
    }
    fetchData();
  }, [profileId]);

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        <Image
          src={imageUrl}
          alt="userImg"
          width={120}
          height={120}
          className={styles.userImg}
        />
        <section className={styles.nameAndRol}>
          <h1 className={styles.name}>{userInfo?.username}</h1>
          <h2 className={styles.rol}>{translateRol(userInfo?.rol ? userInfo.rol : '')}</h2>
        </section>
        <button className={styles.addButton}></button>
      </header>
      <ProfileNavbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        styles={styles}
      />
      <div className={styles.currentSection}>
        <DisplayedProfileSection
          currentSection={currentSection}
          profileData={profileData}
          styles={styles}
        />
      </div>
    </main >
  )
}
