'use client'
import { AuthContext } from "@/app/context/auth";
import { submitFriendRequest } from "@/utils/submitData";
import { useContext } from "react";

export default function OtherUsersProfile({ params }: { params: { profileId: string; };}) {
    const { profileId } = params
    const { id, token, setId  } = useContext(AuthContext)

    const sendFriendRequest = async () => {
      
        const response = await submitFriendRequest(id, profileId, token )
        const data = await response.json()
        console.log(data)
    }
    

  return (
    <div>
      <h1>{profileId} |||||||| {id}</h1>
      <button onClick={sendFriendRequest}>Añadir a amigos</button>
    </div>
  )
}