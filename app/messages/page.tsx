import { useState } from "react";
import { ContactInterface } from "../../types/profile/contact.interface";

export default function Messages () {
    const [userConnected, setUserConnected] = useState<ContactInterface | null>(null);

    const getUsersConnectedToUser = async () => {
        
    }
    return (
        <div>
            <h1>Messages</h1>
        </div>
    );
}