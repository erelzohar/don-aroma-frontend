import jwtDecode, { JwtPayload } from "jwt-decode";
import UserModel from "../Models/UserModel";
import notify from "./Notify";



class UsersService {

    public SaveUserLocal(user: UserModel) {
        const newUser = {...user}        
        if (!user.isAdmin) delete newUser.isAdmin;
        delete newUser.password;
        const string = JSON.stringify(newUser);
        localStorage.setItem("donaroma", string);
    }
    public checkUserExp(user:UserModel){
        if(!user) return null;
        const decodedToken : JwtPayload =  jwtDecode(user.token) ;
        if (decodedToken.exp < Date.now() / 1000){
            notify.custom("Session expired please login");
            localStorage.removeItem('donaroma');
            window.location.assign("/");
            return null;
        }
        return user;
    }

}

const usersService = new UsersService();

export default usersService;