import "./ProductSpecs.css";
import img from "../../../Assets/Images/Brownie.jpeg";
import { Checkbox, FormControl, InputLabel, MenuItem, Rating, Select, Typography } from "@mui/material";
import { Favorite, FavoriteBorder, Brightness1 } from "@mui/icons-material";
import UseNumberInputCompact from "../../Generics/NumberInput/NumberInput";
import ProductsCarousel from "../../ProductsArea/ProductsCarousel/ProductsCarousel";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import productsService from "../../../Services/Products";
import { Link, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import globals from "../../../Services/Globals";
import logo from "../../../Assets/Images/Brownie.webp";
import { IoIosBowtie } from "react-icons/io";

function ProductSpecs(): JSX.Element {

    const [products, setProducts] = useState(store.getState().productsState.products);
    const params = useParams();
    const productId = params.productId;
    const [productToSpec, setProductToSpec] = useState<ProductModel>(store.getState().productsState.products.find(p => p._id === productId));

    useEffect(() => {
        if (products.length === 0) {
            productsService.getProducts()
                .then(res => {
                    setProducts(res);
                    return setProductToSpec(res.find(p => p._id === productId));
                });
        }
        setProductToSpec(products.find(p => p._id === productId));
    }, [params])
    return (
        <div className="ProductSpecs">
            {productToSpec && <div className="gridContainer">
                <div className="imgDiv">
                    <img src={productToSpec.imageName === "" ? logo : globals.productsUrl + "/img/" + productToSpec.imageName} alt="" />
                    {productToSpec.level > 0 && <><Typography fontSize='large' display="flex" fontWeight='bold' alignItems="center">דומיננטיות :
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
                        /></Typography></>}
                    <div className="productHashtags">
                        <p>קטגוריות:
                            <Link to={"/products/" + productToSpec.category._id}>
                                #{productToSpec.category.name}
                            </Link>
                            {productToSpec.scentCategory && <Link to={"/products/scents/" + productToSpec.scentCategory}>
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
                    <div className="productPicker">
                        {productToSpec.scents.length>0 &&<div className="scents">
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="demo-simple-scent-label">קטגורית ריח</InputLabel>
                                <Select
                                    defaultValue={productToSpec.scents[0]}
                                    labelId="demo-simple-scent-label"
                                    id="demo-simple-scent"
                                    label="קטגורית ריח"
                                >
                                    {productToSpec.scents.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)}

                                </Select>
                            </FormControl>
                        </div>}
                        <div className="colorsDiv">
                            <Checkbox checkedIcon={<Brightness1 color="error" />} checked />
                            <Checkbox checkedIcon={<Brightness1 />} checked />
                            <Checkbox checkedIcon={<Brightness1 color="success" />} checked />
                            <Checkbox checkedIcon={<Brightness1 color="secondary" />} checked />
                        </div>
                        <div className="quantity">
                            <UseNumberInputCompact />
                        </div>
                    </div>
                </div>

            </div>}
            {/* <div className="iconsDiv">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </div> */}
            <div className="interestedCarousel">
                <h1>אולי יעניין אותך גם..</h1>
                <ProductsCarousel products={productsService.shuffle(products.filter(p => p.category._id === productToSpec.category._id && p._id !== productId))} />
            </div>

        </div>
    );
}

export default ProductSpecs;
