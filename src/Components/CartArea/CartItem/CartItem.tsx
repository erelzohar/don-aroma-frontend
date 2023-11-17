import { Zoom } from "react-awesome-reveal";
import "./CartItem.css";
import { Link } from "react-router-dom";
import globals from "../../../Services/Globals";
import { Button } from "@mui/material";
import CartItemModel from "../../../Models/CartItemModel";
import UseNumberInputCompact from "../../Generics/NumberInput/NumberInput";
import { useEffect, useState } from "react";

interface Props {
    item:CartItemModel
}

function CartItem(props:Props): JSX.Element {
    
    const [quantity,setQuantity] = useState(props.item.quantity);
    useEffect(()=>{

    },[quantity])
    return (
			<Zoom triggerOnce>
            <div className="CartItem">
                <Link to={"/specs/" + props?.item.product._id} className="item-name-link">
                    <img width={"100%"} loading="lazy" className="item-img" src={globals.productsUrl + "img/" + props?.item.product.images[0]} alt="img" />
                    <p className="item-desc">
                        {props?.item.product.name}
                    </p>
                    <span>
                        <UseNumberInputCompact setState={setQuantity} startVal={quantity}/>
                    </span>
                </Link>
                <div className="delete-item-button" >
                    <Button color="error">X</Button>
                </div>
            </div>
        </Zoom>
    );
}

export default CartItem;
