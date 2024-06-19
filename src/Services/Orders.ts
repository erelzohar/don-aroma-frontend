import { OrderModel } from "../Models/OrderModel";
import { deleteOrder, setOrders, updateOrder } from "../Redux/Reducers/orders.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class OrdersService {

    public async getOrders(): Promise<OrderModel[]> {
        try {
            if (store.getState().ordersState.orders.length > 0) {
                return store.getState().ordersState.orders
            }
            const response = await jwtAxios.get<OrderModel[]>(globals.ordersUrl);
            store.dispatch(setOrders(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return [];
        }
    }
    public async updateOrder(order: OrderModel): Promise<OrderModel> {
        try {
            const ok = window.confirm("אישור סיום הזמנה");
            if (!ok) return;
            const formData = OrderModel.convertToFormData(order);
            const response = await jwtAxios.post<OrderModel>(globals.ordersUrl, formData);
            store.dispatch(updateOrder(response.data));
            notify.custom('עודכן בהצלחה');
            return response.data;
        }
        catch (err) {
            notify.error(err);
        }
    }
    public async deleteOrder(_id: string) {
        try {
            const ok = window.confirm("למחוק את ההזמנה?");
            if (!ok) return;
            const response = await jwtAxios.delete(globals.ordersUrl + "/" + _id);
            store.dispatch(deleteOrder(_id));
            notify.success("נמחק בהצלחה");
            return response.data;
        }
        catch (err) {
            notify.error(err);
        }
    }
}
const ordersService = new OrdersService();
export default ordersService;