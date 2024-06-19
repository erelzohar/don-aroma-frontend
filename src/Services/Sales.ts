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

    public calcSales() {
        const cartItems = store.getState().cartState.items;
        let discount = 0;
        const salesSum: string[] = [];
        cartItems.forEach(c => {
            c.product.sales.forEach(s => {
                if (s.type === 'plus') {
                    const buyQuantity = +s.saleData.split('+')[0];
                    const cartItemQuantity = c.quantity;
                    if (cartItemQuantity >= buyQuantity) {
                        salesSum.push(c.product.name + " - " + s.name);
                    }
                }
                else if (s.type === 'percent') {
                    const percent = +s.saleData.split('%')[0];
                    const itemDiscount = Math.floor((c.product.price * c.quantity / 100) * percent);
                    discount += itemDiscount;
                    salesSum.push(c.product.name + " - " + s.name);

                }
                else if (s.type === 'quantity') {
                    const buyQuantity = +s.saleData.split('in')[0];
                    const salePrice = +s.saleData.split('in')[1];
                    if (c.quantity >= buyQuantity) {
                        const saleQuantity = Math.floor(c.quantity / buyQuantity);
                        const itemOriginalPrice = buyQuantity * c.product.price;
                        const itemDiscount = (itemOriginalPrice - salePrice) * saleQuantity;
                        discount += itemDiscount;
                        salesSum.push(c.product.name + " - " + s.name);
                    }
                }


            })
        })
        return {
            salesSum,
            discount
        }
    }
}

const salesService = new SalesService();

export default salesService;