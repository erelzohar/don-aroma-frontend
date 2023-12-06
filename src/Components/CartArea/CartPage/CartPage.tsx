import { Button, Box, LinearProgress } from "@mui/material";
import store, { useAppSelector } from "../../../Redux/Store";
import CartItem from "../CartItem/CartItem";
import "./CartPage.css";
import { Delete } from "@mui/icons-material";
import { resetCartState } from "../../../Redux/Reducers/cart.slice";
import { Link, useParams } from "react-router-dom";
import Timer from "../Timer/Timer";
import { FcShipped, FcPlus } from "react-icons/fc";
import { Zoom } from "react-awesome-reveal";
import CartForms from "../CartForms/CartForms";
import salesService from "../../../Services/Sales";
import { useEffect } from "react";
import { FcApproval } from "react-icons/fc";
import cartService from "../../../Services/Cart";
import { SiRenovatebot } from "react-icons/si";

function CartPage(): JSX.Element {
    const params = useParams();
    const orderNumber = params.orderNumber;

    const cartState = useAppSelector(state => state.cartState);

    // salesService.calcSales(cartState.items)
    // .then(res=>{console.log(res);})
    // useEffect(()=>{

    // },[])

    const resetCart = () => {
        if (!window.confirm("לרוקן את העגלה ?")) return;
        store.dispatch(resetCartState());
        window.scrollTo({ top: 0 });
    }
    return (
        <div className="CartPage">

            <div className="pageContainer">
                {cartState.items.length > 0 && <>
                    <div className="linearProgDiv">
                        <p style={{ alignSelf: 'flex-end', padding: '1.5rem 0 1.5rem 0', margin: '0' }}>200&#8362;</p>
                        <Box sx={{ width: '100%', padding: '2rem', display: "flex", flexDirection: "column" }}>
                            <p>{cartService.getTotalPrice() >= 200 ? "מגיע לך משלוח חינם !" : <span>חסר לך עוד  <span>{(200 - cartService.getTotalPrice()).toString()}&#8362;</span> למשלוח חינם.</span>}</p>
                            <LinearProgress variant="determinate" value={cartService.getTotalPrice() > 200 ? 100 : (cartService.getTotalPrice() / 2)} />
                        </Box>
                        <div className="linearIconDiv">
                            {cartService.getTotalPrice() >= 200 ? <Zoom duration={200}> <FcShipped size="60" /></Zoom> : <Zoom duration={200}><FcPlus size="60" /></Zoom>}
                        </div>
                    </div>
                    <span className="topSpan">
                        <Button
                            size="large"
                            color="error"
                            endIcon={<Delete />}
                            onClick={resetCart}
                        > רוקן&emsp;</Button>
                        <Timer />
                    </span>
                </>
                }
                <div className="itemsList">
                    {cartState.items.map((item, i) => <CartItem key={i} item={item} />)}
                    {cartState.items.length === 0 && <>
                        {!orderNumber && <h2 style={{ textAlign: 'center' }}>העגלה שלך ריקה.</h2>}
                        {orderNumber && <div className="thankYouDiv">
                            <h1>תודה רבה על קנייתך !</h1>
                            <FcApproval size="100" />
                            <h3>מס' הזמנה : {orderNumber}</h3>
                            <h3>נשלחה קבלה במייל.</h3>
                        </div>}
                        <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}><Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} variant="contained" color="success">להמשך קנייה</Button></Link>
                    </>}
                </div>
            </div>
            {store.getState().authState.user?.isAdmin && cartState.items.length > 0 && <div className="buySum">
                <CartForms />
            </div>}
            {!store.getState().authState.user?.isAdmin && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>העגלה סגורה לשיפוצים</h1>
                <SiRenovatebot size='100' color="#b28d1c" />
            </div>}
        </div>
    );
}

export default CartPage;
