import OrdersTable from "../OrdersTable/OrdersTable";
import "./OrdersPage.css";

function OrdersPage(): JSX.Element {
    return (
        <div className="OrdersPage">
			<OrdersTable/>
        </div>
    );
}

export default OrdersPage;
