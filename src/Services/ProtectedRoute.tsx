import { Navigate } from "react-router-dom";
import store from "../Redux/Store";
import usersService from "./Users";

interface protectedRouteProps{
    redirectPath:string;
    protectedComponent:JSX.Element;
}


export default function ProtectedRoute(props:protectedRouteProps){
    const isAuthenticated = store.getState().authState.user && store.getState().authState.user.isAdmin && usersService.checkUserExp(store.getState().authState.user);    
    if (!isAuthenticated) return <Navigate to={props.redirectPath} replace/>
    return props.protectedComponent;
}