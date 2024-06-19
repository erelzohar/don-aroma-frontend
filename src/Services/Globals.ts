abstract class Globals {
    public registerUrl:string;
    public loginUrl :string;
    public productsUrl:string;
    public messagesUrl:string;
}

class DevelopmentGlobals extends Globals {
    public registerUrl = "http://localhost:3001/api/auth/register";
    public loginUrl = "http://localhost:3001/api/auth/login";
    public productsUrl = "http://localhost:3001/api/products";
    public ordersUrl = "http://localhost:3001/api/orders";
    public messagesUrl = "http://localhost:3001/api/message";
    public paymentUrl = "http://localhost:3001/api/meshulam-test";
}

class ProductionGlobals extends Globals {
    public registerUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/auth/register";
    public loginUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/auth/login";
    public productsUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/products";
    public ordersUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/orders";
    public messagesUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/message";
    public paymentUrl = "https://polar-garden-74885-12cdd1b0d0eb.herokuapp.com/api/meshulam-test";

}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;