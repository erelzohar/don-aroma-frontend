import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoriesList.css";
import productsService from "../../../Services/Products";
import Loader from "../Loader/Loader";

function CategoriesList(): JSX.Element {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        productsService.getCategories()
            .then(res => { setCategories(res) })
    }, []);

    return (
        <div className={categories.length>0 ? "CategoriesList" : ""}>
            {categories.length===0 && <Loader/>}
            {categories.map((c, i) => <CategoryCard key={i} {...c} />)}
        </div>
    );
}

export default CategoriesList;
