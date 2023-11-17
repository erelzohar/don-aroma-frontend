import { CartState } from "../Redux/Reducers/cart.slice";

class CartService {

    public CheckCache(): CartState {
        return localStorage.getItem("donaromacart") ?
            JSON.parse(localStorage.getItem("donaromacart")) :
            { items: [], timeToRemove: 0 };
    }

}

const cartService = new CartService();

export default cartService;