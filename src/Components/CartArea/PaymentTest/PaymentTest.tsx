import { useEffect, useRef, useState } from "react";
import { DeliveryFormI } from "../DeliveryForm/DeliveryForm";
import "./PaymentTest.css";
import cartService from "../../../Services/Cart";
import { Dialog, DialogContent } from "@mui/material";
import notify from "../../../Services/Notify";
import store from "../../../Redux/Store";
import { resetCartState } from "../../../Redux/Reducers/cart.slice";
import { useNavigate } from "react-router-dom";
import { OrderModel } from "../../../Models/OrderModel";



interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    data: DeliveryFormI;
    delivery: string;
    totalPrice: number;
    pageCode: string;
}

function PaymentTest(props: Props): JSX.Element {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const date = new Date();
    const orderNumber = date.getTime().toString() + props.totalPrice;
    useEffect(() => {
        window.addEventListener('message', function (result) {
            if (result.origin === 'https://meshulam.co.il' || result.origin === 'https://sandbox.meshulam.co.il') {

                switch (result.data.action) {
                    case 'close': {
                        setOpen(false);
                        props.setStep(0);
                        notify.custom("לא התקבל חיוב");
                        break;
                    }
                    case 'payment': {
                        if (result.data.status === 1) {
                            store.dispatch(resetCartState());
                            setOpen(false);
                            props.setStep(2);
                            navigate(`/cart/${orderNumber}`);
                        }
                        break;
                    }
                    case 'failed_to_load_page': {
                        notify.error('טעות בשרת נסה שוב בעוד כמה דקות');
                        props.setStep(0);
                        break;
                    }
                }
            }
        });
        const order = new OrderModel(
            orderNumber,
            props.delivery,
            props.data.city,
            props.data.street,
            props.data.streetNum.toString(),
            props.data.firstName + " " + props.data.lastName,
            props.data.phone,
            props.data.email
        );
        order.items = store.getState().cartState.items;        
        
        cartService.getPaymentFormURL(
            props.data.firstName + " " + props.data.lastName,
            props.data.phone,
            props.data.email,
            props.totalPrice,
            props.pageCode,
            JSON.stringify(order)
        )
            .then(res => {
                console.log(res);
                
                if (iframeRef.current) iframeRef.current.src = res;
            })
    }, [])



    return (
        <div className="PaymentTest">
            <Dialog
                sx={{ padding: 0, margin: 0 }}
                fullScreen={window.innerWidth < 400 ? true : false}
                open={open}
                dir="rtl"
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent sx={{ display: 'flex', overflow: 'hidden', height: '100%', padding: 0 }}>
                    <iframe title="pay" width={window.innerWidth > 400 ? '400' : '100%'} height="600" id="paymentIframe" ref={iframeRef}></iframe>
                </DialogContent>
            </Dialog>

            <div className="processPay">
                <h3>מעבד תשלום...</h3>
            </div>
        </div>
    );
}

export default PaymentTest;
