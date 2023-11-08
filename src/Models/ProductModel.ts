import CategoryModel from "./CategoryModel";

class ProductModel {
    _id: string;
    name: string;
    price: number;
    category: CategoryModel;
    imageName: string;
    colors: string[];
    description: string;
    level: number;
    scentCategory: CategoryModel = null;
    isRecommended: boolean = false;
    scents: string[];


    public static convertToFormData(product: ProductModel, image: File = null): FormData {
        const formData = new FormData();
        if (product._id) formData.append("_id", product._id);
        formData.append("name", product.name);
        formData.append("price", product.price?.toString());
        formData.append("image", image);
        formData.append("imageName", product.imageName);
        formData.append("category", product.category?._id);
        formData.append("description", product.description);
        formData.append("level", product.level?.toString());
        if (product.colors) formData.append("colors", JSON.stringify(product.colors));
        if (product.scents) formData.append("scents", JSON.stringify(product.scents));
        if (product.scentCategory) formData.append("scentCategory", product.scentCategory?._id);
        if (product.isRecommended !== undefined) formData.append("isRecommended", product.isRecommended?.toString());
        return formData;
    }






}

export default ProductModel;