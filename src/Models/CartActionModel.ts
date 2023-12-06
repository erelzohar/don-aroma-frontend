
class CartAction {
    public productId:string;
    public updatedStock:number;


    public static convertToFormData(action:CartAction): FormData {
        const formData = new FormData();
        formData.append('productId',action.productId);
        formData.append('updatedStock',action.updatedStock.toString());
        return formData;
    }

}

export default CartAction;