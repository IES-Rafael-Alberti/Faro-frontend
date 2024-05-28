'use client'

import { NextPage } from 'next'
import React, { useState, useEffect, useContext } from 'react'
import { submitPublication } from '@/utils/submitData'
import { AuthContext } from '@/context/auth'

interface Props {}

const CreatePublication: NextPage<Props> = () => {
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
