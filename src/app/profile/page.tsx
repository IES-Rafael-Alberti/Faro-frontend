import { fetchProfileData } from "../utils/fetchData"
import { useContext } from "react"
import { AuthContext } from "../context/auth"

export default function Profile() {

    const getProfileData = async () => {
        try {
            const response = await fetchProfileData('/api/profile')
            const data = await response.json()
            console.log(data)
        }
    }

}
