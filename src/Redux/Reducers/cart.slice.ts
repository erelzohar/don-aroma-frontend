import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItemModel from "../../Models/CartItemModel";
import cartService from "../../Services/Cart";

export class CartState {
    public items: CartItemModel[];
    public timeToRemove: number;
}

const initialState: CartState = cartService.checkCache();

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemModel>) => {
            const newState = { ...state };
            let item = action.payload;

            if (newState.items.length > 0) {
                const index = state.items.findIndex(item => item.product._id === action.payload.product._id && item.color === action.payload.color && item.scent === action.payload.scent && item.ml === action.payload.ml);
                if (index >= 0) {
                    item = newState.items.splice(index, 1)[0];
                    item.quantity = item.quantity + action.payload.quantity;
                }
            }
            newState.items.unshift(item);
            if (localStorage.getItem("donaromacart")) {
                ((JSON.parse(localStorage.getItem("donaromacart"))) as CartState).items.forEach(i => {
                    if (newState.items.findIndex(obj => obj.product._id === i.product._id) === -1) newState.items.push(i)
                })
            }
            state = newState;
            state.timeToRemove = new Date().getTime() + 3600000;
            localStorage.setItem('donaromacart', JSON.stringify(state));
        },
        updateItem: (state, action: PayloadAction<CartItemModel>) => {
            const index = state.items.findIndex(item => item.product._id === action.payload.product._id && item.color === action.payload.color && item.scent === action.payload.scent&& item.ml === action.payload.ml);
            state.items[index] = action.payload;
            state.timeToRemove = new Date().getTime() + 3600000;
            localStorage.setItem('donaromacart', JSON.stringify(state));
        },
        resetCartState: (state, action: PayloadAction<null>) => {
            state.items = [];
            state.timeToRemove = 0;
            localStorage.removeItem('donaromacart');
        },
        deleteItem: (state, action: PayloadAction<CartItemModel>) => {
            const index = state.items.findIndex(item => item.product._id === action.payload.product._id && item.color === action.payload.color && item.scent === action.payload.scent);
            if (index < 0) return;
            state.items.splice(index, 1);
            localStorage.setItem('donaromacart', JSON.stringify(state));
        }
    }
});

export const { addItem, deleteItem, updateItem, resetCartState } = cartReducer.actions;

export default cartReducer.reducer;