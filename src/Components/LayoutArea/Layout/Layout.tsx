import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";
import Home from "../../HomeArea/Home/Home";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import SpeedDialComponent from "../../Generics/SpeedDialComponent/SpeedDialComponent";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import CartBtn from "../../CartArea/CartBtn/CartBtn";
import { useAppSelector } from "../../../Redux/Store";
import ScrollToTop from "../../../Services/ScrollToTop";
import ProductSpecs from "../../ProductsArea/ProductSpecs/ProductSpecs";
import Faq from "../../Faq/Faq";
import AboutUs from "../../AboutUs/AboutUs";
import Policy from "../../Policy/Policy";
import ContactUsPage from "../../ContactUsPage/ContactUsPage";
import BusinessPage from "../../BusinessPage/BusinessPage";
import { useEffect, useRef } from 'react';
import ProtectedRoute from "../../../Services/ProtectedRoute";
import AdminPage from "../../AdminArea/AdminPage/AdminPage";
import NotFoundPage from "../../Generics/NotFoundPage/NotFoundPage";
import Logout from "../../AuthArea/Logout/Logout";
import CartPage from "../../CartArea/CartPage/CartPage";
import SalesPage from "../../AdminArea/SalesArea/SalesPage/SalesPage";



function Layout(): JSX.Element {
    const layoutRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (layoutRef.current) {
            let headerRef = document.querySelector(".MuiAppBar-root");
            layoutRef.current.style.gridTemplateRows = `${headerRef.clientHeight + "px"} minmax(70vh, auto) minmax(5vh, auto)`
        }
        window.addEventListener("resize", () => {
            let headerRef = document.querySelector(".MuiAppBar-root");
            layoutRef.current.style.gridTemplateRows = `${headerRef.clientHeight + "px"} minmax(70vh, auto) minmax(5vh, auto)`
        });
    }, [])

    return (
        <Router>
            <ScrollToTop />
            <div className="Layout" ref={layoutRef} >
                <header><Header /></header>
                <main id="layout-main">
                    <CartBtn />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* auth routes */}
                        <Route path="auth/register" element={<Register />} />
                        <Route path="auth/login" element={<Login />} />
                        <Route path="auth/logout" element={<Logout />} />
                        {/* products routes */}
                        <Route path="specs/:productId" element={<ProductSpecs />} />
                        <Route path="products/scents/:scentId" element={<ProductsList />} />
                        <Route path="products/:categoryId" element={<ProductsList />} />
                        <Route path="products" element={<ProductsList />} />
                        {/* single routes */}
                        <Route path="faq" element={<Faq />} />
                        <Route path="about-us" element={<AboutUs />} />
                        <Route path="policy" element={<Policy />} />
                        <Route path="contact-us" element={<ContactUsPage />} />
                        <Route path="business" element={<BusinessPage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="cart/:orderNumber" element={<CartPage />} />

                        {/* protected */}
                        <Route path="/manage/admin" element={<ProtectedRoute redirectPath="/*" protectedComponent={<AdminPage />} />} />
                        <Route path="/manage/admin/sales" element={<ProtectedRoute redirectPath="/*" protectedComponent={<SalesPage />} />} />

                        {/* not found */}
                        <Route path="/*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <footer>
                    <SpeedDialComponent />
                    <Footer />
                </footer>
            </div>
        </Router>

    );
}

export default Layout;
