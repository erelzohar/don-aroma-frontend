import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import Credentials from "../../../Models/Credentials";
import "./Login.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/Notify";
import axios from "axios";
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { userLoggedIn } from "../../../Redux/Reducers/user.slice";
import { Link, useNavigate } from "react-router-dom";
import usersService from "../../../Services/Users";


const resolver: Resolver<Credentials> = async (values) => {
    return {
        values: values.email && values.password ? values : {},
        errors: !values.email && !values.password ? {
            email: {
                type: 'required',
                message: 'אנא מלא אימייל  .',
            },
            password: {
                type: 'required',
                message: 'אנא מלא סיסמא .',
            }
        }
            : !values.email ? {
                name: {
                    type: 'required',
                    message: 'אנא מלא אימייל  .',
                }
            } : !values.password ? {
                message: {
                    type: 'required',
                    message: 'אנא מלא סיסמא .',
                }
            } : {},
    };

}
function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<Credentials>({ resolver, mode: 'onBlur' });
    const submit: SubmitHandler<Credentials> = async data => {
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const res = await axios.post<UserModel>(globals.loginUrl, formData);
            store.dispatch(userLoggedIn(res.data));
            usersService.SaveUserLocal(res.data);
            notify.success('!התחברת בהצלחה');
            navigate("/");
            
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth:"600px",
        height: "minmax(50%,auto)",
        bgcolor: '#fff',
        boxShadow: 24,
        p: 4,
        borderRadius: '7px',
    }
    return (
        <div className="Login">
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ margin: "3px", direction: "rtl" }}>
                        התחברות
                    </Typography>

                    <form className="modalForm" id="login-form" noValidate onSubmit={handleSubmit(submit)}>
                        <TextField dir="ltr" margin="normal" required type="email" {...register("email")} id="email-input" error={errors.email ? true : false} helperText={errors.email?.message} label="אימייל" variant="outlined" />
                        <TextField dir="ltr" margin="normal" required type="password" {...register("password")} id="password-input" error={errors.password ? true : false} helperText={errors.password?.message} label="סיסמא" variant="outlined" />
                        <Button type="submit" variant="contained" color="success">התחבר</Button>
                    </form>
                    <span className="registerSpan">אין לך חשבון עדיין? <Link to="/auth/register">הירשם כאן</Link></span>

                </Box>
            </Modal>
        </div>
    );
}

export default Login;
