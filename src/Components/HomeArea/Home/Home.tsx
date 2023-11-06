import "./Home.css";
import ProductsCarousel from "../../ProductsArea/ProductsCarousel/ProductsCarousel";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriesList from "../../Generics/CategoriesList/CategoriesList";
import { Fade, Slide, Zoom, AttentionSeeker } from "react-awesome-reveal";
import productsService from "../../../Services/Products";
import ContactUs from "../../Generics/ContactUs/ContactUs";
import { useAppSelector } from "../../../Redux/Store";
import clockGif from "../../../Assets/Images/clock.gif";




function Home(): JSX.Element {
    const products = useAppSelector(state=>state.productsState.products);


    useEffect(() => {
        if (products.length === 0) {
            productsService.getProducts();
        }

    }, [])
    return (
        <div className="Home">
            <Slide direction="down" triggerOnce>
                <div className="intro-message">
                    <h1>לרגל החגים 650% הנחה על כל פריט שני</h1>
                </div>
            </Slide>
            <div className="home-section" >
                <h1 className="home-heading">קטגוריות נבחרות</h1>
                <CategoriesList />
            </div>
            <div className="home-section">
                <Link to="/products">
                    <h1 className="home-heading">המומלצים שלנו</h1>
                </Link>

                <ProductsCarousel products={products} />
            </div>
            <div className="home-section businnessSection">
                <Zoom>
                    <AttentionSeeker effect="tada" delay={2500}>
                        <img src={clockGif} alt="" width="100px" />
                    </AttentionSeeker>
                </Zoom>
                <Fade delay={500} duration={1000} cascade triggerOnce>
                    <h1>עדיין לא הצטרפתם לשירות החודשי שלנו?</h1>
                    <h2><span className="faq-link"><Link to={"/business"}>השירות החודשי</Link></span>  של דון ארומה לעסקים, בתי מלון, משרדי חברות ובתים פרטיים. </h2>
                    <h3>מגוון ניחוחות תוצרת איטליה עד אליכם - שירות לקוחות וקריאת שירות עד 2 ימי עסקים  .</h3>
                </Fade>
            </div>
            <ContactUs />
        </div>
    );
}

export default Home;
