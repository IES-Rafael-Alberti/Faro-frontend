"use client"
import { NextPage } from 'next'
import FeedPublications from '@/components/Feed/FeedPublications'
import BasicUserInfoCard from '@/components/Feed/BasicUserInfoCard'
import CreatePublication from '@/components/Feed/CreatePublication'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '@/app/context/auth'
import styles from './page.module.css'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface'
import { HashLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface Props {}

/**
 * React component for the main page of the application.
 * 
 * This component displays the user's basic information, allows them to create publications, and shows their feed of publications.
 * 
 * @returns {JSX.Element} - The JSX element representing the main page.
 */
const Page: NextPage<Props> = () => {
  const { id, token } = useContext(AuthContext); // Authentication context.
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state.
  const [updateFeed, setUpdateFeed] = useState(false); // State to trigger feed update.
  const [user, setUser] = useState<BasicUserInfoInterface>({ // State to store user's basic information.
    username: '',
    rol: '',
    count_of_publications: 0,
    count_of_connections: 0,
    profile_picture: ''
  });

  /**
   * Effect to fetch user's basic information on component mount.
   */
  useEffect(() => {
    fetchBasicUserInfo(id, token).then((response) => {
      setUser(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [id, token, updateFeed]);

  /**
   * Function to handle feed update.
   */
  const handleUpdateFeed = () => {
    setUpdateFeed(true);
  };

  useEffect(() => {
    if (updateFeed) {
      setUpdateFeed(false);
    }
  }, [updateFeed]);

  return (
    <main className={isLoading ? `${styles.wrapper} ${styles.centerAll}` : styles.wrapper}>
      {isLoading && <HashLoader color="#163D64"/>}
      <aside className={styles.rightPart}>{!isLoading && <BasicUserInfoCard user={user} />}
      {!isLoading && <div className={styles.contactPart}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon}/>
        <p className={styles.contactInfo}>Para ponerse en contacto con el equipo de soporte haga click <Link href="mailto:faro@iesrafaelalberti.com">aquí</Link></p>
        </div>}
      </aside>
      {!isLoading && <CreatePublication userImg={user.profile_picture} onUpdateFeed={handleUpdateFeed}/>}
      {!isLoading && <FeedPublications token={token} id={id} updateFeed={updateFeed} handleUpdateFeed={handleUpdateFeed} />}

    </main>
  )
}

export default Page
