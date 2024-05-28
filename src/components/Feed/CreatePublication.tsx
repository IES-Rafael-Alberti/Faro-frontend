'use client'

import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { submitPublication } from '@/utils/submitData'

interface Props {}

const CreatePublication: NextPage<Props> = () => {
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
    submitPublication(publication, '8359628a-1452-4563-866d-cc3f76f0a1e7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2ODg5MjA1LCJleHAiOjE3MTY4OTI4MDV9.oGZAhQMuui7zJwcB-smLh72xWklOl28aw_VbOko0ibk')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={publication}
          onChange={e => {
            setPublication(e.target.value)
            validateInput(e.target.value)
          }}
          placeholder="Create a new publication"
          required
        />
        <button type="submit" disabled={!isValid}>Submit</button>
      </form>
    </div>
  )
}

export default CreatePublication
