import { Box, IconButton } from "@mui/material";
import { BsCart3 } from 'react-icons/bs';
import { Link } from "react-router-dom";
import "./CartBtn.css";
import store, { useAppSelector } from "../../../Redux/Store";

function CartBtn(): JSX.Element {
    const cartState = useAppSelector(state => state.cartState);
    return (
        <>
            {cartState.items.length > 0 && <Box className="CartBtn"
                component={'div'}
                sx={{
                    transform: 'translateZ(1ch)',
                    flexGrow: 1,
                    position: 'fixed',
                    top: '30vh',
                    left: '1vw',
                    display: 'block',
                    zIndex: 100,
                    userSelect: "none"
                }}>
                <Link to="/cart" draggable={false}>
                    <IconButton size="large" children={<><span className="cart-items-number">{store.getState().cartState.items.length}</span><BsCart3 color="black" /></>} sx={{
                        bgcolor: "white",
                        boxShadow: "0 0 5px 2px rgba(0,0,0,0.6)",
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: '0'
                    }} />
                </Link>
            </Box>}
        </>
    );
}

export default CartBtn;
