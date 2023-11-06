import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from 'axios';
import UserModel from "../../../Models/UserModel";
import globals from '../../../Services/Globals';
import "./Register.css";
import notify from "../../../Services/Notify";
import store from "../../../Redux/Store";
import { userLoggedIn } from "../../../Redux/Reducers/user.slice";
import { Link ,useNavigate} from "react-router-dom";



const resolver: Resolver<UserModel> = async (values) => {
    return {
        values: values.firstName && values.lastName && values.phone && values.email && values.password
            ? values : {},
        errors: !values.firstName && !values.lastName && !values.email && !values.phone && !values.password ? {}
            : !values.firstName || values.firstName.length < 2 ? {
                firstName: {
                    type: 'required',
                    message: 'שם קצר מידי .',
                }
            }
                : !values.lastName || values.lastName.length < 2 ? {
                    lastName: {
                        type: 'required',
                        message: 'שם קצר מידי .',
                    }
                } : !values.password || values.password.length < 6 ? {
                    password: {
                        type: 'required',
                        message: 'מינימום 6 תווים   .',
                    }
                } : !values.phone || values.phone.length < 8 || values.phone[0]!=="0" ? {
                    phone: {
                        type: 'required',
                        message: 'טלפון לא תקין  .',
                    }
                } : !values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ? {
                    email: {
                        type: 'required',
                        message: ' אימייל לא תקין .',
                    }
                } : {},
    };
}

function Register(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<UserModel>({ resolver, mode: 'onBlur' });
    const submit: SubmitHandler<UserModel> = async data => {
        try {
            const userToRegister = new UserModel(data);
            const res = await axios.post<UserModel>(globals.registerUrl, UserModel.convertToFormData(userToRegister));
            store.dispatch(userLoggedIn(res.data));
            notify.success('!נרשמת בהצלחה');
            navigate("/");
        }
        catch (err: any) {
            if (err.response?.data) {
                if (err.response.data === "Email allready exits.") setError("email", { type: "custom", message: err.response.data },{shouldFocus:true});
            }
            notify.error(err);
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth:"600px",
        bgcolor: 'rgba(255,255,255,.7)',
        boxShadow: 24,
        p: 3,
        borderRadius: '7px'
    };
    return (
        <div className="Register">
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ margin: "3px",direction:"rtl" }}>
                        הירשם לאתר:
                    </Typography>
                    <form className="modalForm" id="login-form" noValidate onSubmit={handleSubmit(submit)}>
                        <TextField dir="rtl" required margin="normal" {...register("firstName")} error={errors.firstName ? true : false} helperText={errors.firstName?.message} label="שם פרטי" variant="outlined" />
                        <TextField dir="rtl" required margin="normal" {...register("lastName")} error={errors.lastName ? true : false} helperText={errors.lastName?.message} label="שם משפחה" variant="outlined" />
                        <TextField required margin="normal" type="tel" dir="ltr" {...register("phone")} error={errors.phone ? true : false} helperText={errors.phone?.message} label="טלפון" variant="outlined" />
                        <TextField required margin="normal" type="email" dir="ltr" {...register("email")} error={errors.email ? true : false} helperText={errors.email?.message} label="אימייל" variant="outlined" />
                        <TextField required margin="normal" type="password" dir="ltr" {...register("password")} error={errors.password ? true : false} helperText={errors.password?.message} label="סיסמא" variant="outlined" />
                        <Button sx={{margin:"1rem"}} variant="contained" color="success" type="submit">שלח</Button>
                    </form>
                    <span className="registerSpan">יש לך חשבון ? <Link to="/auth/login">התחבר </Link></span>
                </Box>
            </Modal>
        </div>
    );

}

export default Register;
