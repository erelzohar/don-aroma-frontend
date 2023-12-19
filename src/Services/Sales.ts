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
    
    public async calcSales(cartItems: CartItemModel[]) {
        const sales =  await salesService.getSales();
        let discount = 0;
        let salesString = '';
        const salesSum = [];
        cartItems.forEach(c=>{
            c.product.sales.forEach(s=>{
                let index = sales.findIndex(ss=>s._id===ss._id);
                if (sales[index]) {
                    const current = sales[index];
                    if (current.type==='plus'){
                        const buyQunatity = +current.saleData.split('+')[0];
                        const giftQunatity = +current.saleData.split('+')[1];
                        const cartItemQuantity = c.quantity;
                        if (cartItemQuantity>=buyQunatity){
                            salesString = salesString + (salesString!=='' ? ',' : '') + c.product.name + " - " + current.name;
                        }
                    }
                }
            })
        })        
    }
}

const salesService = new SalesService();

export default salesService;