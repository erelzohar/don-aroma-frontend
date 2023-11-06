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
    scentCategory: CategoryModel;
    isRecommended: boolean;
    scents:string[];


    public static convertToFormData(product: ProductModel, image: File = null): FormData {
        const formData = new FormData();
        if (product._id) formData.append("_id", product._id);
        formData.append("name", product.name);
        formData.append("price", product.price?.toLocaleString());
        formData.append("image", image);
        formData.append("imageName", product.imageName);
        formData.append("category", product.category?._id);
        formData.append("description", product.description);
        formData.append("level", product.level?.toLocaleString());
        if (product.colors)formData.append("colors", JSON.stringify(product.colors));
        if (product.scents)formData.append("scents", JSON.stringify(product.scents));
        formData.append("scentCategory", product.scentCategory?._id);
        return formData;
    }






}

export default ProductModel;