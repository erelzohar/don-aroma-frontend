
import CartItemModel from "../Models/CartItemModel";
import SaleModel from "../Models/SaleModel";
import { addSale, deleteSale, setSales, updateSale } from "../Redux/Reducers/sales.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class SalesService {
    public async getSales(): Promise<SaleModel[]> {
        try {
            if (store.getState().salesState.sales.length > 0) {
                return store.getState().salesState.sales;
            }
            const response = await jwtAxios.get<SaleModel[]>(globals.productsUrl + "/sales");
            store.dispatch(setSales(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return [];
        }
    }

    public async deleteSale(_id: string) {
        try {
            const ok = window.confirm("למחוק את המבצע?");
            if (!ok) return;
            const response = await jwtAxios.delete(globals.productsUrl + "/sales/" + _id);
            store.dispatch(deleteSale(_id));
            notify.success("נמחק בהצלחה");
            return response.data;
        }
        catch (err) {
            notify.error(err);
        }
    }
    public async upsertSale(saleToUpsert: SaleModel) {
        try {
            const formData = SaleModel.convertToFormData(saleToUpsert);
            const res = await jwtAxios.post<SaleModel>(globals.productsUrl + "/sales", formData);

            if (saleToUpsert._id) {
                store.dispatch(updateSale(res.data));
                notify.success('! עודכן בהצלחה');
                return res.data;
            }
            store.dispatch(addSale(res.data));
            notify.success('! נוסף בהצלחה');
            return res.data;
        }
        catch (err) {
            notify.error(err);
        }
    }

    // public async calcSales(cartItems: CartItemModel[]) {
    //     const sales =  await salesService.getSales();
    //     let sum = 0;
    //     const salesSum = [];
    //     cartItems.forEach(c=>{
    //         c.product.sales.forEach(s=>{
    //             let index = sales.findIndex(ss=>s._id===ss._id);
    //             if (sales[index]) salesSum.push(sales[index])
    //             else sales[index].quantity=1;
    //         })
    //     })
    //     console.log(sales);
        
    // }
}

const salesService = new SalesService();

export default salesService;