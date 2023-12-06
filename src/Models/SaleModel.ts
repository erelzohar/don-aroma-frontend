
class SaleModel {
    _id: string;
    name: string;
    date: string;
    saleData: string;
    type: string;


    public static convertToFormData(sale: SaleModel): FormData {
        const formData = new FormData();
        if (sale._id) formData.append("_id", sale._id);
        formData.append("name", sale.name);
        formData.append("type", sale.type);
        formData.append("saleData", sale.saleData);
        if (sale.date) formData.append("date", sale.date);
        return formData;
    }

}

export default SaleModel;