'use client'
import { AuthContext } from "@/app/context/auth";
import { submitFriendRequest } from "@/utils/submitData";
import { log } from "console";
import { useContext } from "react";

export default function OtherUsersProfile({ params }: { params: { profileId: string; };}) {
    const { profileId } = params
    const { id, token, setId  } = useContext(AuthContext)

    const sendFriendRequest = async () => {
        console.log(profileId);
        
        const response = await submitFriendRequest(id, profileId, token )
        console.log(response)
    }
    

  return (
    <div>
      <h1>{profileId} |||||||| {id}</h1>
      <button onClick={sendFriendRequest}>Añadir a amigos</button>
    </div>
  )
}