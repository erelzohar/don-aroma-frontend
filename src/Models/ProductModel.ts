import CategoryModel from "./CategoryModel";
import SaleModel from "./SaleModel";

class ProductModel {
    _id: string;
    name: string;
    price: number;
    category: CategoryModel;
    images: string[];
    colors: string[];
    sales: SaleModel[];
    description: string;
    level: number;
    scentCategory: CategoryModel = null;
    isRecommended: boolean = false;
    scents: string[];
    stock: number;
    sortIndex: number;
    mlPrices:{
        "1000":number,
        "500":number,
        "200":number
    }

    public static convertToFormData(product: ProductModel, images: File[] = null, imagesToDelete: string[] = null): FormData {
        const formData = new FormData();
        if (product._id) formData.append("_id", product._id);
        formData.append("name", product.name);
        formData.append("price", product.price?.toString());        
        if (images) images.forEach(i => {
            formData.append("images", i);
        })
        if (product.images) formData.append("images", JSON.stringify(product.images));
        if (imagesToDelete) formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
        formData.append("category", product.category?._id);
        formData.append("description", product.description);
        formData.append("level", product.level?.toString());
        formData.append("stock",product.stock.toString());
        formData.append("sortIndex",product.sortIndex.toString());
        if (product.colors) formData.append("colors", JSON.stringify(product.colors));
        if (product.scents) formData.append("scents", JSON.stringify(product.scents));
        if (product.sales) formData.append("sales", JSON.stringify(product.sales));
        if (product.scentCategory) formData.append("scentCategory", product.scentCategory?._id);
        if (product.isRecommended !== undefined) formData.append("isRecommended", product.isRecommended?.toString());
        return formData;
    }

}

export default ProductModel;