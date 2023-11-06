import { useState, DragEvent } from "react"
import { Box, IconButton } from "@mui/material";
import { BsCart3 } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Draggable from 'react-draggable';
import "./CartBtn.css";
import store from "../../../Redux/Store";

function CartBtn(): JSX.Element {
    const dragHandler = (e: DragEvent) => {
        e.preventDefault()
        if (e.clientX === 0 && e.clientY === 0) return;
        setCartPos({
            x: e.clientX,
            y: e.clientY
        })

    }
    // const dragEndHandler = (e:DragEvent)=>{
    //     e.preventDefault()
    //     setCartPos({...cartPos})
    //     console.log(e.clientX,e.clientY);

    // }
    let listener: EventListener;
    const [cartPos, setCartPos] = useState({ x: 10, y: 200 })
    return (

            <Box className="CartBtn"
                //onDrag={dragHandler}
                //     onDragStart={(e) => {
                //         e.dataTransfer.setDragImage(new Image(), -999999, -9999999);
                //         e.currentTarget.style.cursor = "grab";
                //         document.addEventListener("dragover", (e) => {e.preventDefault()});
                //         console.log(1);

                //     }}
                //     onDragEnd={(e) => {
                //         document.removeEventListener("dragover",(e) => {e.preventDefault()})
                //         e.currentTarget.parentElement.style.cursor = "default"
                //         e.currentTarget.style.cursor = "pointer";
                //         console.log(0);
                //     }}
                //     draggable
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
                    <IconButton size="large" children={<><span className="cart-items-number">{store.getState().cartState.products.length}</span><BsCart3 color="black" /></>} sx={{
                        bgcolor: "white",
                        boxShadow: "0 0 5px 2px rgba(0,0,0,0.6)",
                        display:"flex",
                        flexDirection:"column"
                    }} />
                </Link>
            </Box>
    );
}

export default CartBtn;
