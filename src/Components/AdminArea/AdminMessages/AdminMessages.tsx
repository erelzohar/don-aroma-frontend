import { Button, TextField } from "@mui/material";
import "./AdminMessages.css";

function AdminMessages(): JSX.Element {

    return (
        <div className="AdminMessages">
            <TextField
                fullWidth
                margin="none"
                required 
                id="message-input"
                multiline
                label="הודעת פתיחה"
                variant="outlined" />
            <Button variant="contained">שליחה</Button>
        </div>
    );
}

export default AdminMessages;
