import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderModel } from "../../Models/OrderModel";

export class ProductsState {
    public orders: OrderModel[];

}


const initialState: ProductsState = {
    orders: []

}

const ordersReducer = createSlice({
    name: "ordersReducer",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderModel[]>) => {
            state.orders = action.payload;
        },
        updateOrder: (state, action: PayloadAction<OrderModel>) => {
            const newOrdersState = [ ...state.orders ];
            const index = newOrdersState.findIndex(order => order._id === action.payload._id);
            newOrdersState[index] = action.payload;            
            state.orders = newOrdersState;
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            const index = state.orders.findIndex(order => order._id === action.payload);
            if (index < 0) return;
            state.orders.splice(index, 1);
        }
    }
});

export const { setOrders, updateOrder, deleteOrder} = ordersReducer.actions;

export default ordersReducer.reducer;