import CartAction from "../Models/CartActionModel";
import CartItemModel from "../Models/CartItemModel";
import { CartState, addItem } from "../Redux/Reducers/cart.slice";
import { updateProduct } from "../Redux/Reducers/products.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class CartService {

    public async addToCart(cartItem: CartItemModel) {
        try {
            // const cartAction = new CartAction();
            // cartAction.productId = cartItem.product._id;
            // cartAction.updatedStock =cartItem.product.stock - cartItem.quantity ;
            // const formData = CartAction.convertToFormData(cartAction);
            // const res = await jwtAxios.post(globals.productsUrl + "/cart-action", formData);
            // if (res) {
            //     const updatedProduct = {...cartItem.product};
            //     updatedProduct.stock = cartAction.updatedStock;
            //     store.dispatch(updateProduct(updatedProduct));
            store.dispatch(addItem(cartItem));
            notify.success('מוצר חדש נכנס לעגלה');
            // }
        }
        catch (err) {
            notify.error(err);
        }
    }


    public checkCache(): CartState {
        if (!localStorage.getItem("donaromacart")) return { items: [], timeToRemove: 0 };
        let cart = JSON.parse(localStorage.getItem("donaromacart"));
        if (cart.timeToRemove < new Date().getTime()) {
            localStorage.removeItem("donaromacart");
            localStorage.setItem("donaromacart", JSON.stringify({ items: [], timeToRemove: 0 }));
            return { items: [], timeToRemove: 0 };
        }
        else return cart;
    }
    public getTotalPrice(deliveryType: string = null): number {
        let totalPrice = 0;
        store.getState().cartState.items.forEach((i) => {
            if (i.ml) totalPrice = totalPrice + (i.quantity * i.product.mlPrices[i.ml]);
            else totalPrice = totalPrice + (i.quantity * i.product.price)
        });
        if (deliveryType && deliveryType !== '') {
            if (deliveryType === "express") totalPrice += 50;
            else if (deliveryType === "regular" && totalPrice < 200) totalPrice += 35;
        }
        return totalPrice
    }

    public async getPaymentFormURL(fullName: string, phone: string, email: string, sum: number, pageCode: string, orderJSON: string) {
        try {
            const formRequest = new FormData();
            formRequest.append("sum", sum.toString());
            formRequest.append("successUrl", "http://donaroma-il.com/auth/register");
            formRequest.append("description", 'Don aroma');
            formRequest.append("cancelUrl", "http://donaroma-il.com/auth/login");
            formRequest.append("pageCode", pageCode);
            formRequest.append("orderJSON", orderJSON);
            formRequest.append("fullName", fullName);
            formRequest.append("phone", phone);
            formRequest.append("email", email);
            formRequest.append("maxPaymentNum", '5');
            const res = await jwtAxios.post(globals.paymentUrl + "/get-payment-form", formRequest);
            return res.data;
        }
        catch (err) {
            notify.error(err);
        }
    }


}

const cartService = new CartService();

export default cartService;