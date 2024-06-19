'use client'
import { AuthContext } from "@/app/context/auth";
import { submitFriendRequest } from "@/utils/submitData";

import { log } from "console";
import { useContext, useState } from "react";
import styles from '../page.module.css';
import translateRol from "@/app/context/translate";
import DisplayedProfileSection from "@/components/profile/DisplayedProfileSection";
import ProfileNavbar from "@/components/profile/ProfileNavbar";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OtherUsersProfile({ params }: { params: { profileId: string; }; }) {
  const { profileId } = params
  const { id, token, setId } = useContext(AuthContext)
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');

  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface>();

  const sendFriendRequest = async () => {
    const response = await submitFriendRequest(id, profileId, token)
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
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
    </main>
  )
}