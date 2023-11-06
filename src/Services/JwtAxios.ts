import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { userLoggedOut } from "../Redux/Reducers/user.slice";
import store from "../Redux/Store";
import notify from "./Notify";
import { useNavigate } from "react-router-dom";

// creating axios instance:
const jwtAxios = axios.create();
// Add a request interceptor :
jwtAxios.interceptors.request.use(request => {

    // If user logged in:
    if (store.getState().authState.user) {
        
        //check if the token has expired
        const decodedToken : JwtPayload = store.getState().authState.user?.token ? jwtDecode(store.getState().authState.user?.token) : null
        
        if (decodedToken.exp < Date.now() / 1000){
            store.dispatch(userLoggedOut());
            const navigate = useNavigate();
            navigate('/auth/login');
            notify.error("Your session has expired");
            return;
        }

            // Add the token to request headers:
            request.headers.set("authorization","Bearer " + store.getState().authState.user?.token);
    }

    return request;
});

 export default jwtAxios;