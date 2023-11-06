import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductModel from "../../Models/ProductModel";
import CategoryModel from "../../Models/CategoryModel";

export class ProductsState {
    public products: ProductModel[];
    public categories: CategoryModel[];
    public scentCategories: CategoryModel[];
    public productListDisplay: "grid" | "block";
}


const initialState: ProductsState = {
    products: [],
    categories: [],
    scentCategories: [],
    productListDisplay: "grid"
}

const productsReducer = createSlice({
    name: "productsReducer",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductModel[]>) => {
            state.products = action.payload;
        },
        setProductListDisplay: (state, action: PayloadAction<"grid" | "block">) => {
            state.productListDisplay = action.payload;
        },
        setCategories: (state, action: PayloadAction<CategoryModel[]>) => {
            state.categories = action.payload;
        },
        setScentCategories: (state, action: PayloadAction<CategoryModel[]>) => {
            state.scentCategories = action.payload;
        },
        addProduct: (state, action: PayloadAction<ProductModel>) => {
            state.products.unshift(action.payload);
        },
        updateProduct: (state, action: PayloadAction<ProductModel>) => {
            const newProductsState = [ ...state.products ];
            const index = newProductsState.findIndex(p => p._id === action.payload._id);
            // newProductsState[index].category = state.categories.find(c=>)
            newProductsState[index] = action.payload;
            state.products = newProductsState;
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const index = state.products.findIndex(product => product._id === action.payload);
            if (index < 0) return;
            state.products.splice(index, 1);
        }
    }
});

export const { setProducts, setProductListDisplay, setCategories, setScentCategories,updateProduct, addProduct, deleteProduct } = productsReducer.actions;

export default productsReducer.reducer;