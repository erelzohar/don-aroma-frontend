abstract class Globals {
    public registerUrl:string;
    public loginUrl :string;
    public productsUrl:string;
}

// General globals only for development:
class DevelopmentGlobals extends Globals {
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public productsUrl = "http://localhost:3001/api/products/";
}

// General globals only for production:
class ProductionGlobals extends Globals {
    public vacationsUrl = "http://www.mysite.com/api/vacations/";
    public registerUrl = "http://www.mysite/api/auth/register/";
    public loginUrl = "http://www.mysite/api/auth/login/";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;