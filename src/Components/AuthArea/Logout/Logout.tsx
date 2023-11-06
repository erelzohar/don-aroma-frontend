import { Navigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { userLoggedOut } from "../../../Redux/Reducers/user.slice";
import {useEffect} from "react";
import notify from "../../../Services/Notify";

function Logout(): JSX.Element {
    useEffect(()=>{
        store.dispatch(userLoggedOut());
        localStorage.removeItem("donaroma");
        notify.custom("הינך מחובר כאורח")
    },[])
    return <Navigate to="/" />
}

export default Logout;
