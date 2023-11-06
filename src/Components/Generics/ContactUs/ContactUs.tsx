import "./ContactUs.css";
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import notify from "../../../Services/Notify";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputLabel } from "@mui/material";


interface contactForm {
    name: string,
    phone: string,
    message: string
}

const resolver: Resolver<contactForm> = async (values) => {
    return {
        values: values.name && values.phone ? values : {},
        errors: !values.name && !values.phone
            ? {
                name: {
                    type: 'required',
                    message: 'אנא מלא את שמך.',
                },
                phone: {
                    type: 'required',
                    message: 'אנא מלא מספר טלפון.',
                },
            }
            : !values.name ? {
                name: {
                    type: 'required',
                    message: 'אנא מלא את שמך.',
                }
            } : !values.phone ? {
                phone: {
                    type: 'required',
                    message: 'אנא מלא מספר טלפון.',
                }
            } : {},
    };
}

function ContactUs(): JSX.Element {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<contactForm>({ resolver });
    const submit: SubmitHandler<contactForm> = data => {
        try {
            const obj = { ...data };
            emailjs.send('service_t61zdur', 'template_wqtke8g', obj, 'GdC_mO1pCeDSGqzJS')
                .then((res: EmailJSResponseStatus) => {
                }, (error: any) => {
                    notify.error(error);
                });
            reset();
            notify.success("!הפנייה נשלחה בהצלחה");
        }
        catch (err: any) {
            notify.error(err.message);
        }
    }
    return (
        <div className='ContactUs' dir="rtl">
            <h1>השאירו פרטים ונחזור אליכם בהקדם</h1>
            <form id='contact-form' noValidate onSubmit={handleSubmit(submit)}>
                <FormControl className="form-control" error={errors.name ? true : false} margin="dense">
                    <InputLabel htmlFor="my-input">שם*</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" {...register("name")} />
                    <FormHelperText id="my-helper-text" className="errorSpan">{errors.name?.message}</FormHelperText>
                </FormControl>
                <FormControl error={errors.phone ? true : false} margin="dense">
                    <InputLabel htmlFor="my2-input">טלפון*</InputLabel>
                    <Input id="my2-input" aria-describedby="my-helper-text2" {...register("phone")} />
                    <FormHelperText id="my-helper-text2" className="errorSpan">{errors.phone?.message}</FormHelperText>
                </FormControl>
                <FormControl margin="dense">
                    <InputLabel htmlFor="my3-input">מטרת הפנייה</InputLabel>
                    <Input id="my3-input" {...register("message")} />
                </FormControl>
                <FormControl margin="dense">
                    <FormControlLabel style={{ margin: '5% 0 5% 5%' }} control={<Checkbox defaultChecked />} label="הריני מאשר קבלת מבצעים,הטבות ועדכונים באמצעי המדיה השונים מאת Don Aroma." />
                </FormControl>
                <Button className='submit-btn' variant="contained" type='submit'>
                    שלח
                </Button>
            </form>
        </div>
    );
}

export default ContactUs;
