class UserModel {
    constructor(user:UserModel){
        if (user._id) this._id = user._id;
        if (user.firstName) this.firstName = user.firstName;
        if (user.lastName) this.lastName= user.lastName;
        if (user.email) this.email= user.email;
        if (user.phone) this.phone= user.phone;
        if (user.password) this.password= user.password;
        if (user.token) this.token= user.token;
        if (user.isAdmin) this.isAdmin= user.isAdmin;
    }
    public _id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;
    public isAdmin: boolean;
    public password:string;
    public token: string;


    public static convertToFormData(user:UserModel):FormData{
        const formData = new FormData();
        formData.append("firstName",user.firstName);
        formData.append("lastName",user.lastName);
        formData.append("phone",user.phone);
        formData.append("email",user.email);
        formData.append("password",user.password);
        return formData
    }
}

export default UserModel;