import { OrderModel } from "../Models/OrderModel";
import { setOrders } from "../Redux/Reducers/orders.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class OrdersService {

    public async getOrders(): Promise<OrderModel[]> {
        try {
            if (store.getState().productsState.products.length > 0) {
                return store.getState().ordersState.orders
            }
            const response = await jwtAxios.get<OrderModel[]>(globals.productsUrl);
            store.dispatch(setOrders(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return [];
        }
    }

}