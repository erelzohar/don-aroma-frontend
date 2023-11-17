import ProductModel from "./ProductModel";

class CartItemModel {

    public product: ProductModel;
    public quantity: number;
    public color?: string = null;
    public scent?: string = null;

}

export default CartItemModel;