import { combineReducers } from "redux";
import userReducer from "./user.slice";
import productsReducer from "./products.slice";
import cartReducer from "./cart.slice";
import messagesReducer from "./messages.slice"
import salesReducer from "./sales.slice";

export default combineReducers({
     authState: userReducer,
     productsState:productsReducer,
     cartState:cartReducer,
     messagesState:messagesReducer,
     salesState:salesReducer
})