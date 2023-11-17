import { Link } from "react-router-dom";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { useRef } from "react";
import ProductModel from "../../../Models/ProductModel";
import { Zoom } from "react-awesome-reveal";
import globals from "../../../Services/Globals";
import LazyImage from "../../Generics/LazyImage/LazyImage";


function ProductCard(product: ProductModel): JSX.Element {

    let initialPrice = product.price;
    let buttonRef = useRef<HTMLButtonElement>(null);
    let buttonDivRef = useRef<HTMLDivElement>(null);
    const flip = () => {
        if (buttonDivRef.current) buttonDivRef.current.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            if (!buttonDivRef.current) return;
            buttonRef.current.style.transform = "rotateY(180deg)";
            buttonRef.current.style.backgroundColor = "#006400";
            buttonRef.current.textContent = "הוסף לעגלה";
        }, 150);
    }

    const unflip = () => {
        if (buttonDivRef.current) buttonDivRef.current.style.transform = "rotateY(0deg)";
        setTimeout(() => {
            if (!buttonDivRef.current) return;
            buttonRef.current.style.transform = "rotateY(0deg)";
            buttonRef.current.style.backgroundColor = "#b28d1c";
            buttonRef.current.innerHTML = initialPrice + "&#8362;";
        }, 150);
    }


    return (
        <Zoom triggerOnce fraction={0.6}>
            <div className="ProductCard"
            //  onMouseEnter={flip} onMouseLeave={unflip}
             >
                <Link to={"/specs/" + product._id}>
                    <div className="lazyimgDiv"><LazyImage imageAlt={product.name} imageSrc={globals.productsUrl + "img/" + product.images[0]} /></div>
                    <p className="product-desc">
                        {product.name}
                    </p>
                </Link>
                <div className="product-div-button" ref={buttonDivRef}>
                    {/* <Link to="/" > */}
                    <Button sx={{ fontSize: "medium", backgroundColor: "#b28d1c" }} ref={buttonRef} color="secondary" variant="contained">{initialPrice}&#8362;</Button>
                    {/* </Link> */}
                </div>
            </div>
        </Zoom>
    );
}

export default ProductCard;
