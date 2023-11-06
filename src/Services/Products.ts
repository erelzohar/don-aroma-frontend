import CategoryModel from "../Models/CategoryModel";
import ProductModel from "../Models/ProductModel";
import { addProduct, deleteProduct, setCategories, setProducts, setScentCategories, updateProduct } from "../Redux/Reducers/products.slice";
import store from "../Redux/Store";
import globals from "./Globals";
import jwtAxios from "./JwtAxios";
import notify from "./Notify";

class ProductsService {

    public async getProducts(): Promise<ProductModel[]> {
        try {
            if (store.getState().productsState.products.length>0) {
                return store.getState().productsState.products;
            }
            const response = await jwtAxios.get<ProductModel[]>(globals.productsUrl);
            store.dispatch(setProducts(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return [];
        }
    }
    public async findProduct(_id:string): Promise<ProductModel> {
        try {
            if(!_id) return null;
            if (store.getState().productsState.products.length>0) {
                return store.getState().productsState.products.find(p=>p._id===_id);
            }
            const response = await jwtAxios.get<ProductModel[]>(globals.productsUrl);
            store.dispatch(setProducts(response.data));
            return response.data.find(p=>p._id===_id);
        }
        catch (err) {
            notify.error(err);
            return null;
        }
    }
    
    public async getCategories(): Promise<CategoryModel[]> {
        try {
            if (store.getState().productsState.categories.length>0) {
                return store.getState().productsState.categories;
            }
            const response = await jwtAxios.get<CategoryModel[]>(globals.productsUrl + "/categories");
            store.dispatch(setCategories(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return [];
        }
    }
    public async deleteProduct(_id:string){
        try {
            const ok = window.confirm("למחוק את המוצר?");
            if (!ok) return;
            const response = await jwtAxios.delete(globals.productsUrl + "/" + _id);
            store.dispatch(deleteProduct(_id));
            notify.success("נמחק בהצלחה");
            return response.data;
        }
        catch (err) {
            notify.error(err);
        }
    }
    public async upsertProduct(productToUpsert:ProductModel,image:File){
        try {
            const formData = ProductModel.convertToFormData(productToUpsert, image);
            const res = await jwtAxios.post<ProductModel>(globals.productsUrl, formData);

            if (productToUpsert._id) {
                store.dispatch(updateProduct(res.data));
                return notify.success('!המוצר עודכן בהצלחה');
            }
            store.dispatch(addProduct(res.data));
            notify.success('!המוצר נוסף בהצלחה');
        }
        catch (err) {
            notify.error(err);
        }
    }
    public async getScentCategories(): Promise<CategoryModel[]> {
        try {
            if (store.getState().productsState.scentCategories.length>0) {
                return store.getState().productsState.scentCategories;
            }
            const response = await jwtAxios.get<CategoryModel[]>(globals.productsUrl + "/scent-categories");
            store.dispatch(setScentCategories(response.data));
            return response.data;
        }
        catch (err) {
            notify.error(err);
            return [];
        }
    }

    public shuffle(array:ProductModel[]) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

}
const productsService = new ProductsService();
export default productsService;