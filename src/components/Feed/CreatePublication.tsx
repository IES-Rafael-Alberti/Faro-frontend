'use client'

import { NextPage } from 'next'
import React, { useState } from 'react'
import { submitPublication } from '@/utils/submitData'

interface Props {}

const CreatePublication: NextPage<Props> = () => {
  const [publication, setPublication] = useState('MARICONES TODOS')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    submitPublication(publication, '8359628a-1452-4563-866d-cc3f76f0a1e7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2ODA0NzgzLCJleHAiOjE3MTY4MDgzODN9.-53qckkezCvsx8hRO6EgnfL1KBIjm2PvrL6XbhD6DCE')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={publication}
          onChange={e => setPublication(e.target.value)}
          placeholder="Create a new publication"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreatePublication
