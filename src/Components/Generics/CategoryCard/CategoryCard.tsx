import "./CategoryCard.css";
import CategoryModel from "../../../Models/CategoryModel";
import { Link } from "react-router-dom";
import globals from "../../../Services/Globals";

function CategoryCard(category: CategoryModel): JSX.Element {
    return (
        <div className="CategoryCard" style={{ backgroundImage: `url(${globals.productsUrl + "/img/" + category.imageName})` }}>
            <Link to={"/products/" + category._id}>
                <div className="fill-height"></div>
                <h2 className="category-name">{category.name}</h2>
            </Link>
        </div>

    );
}

export default CategoryCard;
