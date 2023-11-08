import { Button, TextField } from "@mui/material";
import "./AdminMessages.css";
import { useAppSelector } from "../../../Redux/Store";
import { useEffect, useState } from "react";
import messagesService from "../../../Services/Messages";

function AdminMessages(): JSX.Element {
    const messages = useAppSelector(state => state.messagesState.messages);
    const [messageToPost, setMessageToPost] = useState(messages.find(m => m.type === "intro")?.message ? messages.find(m => m.type === "intro").message : '');

    const sendMessage =async (e:React.MouseEvent<HTMLButtonElement>)=>{
        const message = {...messages.find(m => m.type === "intro")};
        message.message = messageToPost;
        await messagesService.updateMessage(message);

    }

    useEffect(() => {
        if (messages.length === 0) messagesService.getMessages();
    }, [])

    return (
        <div className="AdminMessages">
            <TextField
                defaultValue={messages.find(m => m.type === "intro")?.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMessageToPost(e.currentTarget.value) }}
                fullWidth
                focused
                margin="none"
                required
                id="message-input"
                multiline
                label="הודעת פתיחה"
                variant="outlined" />
            <Button variant="contained" onClick={sendMessage}>שליחה</Button>
        </div>
    );
}

export default AdminMessages;
