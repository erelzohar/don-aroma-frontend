import ContactUs from "../Generics/ContactUs/ContactUs";
import "./ContactUsPage.css";
import { Home, Phone, AlternateEmail, LockClock } from '@mui/icons-material';
function ContactUsPage(): JSX.Element {
    return (
        <div className="ContactUsPage">
            <div className="InfoContainer">
                <div className="contactInfo">
                    <h1 className="header">כתובתינו <Home /></h1>
                    <p>ויצמן 10 רמלה</p>
                </div>
                <div className="contactInfo">
                    <h1 className="header">טלפון <Phone /></h1>
                    <p>0503713852</p>
                </div>
                <div className="contactInfo">
                    <h1 className="header">דוא"ל <AlternateEmail /></h1>
                    <p>donaroma.sr@gmail.com</p>
                </div>
                <div className="contactInfo">
                    <h1 className="header">שעות פעילות <LockClock /></h1>
                    <p>א'-ה' בין השעות 09 - 17</p>
                </div>
            </div>
            <div className="form-map">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.112111939496!2d34.86946292378566!3d31.93071342675316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502ca06bdf29f5f%3A0xf38eae6e3058b472!2z16nXk9eo15XXqiDXl9eZ15nXnSDXldeZ15nXptee158gMTAsINeo157XnNeU!5e0!3m2!1siw!2sil!4v1698189767790!5m2!1siw!2sil" width="90%" height="450" style={{ border: 0 }} allowFullScreen={false} referrerPolicy="no-referrer-when-downgrade"></iframe>
                <ContactUs />
            </div>
        </div>
    );
}

export default ContactUsPage;
