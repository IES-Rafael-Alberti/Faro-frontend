'use client'

import { NextPage } from 'next'
import React, { useState, useEffect, useContext } from 'react'
import { submitPublication } from '../../utils/submitData'
import { AuthContext } from '@/app/context/auth' 
import Image from 'next/image'
import styles from './createPublication.module.css'
import { montserrat } from '@/app/ui/fonts'


interface Props {
  userImg: string
  onUpdateFeed: () => any
}

/**
 * Component for creating a new publication.
 *
 * @param {string} userImg - URL of the user's profile image.
 * @param {function} onUpdateFeed - Function to call after updating the feed with a new publication.
 */
const CreatePublication: NextPage<Props> = ({ userImg, onUpdateFeed }) => {
  const { token, id } = useContext(AuthContext)
  const [publication, setPublication] = useState('')
  const [isValid, setIsValid] = useState(false)

  /**
   * Function to validate the publication input.
   * 
   * @param {string} input - The publication input value.
   */
  const validateInput = (input: string) => {
    if (input.trim() !== '') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  useEffect(() => {
    validateInput(publication)
  }, [publication])

  /**
   * Function to handle form submission.
   * 
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    submitPublication(publication, id, token)
    onUpdateFeed()
    setPublication('')
  }

  return (
    <article className={styles.createContainer}>
      <Image src={userImg} className={styles.userImg} alt="user_image" width={75} height={75} />
      <form onSubmit={handleSubmit}>
        <div className={styles.boxToWrite}>
          <textarea 
            rows={2}
            className={styles.chatbox}
            value={publication}
            placeholder="Create a publication"
            onChange={e => {
              setPublication(e.target.value)
              validateInput(e.target.value)
            }}
            required
          />
        </div>
        <button className={`${styles.submitButton} ${montserrat.className}`} type="submit" disabled={!isValid}>
          Publish
        </button>
      </form>
    </article>
  )
}

export default CreatePublication
