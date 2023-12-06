import jwtDecode, { JwtPayload } from "jwt-decode";
import UserModel from "../Models/UserModel";
import notify from "./Notify";

class UsersService {

    public SaveUserLocal(user: UserModel) {
        const newUser = { ...user }
        if (!user.isAdmin) delete newUser.isAdmin;
        delete newUser.password;
        delete newUser._id;
        const string = JSON.stringify(newUser);
        localStorage.setItem("donaromauser", string);
    }
    public checkUserExp() {
        let user;
        if (localStorage.getItem('donaromauser')) {
            try {
                user = JSON.parse(localStorage.getItem('donaromauser'));
            }
            catch {
                user = null;
            }
        }
        if (!user?.token) return null;
        const decodedToken: JwtPayload = jwtDecode(user.token);
        if (decodedToken.exp < Date.now() / 1000) {
            localStorage.removeItem('donaromauser');
            notify.custom("Session expired please login");
            return null;
        }
        return user;
    }

}

const usersService = new UsersService();

export default usersService;