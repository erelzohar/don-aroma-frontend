import "./ProductSpecs.css";
import { Rating, Typography } from "@mui/material";
import ProductsCarousel from "../../ProductsArea/ProductsCarousel/ProductsCarousel";
import store, { useAppSelector } from "../../../Redux/Store";
import { useEffect } from "react";
import productsService from "../../../Services/Products";
import { Link, useParams } from "react-router-dom";
import { IoIosBowtie } from "react-icons/io";
import ProductForm from "../../AdminArea/ProductForm/ProductForm";
import Slideshow from "../../Generics/Slideshow/Slideshow";
import AddToCartForm from "../AddToCartForm/AddToCartForm";



function ProductSpecs(): JSX.Element {

    const products = useAppSelector(state => state.productsState.products);
    const params = useParams();
    const productId = params.productId;
    let productToSpec = useAppSelector(state => state.productsState.products.find(p => p._id === productId));
    const interestedProducts = productsService.shuffle(products?.filter(p => p.category._id === productToSpec?.category._id && p._id !== productId));
    const getLabel = (value: number) => {
        if (value < 3) return "עדין";
        if (value > 4) return "דומיננטי";
        else return "קלאסי";
    }

    useEffect(() => {
        if (products.length === 0) productsService.getProducts();
    }, [params])
    return (
        <div className="ProductSpecs">
            {store.getState().authState.user?.isAdmin && <ProductForm product={productToSpec} />}
            {productToSpec && <div className="gridContainer">
                <div className="imgDiv">
                    <Slideshow imageNames={productToSpec?.images} />
                    {productToSpec.level > 0 && <><Typography fontSize='large' display="flex" fontWeight='bold' alignItems="center">דומיננטיות:
                        <Rating
                            sx={{ margin: "1rem" }}
                            dir="ltr"
                            name="simple-controlled"
                            value={productToSpec.level}
                            readOnly
                            size="large"
                            aria-label="דומיננטיות"
                            icon={<IoIosBowtie />}
                            emptyIcon={<IoIosBowtie style={{ opacity: 0.8 }} fontSize="inherit" />}
                        />
                        <span style={{ fontSize: 'small', fontWeight: '500' }}>{getLabel(productToSpec.level)}</span>
                    </Typography></>}

                    <div className="productHashtags">
                        <p>קטגוריות:
                            <Link to={"/products/" + productToSpec.category._id}>
                                #{productToSpec.category.name}
                            </Link>
                            {productToSpec.scentCategory && <Link to={"/products/scents/" + productToSpec.scentCategory._id}>
                                #{store.getState().productsState.scentCategories.find(c => c._id === productToSpec.scentCategory._id).name}
                            </Link>}
                        </p>
                    </div>
                </div>
                <div className="specsContainer">
                    <div className="specDiv">
                        <h1 className="productName">{productToSpec.name}</h1>
                        <section>{productToSpec.description} </section>
                    </div>
                    <AddToCartForm product={productToSpec} />
                </div>
            </div>}
            <div className="interestedCarousel">
                <h1>אולי יעניין אותך גם..</h1>
                {productToSpec && <ProductsCarousel products={interestedProducts} />}
            </div>

        </div>
    );
}

export default ProductSpecs;
