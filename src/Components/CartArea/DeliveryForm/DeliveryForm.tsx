import "./DeliveryForm.css";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import notify from "../../../Services/Notify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../Redux/Store";
import 'dayjs/locale/he';
import { CartState } from "../../../Redux/Reducers/cart.slice";
import bitLogo from "../../../Assets/Images/Bit_logo.svg.png"
import { FaApple } from "react-icons/fa";
import cartService from "../../../Services/Cart";


interface CartFormProps {
    cartState: CartState;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    delivery: string;
    totalSum: number;
    setDelivery: React.Dispatch<React.SetStateAction<string>>;
    setPageCode: React.Dispatch<React.SetStateAction<string>>;
    setFormData: React.Dispatch<React.SetStateAction<DeliveryFormI>>;
}

export interface DeliveryFormI {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    street: string;
    streetNum: number;
    delivery: string;
    aptNum?: number;
}

const schema = yup
    .object()
    .shape({
        firstName: yup.string().max(100, "ערך לא תקין").min(2, "מינימום 2 תווים").required("שדה זה הינו שדה חובה"),
        lastName: yup.string().max(100, "ערך לא תקין").min(2, "מינימום 2 תווים").required("שדה זה הינו שדה חובה"),
        phone: yup.string().max(10).min(10, "טלפון לא תקין ").required("שדה זה הינו שדה חובה"),
        email: yup.string().email("אימייל לא תקין").required("שדה זה הינו שדה חובה"),
        city: yup.string().max(100, "ערך לא תקין").min(2, "מינימום 2 תווים").required("שדה זה הינו שדה חובה"),
        delivery: yup.string().required(),
        street: yup.string().max(100).min(2, "מינימום 2 תווים").required("שדה זה הינו שדה חובה"),
        streetNum: yup.number().min(1, "ערך לא תקין").required("שדה זה הינו שדה חובה").typeError("ערך לא תקין"),
        aptNum: yup.mixed().optional(),
    })

function DeliveryForm(props: CartFormProps): JSX.Element {
    const user = useAppSelector(state => state.authState.user);
    const deliveries = [
        {
            type: "express",
            name: 'משלוח אקספרס 1-3 ימי עסקים - 50 ש"ח'
        },
        {
            type: "regular",
            name: 'משלוח עד 8 ימי עסקים - 35 ש"ח (חינם מעל 200 ש"ח)'
        },
        {
            type: "collect",
            name: 'איסוף עצמי'
        }
    ]



    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

    const submit: SubmitHandler<DeliveryFormI> = async data => {
        try {
            if (!(await cartService.refreshStock())) return;
            props.setFormData(data);
            props.setStep(1);
        }
        catch (err: any) {            
            notify.error(err);
        }
    }
    const handleDeliveryChange = (event: SelectChangeEvent) => {
        props.setDelivery(event.target.value);
    };

    return (
        <form id="delivery-form" noValidate onSubmit={handleSubmit(submit)}>
            {!user && <Link to="/auth/login"><Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="success">לקוח קיים? התחבר</Button></Link>}
            <p style={{ fontWeight: "bold" }}>פרטי המזמין :</p>

            <div className="gridContainer">
                <TextField fullWidth required margin="normal" defaultValue={user?.firstName} {...register("firstName")} error={errors.firstName ? true : false} helperText={errors.firstName?.message} label="שם פרטי" variant="outlined" />
                <TextField fullWidth required margin="normal" defaultValue={user?.lastName}  {...register("lastName")} error={errors.lastName ? true : false} helperText={errors.lastName?.message} label="שם משפחה" variant="outlined" />
                <TextField fullWidth required margin="normal" defaultValue={user?.phone} type="tel" dir="ltr" {...register("phone")} error={errors.phone ? true : false} helperText={errors.phone?.message} label="טלפון" variant="outlined" />
                <TextField fullWidth required margin="normal" type="email" dir="ltr" defaultValue={user?.email}  {...register("email")} error={errors.email ? true : false} helperText={errors.email?.message} label="אימייל" variant="outlined" />
            </div>
            <p style={{ fontWeight: "bold" }}>פרטי משלוח :</p>
            <div className="gridContainer">
                <TextField fullWidth required margin="normal" {...register("city")} error={errors.city ? true : false} helperText={errors.city?.message} label="עיר" variant="outlined" />
                <TextField fullWidth required margin="normal" {...register("street")} error={errors.street ? true : false} helperText={errors.street?.message} label="רחוב" variant="outlined" />
                <TextField fullWidth required className="shortInput" margin="dense" type="number" dir="ltr" {...register("streetNum")} error={errors.streetNum ? true : false} helperText={errors.streetNum?.message} label="מספר רחוב" variant="outlined" />
                <TextField fullWidth className="shortInput" margin="dense" type="number" dir="ltr" {...register("aptNum")} label="דירה" variant="outlined" />
            </div>
            {/*cities url //https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&q=jones */}

            <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-scent-label">סוג משלוח </InputLabel>
                <Select
                    error={errors.delivery ? true : false}
                    {...register("delivery")}
                    margin="dense"
                    value={props.delivery}
                    onChange={handleDeliveryChange}
                    labelId="demo-simple-scent-label"
                    id="demo-simple-scent"
                    label="סוג משלוח "
                >
                    {deliveries.map((d, i) => <MenuItem key={i} value={d.type}>{d.name}</MenuItem>)}
                </Select>
            </FormControl>
            <div className="payBtn">
                <Button fullWidth sx={{ margin: "0.5rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="inherit" type='submit' onClick={() => { isValid && props.setPageCode("applePay") }}>Apple pay &nbsp;<FaApple /> </Button>
                <Button fullWidth sx={{ margin: "0.5rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="info" type='submit' onClick={() => { isValid && props.setPageCode("bit") }}><img width="40px" src={bitLogo} alt="" /></Button>
                <Button fullWidth sx={{ margin: "0.5rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="success" type='submit' onClick={() => { isValid && props.setPageCode("credit") }}>תשלום באשראי</Button>
            </div>
        </form>
    );
}

export default DeliveryForm;
