'use client'
import { AuthContext } from "@/app/context/auth";
import { submitFriendRequest } from "@/utils/submitData";
import { useContext, useEffect, useState } from "react";
import styles from '../page.module.css';
import translateRol from "@/app/context/translate";
import ProfileNavbar from "@/components/profile/ProfileNavbar";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";
import { fetchBasicUserInfo } from "@/utils/fetchData";
import Image from "next/image";

export default function OtherUsersProfile({ params }: { params: { profileId: string; }; }) {
  const { profileId } = params
  const { id, token, setId } = useContext(AuthContext)
  const [currentSection, setCurrentSection] = useState<'profile' | 'education' | 'experience' | 'recommendations'>('profile');
  const [userInfo, setUserInfo] = useState<BasicUserInfoInterface>();
  const sendFriendRequest = async () => {
    const response = await submitFriendRequest(id, profileId, token)
  }

  useEffect(() => {
    fetchBasicUserInfo(profileId, token).then((data) => {
      setUserInfo(data)
    })
  }, [profileId, token])

  return (
    <main className={styles.wrapper}>
      <header className={styles.basicInfo}>
        <Image src={userInfo?.profile_picture ? userInfo.profile_picture : '/images/default-avatar.png'} alt={`${userInfo?.username} avatar`} width={100} height={100} className={styles.userImg} />
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