import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SaleModel from "../../Models/SaleModel";

export class SalesState {
    sales:SaleModel[]
}

const initialState: SalesState = {
    sales:[]
}

const salesReducer = createSlice({
    name: "salesReducer",
    initialState,
    reducers: {
        setSales: (state, action: PayloadAction<SaleModel[]>) => {
            state.sales = action.payload;
        },
        addSale: (state, action: PayloadAction<SaleModel>) => {
            state.sales.push(action.payload);
        },
        updateSale: (state, action: PayloadAction<SaleModel>) => {
            const newSalesState = [ ...state.sales ];
            const index = newSalesState.findIndex(p => p._id === action.payload._id);
            newSalesState[index] = action.payload;            
            state.sales = newSalesState;
        },
        deleteSale: (state, action: PayloadAction<string>) => {
            const index = state.sales.findIndex(sale => sale._id === action.payload);
            if (index < 0) return;
            state.sales.splice(index, 1);
        }
    }
});

export const {setSales,addSale,deleteSale,updateSale } = salesReducer.actions;

export default salesReducer.reducer;