import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItemModel from "../../Models/CartItemModel";
import cartService from "../../Services/Cart";

export class CartState {
    public items: CartItemModel[];
    public timeToRemove: number;
}

const initialState: CartState = cartService.CheckCache();

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemModel>) => {
            const newState = { ...state };
            let item = action.payload;

            if (newState.items.length > 0) {
                const index = newState.items.findIndex(i => i.product._id === action.payload.product._id);
                if (index >= 0) {
                    item = newState.items.splice(index, 1)[0];
                    item.quantity = item.quantity + action.payload.quantity;
                }
            }

            newState.items.unshift(item);
            newState.timeToRemove = new Date().getTime() + 1800000;
            if (localStorage.getItem("donaroma")){
                ((JSON.parse(localStorage.getItem("donaromacart"))) as CartState).items.forEach(i=>{
                    if(newState.items.findIndex(obj=>obj.product._id === i.product._id) === -1) newState.items.push(i)
                })
            }
            state = newState;            
            localStorage.setItem('donaromacart', JSON.stringify(state));
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex(item => item.product._id === action.payload);
            if (index < 0) return;
            state.items.splice(index, 1);
            localStorage.setItem('donaromacart', JSON.stringify(state));
        }
    }
});

export const { addItem, deleteItem } = cartReducer.actions;

export default cartReducer.reducer;