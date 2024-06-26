import CartItemModel from "../Models/CartItemModel";
import ProductModel from "../Models/ProductModel";
import { CartState, addItem, deleteItem, updateItem } from "../Redux/Reducers/cart.slice";
import { setProducts } from "../Redux/Reducers/products.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class CartService {

    public async addToCart(cartItem: CartItemModel) {
        try {            
            const item = store.getState().cartState.items.find(i => i.product._id === cartItem.product._id && i.color === cartItem.color && i.scent === cartItem.scent && i.ml === cartItem.ml);
            if (item) {
                if (item.product.stock < (item.quantity + cartItem.quantity)) return notify.custom('כמות לא זמינה');
            }
            store.dispatch(addItem(cartItem));
            notify.success('מוצר חדש נכנס לעגלה');
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
    public async refreshStock() {
        const response = await jwtAxios.get<ProductModel[]>(globals.productsUrl);
        const products = response.data;
        store.dispatch(setProducts(products));
        let isChanged = false;
        store.getState().cartState.items.forEach(i => {
            const updatedProduct = products.find(p => p._id === i.product._id);
            if (updatedProduct.stock < i.quantity) {
                isChanged = true;
                if (updatedProduct.stock === 0) store.dispatch(deleteItem(i));
                else {
                    const newItem = { ...i };
                    newItem.product = updatedProduct;
                    newItem.quantity = updatedProduct.stock;
                    store.dispatch(updateItem(newItem));
                }
            }
        });
        if (isChanged) {
            notify.custom('חלק מהמוצרים שרצית אזלו - אנא שים לב לשינויים');
            return false;
        }

        return true;
    }
    public async getPaymentFormURL(fullName: string, phone: string, email: string, pageCode: string, orderJSON: string) {
        try {
            const formRequest = new FormData();
            formRequest.append("successUrl", "https://donaroma-il.com/cart");
            formRequest.append("description", 'Don aroma');
            formRequest.append("cancelUrl", "https://donaroma-il.com/cart");
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