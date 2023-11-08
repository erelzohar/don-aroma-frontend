import ProductsTable from "../ProductsTable/ProductsTable";
import { useAppSelector } from "../../../Redux/Store";
import { useEffect } from "react";
import productsService from "../../../Services/Products";
import AdminMessages from "../AdminMessages/AdminMessages";

function AdminPage(): JSX.Element {
    const products = useAppSelector(state => state.productsState.products)
    useEffect(() => {
        if (products.length === 0) {
            productsService.getProducts()
        }
    }, [products])
    return (
        <div className="AdminPage">
            <AdminMessages />
            <ProductsTable products={products} />
        </div>
    );
}

export default AdminPage;
