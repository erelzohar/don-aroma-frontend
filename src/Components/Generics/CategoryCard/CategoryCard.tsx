import "./CategoryCard.css";
import img from "../../../Assets/Images/horizonal-cover.webp";
import CategoryModel from "../../../Models/CategoryModel";
import { Link } from "react-router-dom";

function CategoryCard(category: CategoryModel): JSX.Element {
    return (
        <Link to={"/products/" + category._id} preventScrollReset={false}>
                <div className="CategoryCard" style={{ backgroundImage: `url(${img})`}}>
                    <div className="fill-height"></div>
                    <h2 className="category-name">{category.name}</h2>
                </div>
        </Link>
    );
}

export default CategoryCard;
