export class OrderModel {
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
    }
}