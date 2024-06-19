import { useState } from "react";
import "./CartForms.css";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import DeliveryForm, { DeliveryFormI } from "../DeliveryForm/DeliveryForm";
import { useAppSelector } from "../../../Redux/Store";
import PaymentTest from "../PaymentTest/PaymentTest";
import cartService from "../../../Services/Cart";
import salesService from "../../../Services/Sales";

function CartForms(): JSX.Element {
    const cartState = useAppSelector(state => state.cartState);
    const [step, setStep] = useState(0);
    const [delivery, setDelivery] = useState('');
    const [pageCode, setPageCode] = useState('');
    const [formData, setFormData] = useState<DeliveryFormI>(null);

    let salesSum = salesService.calcSales();
    console.log(salesSum);
    
    let totalPrice = cartService.getTotalPrice(delivery);

    return (
        <div className="CartForms">
            <Box sx={{ width: '100%', direction: 'ltr' }}>
                <Stepper activeStep={step} alternativeLabel>
                    <Step>
                        <StepLabel>פרטי ההזמנה</StepLabel>
                    </Step>
                    <Step >
                        <StepLabel>תשלום</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>סיכום הזמנה </StepLabel>
                    </Step>
                </Stepper>
            </Box>
            {step === 0 && <DeliveryForm totalSum={totalPrice} delivery={delivery} setDelivery={setDelivery} cartState={cartState} setStep={setStep} setFormData={setFormData} setPageCode={setPageCode} />}
            {step === 1 && <PaymentTest totalPrice={totalPrice} delivery={delivery} data={formData} pageCode={pageCode} setStep={setStep} />}
            {step < 2 && <div className="priceDiv">
                {(delivery === "express" || delivery === "regular") && <p><span className="bigandstorng">משלוח :</span>{delivery === "express" ? <span> 50&#8362;</span> : delivery === "regular" && totalPrice < 200 ? <span>35&#8362;</span> : "חינם!"}</p>}
                <p><span className="bigandstorng">סה"כ :</span>{(totalPrice * 0.83).toFixed(2)}&#8362;</p>
                <p> <span className="bigandstorng">מע"מ : </span> {(totalPrice * 0.17).toFixed(2)}&#8362;</p>
                <p><span className="bigandstorng">סה"כ כולל מע"מ : </span>{totalPrice}&#8362;</p>
            </div>}

        </div>
    );
}

export default CartForms;
