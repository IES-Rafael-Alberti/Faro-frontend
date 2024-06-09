export interface MessageInterface {
    message_id: string,
    message:string
    receiver_id:string 
    sender_id: string 
    date: Date | string,
}