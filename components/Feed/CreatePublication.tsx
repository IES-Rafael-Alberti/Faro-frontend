'use client'

import { NextPage } from 'next'
import React, { useState, useEffect, useContext } from 'react'
import { submitPublication } from '../../utils/submitData'
import { AuthContext } from '../../app/context/auth'
import Image from 'next/image'
import styles from './createPublication.module.css'
import { montserrat } from '@/app/ui/fonts'


interface Props {
  userImg: string
}

const CreatePublication: NextPage<Props> = ({ userImg }) => {
  const { token, id } = useContext(AuthContext)

  const [publication, setPublication] = useState('')
  const [isValid, setIsValid] = useState(false)

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    submitPublication(publication, id, token)
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
            placeholder="Crea una publicación"
            onChange={e => {
              setPublication(e.target.value)
              validateInput(e.target.value)
            }}
            required
            />
        </div>
        <button className={`${styles.submitButton} ${montserrat.className}`} type="submit" disabled={!isValid}>
          Publicar
        </button>
      </form>
    </article>
  )
}

export default CreatePublication
