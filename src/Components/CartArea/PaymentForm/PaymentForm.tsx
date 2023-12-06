import "./PaymentForm.css";
import paymentImg from "../../../Assets/Images/securedPay.webp";
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import notify from "../../../Services/Notify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/he';
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface PaymentFormI {
    cardNum: number;
    cardCVV: number;
    buyerId: string;
    policyAccepted: boolean;
}

const schema = yup
    .object()
    .shape({
        cardNum: yup.string().min(16, "ערך לא תקין").max(16, "ערך לא תקין").required("שדה זה הינו שדה חובה"),
        cardCVV: yup.string().min(3, "ערך לא תקין").max(3, "ערך לא תקין").required("שדה זה הינו שדה חובה").typeError("ערך לא תקין"),
        buyerId: yup.string().min(7, "ערך לא תקין").max(10, "ערך לא תקין").required("שדה זה הינו שדה חובה"),
        policyAccepted: yup.bool().oneOf([true], 'אנא אשר את התקנון')
    })
function PaymentForm(props: Props): JSX.Element {
    const [monthAndYear, setMonthAndYear] = useState({ month: 0, year: 0 });
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
    const submit: SubmitHandler<PaymentFormI> = async data => {
        try {
            console.log(monthAndYear);

            // console.log(data);
            props.setStep(2)
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <Slide duration={400}>
            <form id="payment-form" noValidate onSubmit={handleSubmit(submit)}>
                <TextField fullWidth required margin="normal" dir="ltr" {...register("buyerId")} error={errors.buyerId ? true : false} helperText={errors.buyerId?.message} label="תעודת זהות " variant="outlined" />
                <TextField fullWidth required margin="normal" dir="ltr" {...register("cardNum")} error={errors.cardNum ? true : false} helperText={errors.cardNum?.message} label="מספר כרטיס" variant="outlined" />
                <div className="gridContainer" dir="ltr">
                    <TextField className="shortInput" required margin="normal" {...register("cardCVV")} error={errors.cardCVV ? true : false} helperText={errors.cardCVV?.message} label="CVV" variant="outlined" />
                    <DatePicker onAccept={(val) => {
                        setMonthAndYear({ month: val.month() + 1, year: val.year() });
                    }} minDate={dayjs(new Date())} maxDate={dayjs(new Date(new Date().setFullYear(new Date().getFullYear() + 10)))} format="MM/YYYY" formatDensity="spacious" label="תוקף" views={['year', 'month']} sx={{ margin: '1rem 1rem 1rem 0' }} />
                </div>
                <FormControl margin="dense" fullWidth required>
                    <div className="policyFlex">
                        <FormControlLabel style={{ margin: '0 0 0 1%' }} control={<Checkbox {...register("policyAccepted")}/>} label="הריני מאשר כי קראתי והסכמתי " />
                        <span style={{color:'#0072e5',textDecoration:'underline'}}><Link to="/policy">לתנאי התקנון.</Link></span>
                    </div>
                </FormControl>
                <img src={paymentImg} alt="secured payment" width={'100%'} />
                <Button disabled={!isValid || monthAndYear.year === 0} sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="primary" type='submit'>מעבר לתשלום </Button>
            </form>
        </Slide>
    );
}

export default PaymentForm;
