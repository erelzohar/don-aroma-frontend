import SaleForm from "../SaleForm/SaleForm";
import SalesTable from "../SalesTable/SalesTable";
import "./SalesPage.css";

function SalesPage(): JSX.Element {
    return (
        <div className="SalesPage">
            <SaleForm/>
            <SalesTable />
        </div>
    );
}

export default SalesPage;
