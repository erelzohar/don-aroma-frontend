import { Link } from "react-router-dom";
import "./HorizonalProduct.css";
import logo from "../../../Assets/Images/Brownie.webp";
import { Button } from "@mui/material";
import { useRef } from "react";
import ProductModel from "../../../Models/ProductModel";
import { Zoom } from "react-awesome-reveal";
import globals from "../../../Services/Globals";


function HorizonalProduct(product: ProductModel): JSX.Element {

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
        <Zoom triggerOnce>
            <div className="HorizonalProduct" onMouseEnter={flip} onMouseLeave={unflip}>
                <Link to={"/specs/" + product._id} className="product-name-link">
                    <img width={"100%"} loading="lazy" className="product-img" src={product.imageName === "" ? logo : globals.productsUrl + "/img/" + product.imageName} alt="img" />
                    <p className="product-desc">
                        {product.name}
                    </p>
                </Link>
                <div className="product-div-button" ref={buttonDivRef}>
                    <Link to="/"><Button sx={{ fontSize: "medium", backgroundColor: "#b28d1c" }} ref={buttonRef} color="secondary" variant="contained">{initialPrice}&#8362;</Button></Link>
                </div>
            </div>
        </Zoom>
    );
}

export default HorizonalProduct;
