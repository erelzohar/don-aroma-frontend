import { Link } from "react-router-dom";
import "./Footer.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <div className="grid-container">
                <div className="footer-info">
                    <p className="footer-info-header">מידע ושירות</p>
                    <Link className='social-links' to="/">ראשי</Link>
                    <Link className='social-links' to="/business">שירות חודשי לעסקים</Link>
                    <Link className='social-links' to="/about-us">אודותינו</Link>
                    <Link className='social-links' to="/policy">תקנון</Link>
                    <Link className='social-links' to="/contact-us">צור קשר</Link>
                    <Link className='social-links' to="/faq">שאלות נפוצות</Link>
                </div>
                <div className="footer-info">
                    <p className="footer-info-header">מוצרים</p>
                    <Link className='social-links' to="/products">כל המוצרים</Link>
                    <Link className='social-links' to="/products/650acfabc4c0c3b0a4da8ad3">ניחוחות</Link>
                    <Link className='social-links' to="/products/650acf8fc4c0c3b0a4da8ad2">מפיצי ריח דיגיטליים</Link>
                    <Link className='social-links' to="/products/650adc37c4c0c3b0a4da8aec">חבילות/מארזים</Link>
                    <Link className='social-links' to="/products/650ad02dc4c0c3b0a4da8ad4">אביזרים נלווים</Link>
                </div>
                <div className="footer-info">
                    <p className="footer-info-header">עקבו אחרינו</p>
                    <a target="blank" className='social-links' href="https://www.facebook.com/profile.php?id=61550822289202&mibextid=LQQJ4d"><BsFacebook size="22" /></a>
                    <a target="blank" className='social-links' href="https://www.instagram.com/don_aromaisr/"><AiFillInstagram size="25"/></a>
                </div>
            </div>
            <span>&copy; All rights reserved to <a className="ezLink" href="https://www.instagram.com/ezwebs/"> EZ web development.</a></span>
        </div>
    );
}

export default Footer;
