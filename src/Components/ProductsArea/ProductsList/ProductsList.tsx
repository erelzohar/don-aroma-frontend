import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useParams } from "react-router-dom";
import "./ProductsList.css";
import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Services/Products";
import ProductCard from "../ProductCard/ProductCard";
import HorizonalProduct from '../HorizonalProduct/HorizonalProduct';
import store from '../../../Redux/Store';
import { setProductListDisplay } from '../../../Redux/Reducers/products.slice';
import Loader from '../../Generics/Loader/Loader';



function ProductsList(): JSX.Element {
    const params = useParams();
    const category = params.categoryId;
    const scentCategory = params.scentId;
    const [productsState, setProducts] = useState<ProductModel[]>([]);
    const [view, setView] = React.useState(store.getState().productsState.productListDisplay);
    const gridDiv = React.useRef<HTMLDivElement>();

    const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: "grid" | "block") => {
        const fixedView = nextView ? nextView : view;
        setView(fixedView);
        store.dispatch(setProductListDisplay(fixedView));
        gridDiv.current.style.display = nextView;
    };

    useEffect(() => {
        productsService.getProducts()
            .then(res => {
                if (scentCategory) {
                    setProducts(res.filter(p => p.scentCategory?._id === scentCategory));
                }
                else if (category) {
                    setProducts(res.filter(p => p.category._id === category));
                }
                else setProducts(res);
            });

    }, [params]);

    return (
        <div className="ProductList">
            <div className="filters">
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="block" aria-label="block">
                        <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value="grid" aria-label="grid">
                        <ViewModuleIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={productsState.length>0 ? "ProductsListGrid" : ""} ref={gridDiv} style={{ display: view }}>
                {productsState.length===0 && <Loader/>}
                {productsState.map((p, i) => view === "grid" ? <ProductCard key={i} {...p} /> : <HorizonalProduct key={i} {...p} />)}
            </div>
        </div>
    );
}

export default ProductsList;
