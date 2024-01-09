import ProductModel from "./ProductModel";

class CartItemModel {
    public product: ProductModel;
    public productId? :string; //used for calculating price at server side
    public quantity: number;
    public color?: string = null;
    public scent?: string = null;
    public ml?: "200" | "500" | "1000" = null;

}

export default CartItemModel;