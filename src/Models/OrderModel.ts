import CartItemModel from "./CartItemModel";

export class OrderModel {
    public _id: string;
    public transactionId: string;
    public orderNumber: string;
    public deliveryType: string;
    public city: string;
    public street: string;
    public streetNum: string;
    public aptNum: string;
    public fullName: string;
    public phone: string;
    public email: string;
    public orderDate: number;
    public items: CartItemModel[];
    public done: boolean;
    constructor(
        orderNumber: string,
        deliveryType: string,
        city: string,
        street: string,
        streetNum: string,
        fullName: string,
        phone: string,
        email: string,
        orderDate: number = new Date().getTime(),
        aptNum: string = null,
        done: boolean = false
    ) {
        this.orderNumber = orderNumber;
        this.deliveryType = deliveryType;
        this.city = city;
        this.street = street;
        this.streetNum = streetNum;
        if (aptNum) this.aptNum = aptNum;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.orderDate = orderDate;
        this.done = done;
        this.items = [];
    }

    public static convertToFormData(order: OrderModel): FormData {
        const formData = new FormData();
        if (order._id) formData.append("_id", order._id);
        formData.append("transactionId", order.transactionId);
        formData.append("orderNumber", order.orderNumber);
        formData.append("deliveryType", order.deliveryType);
        formData.append("city", order.city);
        formData.append("street", order.street);
        formData.append("streetNum", order.streetNum);
        if (order.aptNum) formData.append("aptNum", order.aptNum);
        formData.append("fullName", order.fullName);
        formData.append("phone", order.phone);
        formData.append("email", order.email);
        formData.append("orderDate", order.orderDate.toString());
        formData.append("items", JSON.stringify(order.items));
        if (order.done) formData.append("done", JSON.stringify(order.done));


        return formData;
    }
}