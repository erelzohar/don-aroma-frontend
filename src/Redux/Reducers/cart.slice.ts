import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductModel from "../../Models/ProductModel";

export class CartState {
    public products: ProductModel[];
}


const initialState: CartState = {
    products: []
}

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductModel>) => {
            state.products.unshift(action.payload);
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const index = state.products.findIndex(product => product._id === action.payload);
            if (index < 0) return;
            state.products.splice(index, 1);
        }
    }
});

export const { addProduct, deleteProduct } = cartReducer.actions;

export default cartReducer.reducer;