import { Zoom } from "react-awesome-reveal";
import "./CartItem.css";
import { Link } from "react-router-dom";
import globals from "../../../Services/Globals";
import CartItemModel from "../../../Models/CartItemModel";
import { useState } from "react";
import store from "../../../Redux/Store";
import { updateItem, deleteItem } from "../../../Redux/Reducers/cart.slice";
import LazyImage from "../../Generics/LazyImage/LazyImage";
import QuantityInput from "../../Generics/QuantityInput/QuantityInput";
import notify from "../../../Services/Notify";

interface Props {
    item: CartItemModel
}

function CartItem(props: Props): JSX.Element {


    const [quantity, setQuantity] = useState(props.item.quantity);



    const removeFromCart = () => {
        store.dispatch(deleteItem(props.item));
    }

    const numberChangeHandler = (quantity: number) => {
        if (quantity > props.item.product.stock) {
            notify.custom(`נותרו ${props.item.product.stock} יחידות במלאי`);
            return false;
        };
        const updatedItem = { ...props.item };
        updatedItem.quantity = quantity;
        store.dispatch(updateItem(updatedItem));
        setQuantity(quantity);
        return true;
    }

    return (
        <Zoom triggerOnce>
            <div className="CartItem">
                <div className="topFlex">
                    <Link to={"/specs/" + props.item.product._id}>
                        <p className="productsName"> {props.item.product.name}</p>
                    </Link>
                    <span style={{ cursor: 'pointer', color: 'red', textAlign: 'center', padding: '1rem 0 0 0', fontFamily: 'cursive', fontWeight: 'bold' }} onClick={removeFromCart}>x</span>
                </div>
                <div className="inner-flex">
                    <div className="imageDiv">
                        <Link to={"/specs/" + props.item.product._id} className="item-image-link">
                            <LazyImage imageSrc={globals.productsUrl + "/img/" + props.item.product.images[0]} imageAlt="img" />
                        </Link>
                        <div className="price-flex">
                            {props.item.color && props.item.color !== '' && <p className="colorScentP">צבע:
                                <span>{props.item.color}</span>
                            </p>}
                            {props.item.ml && <p className="colorScentP">מ"ל:
                                <span>{props.item.ml}</span>
                            </p>}
                            {props.item.scent && props.item.scent !== '' && <p className="colorScentP">ניחוח:
                                <span>{props.item.scent}</span>
                            </p>}
                            <div className="totalDiv">
                                {props.item.product.mlPrices && <p>{props.item.quantity * (props.item.product.mlPrices[props.item.ml])}&#8362;</p>}
                                {!props.item.product.mlPrices && <p>{props.item.quantity * props.item.product.price}&#8362;</p>}
                            </div>
                        </div>
                    </div>
                    <span className="quantitySpan">
                        <QuantityInput changeHandler={numberChangeHandler} startVal={props.item.quantity} />
                    </span>
                </div>
            </div>
        </Zoom>
    );
}

export default CartItem;
