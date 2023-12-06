import { Link } from "react-router-dom";
import "./HorizonalProduct.css";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import { Zoom } from "react-awesome-reveal";
import globals from "../../../Services/Globals";
import LazyImage from "../../Generics/LazyImage/LazyImage";
import CartItemModel from "../../../Models/CartItemModel";
import QuickAddToCart from "../../Generics/QuickAddToCart/QuickAddToCart";


function HorizonalProduct(product: ProductModel): JSX.Element {
    const [open, setOpen] = useState(false);
    const initialPrice = product.price;
    const buttonRef = useRef<HTMLButtonElement>();
    const buttonDivRef = useRef<HTMLDivElement>();

    const flip = () => {
        if (buttonDivRef.current) buttonDivRef.current.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            if (!buttonDivRef.current) return;
            buttonRef.current.style.transform = "rotateY(180deg)";
            buttonRef.current.style.backgroundColor = "#006400";
            buttonRef.current.textContent = "הוסף לעגלה";
            buttonRef.current.onclick = () => { setOpen(true) };
        }, 150);
    }

    const unflip = () => {
        if (buttonDivRef.current) buttonDivRef.current.style.transform = "rotateY(0deg)";
        setTimeout(() => {
            if (!buttonDivRef.current) return;
            buttonRef.current.style.transform = "rotateY(0deg)";
            buttonRef.current.style.backgroundColor = "#b28d1c";
            buttonRef.current.innerHTML = initialPrice + "&#8362;";
            buttonRef.current.onclick = null;
        }, 150);
    }

    return (
        <Zoom triggerOnce>
            <div className="HorizonalProduct"
                onMouseEnter={flip} onMouseLeave={unflip}
            >
                <QuickAddToCart product={product} setState={setOpen} state={open} />
                <Link to={"/specs/" + product._id} className="product-name-link">
                    <div className="lazyimgDiv"><LazyImage imageSrc={globals.productsUrl + "/img/" + product.images[0]} imageAlt={product.name} /></div>
                    <p className="product-desc">
                        {product.name}
                    </p>
                </Link>
                <div className="product-div-button" ref={buttonDivRef}>
                    <Button sx={{ fontSize: "medium", backgroundColor: "#b28d1c" }} ref={buttonRef} color="secondary" variant="contained">{initialPrice}&#8362;</Button>
                </div>
            </div>
        </Zoom>
    );
}

export default HorizonalProduct;
