import { useAppSelector } from "../../../Redux/Store";
import CartItem from "../CartItem/CartItem";
import "./CartPage.css";

function CartPage(): JSX.Element {
    const cartState = useAppSelector(state => state.cartState);
    return (
        <div className="CartPage">
            {
                cartState.items.map((item, i) => <CartItem key={i} item={item} />)
            }
        </div>
    );
}

export default CartPage;
