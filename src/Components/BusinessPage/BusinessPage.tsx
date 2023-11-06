import "./BusinessPage.css";
import { AccessTime, PeopleAlt, Spa, Lightbulb } from '@mui/icons-material';
import ContactUs from "../Generics/ContactUs/ContactUs";


function BusinessPage(): JSX.Element {

    return (
        <div className="BusinessPage">
            <h1 className="underlined">"חווית הרכישה של הלקוח היא אחד מהדברים החשובים לעסק"</h1>
            <h3>צוות דון ארומה מזמינים אתכם להתרשם ולהיות חלק מקהל הלקוחות והשירות שלנו לעסקים,בתי מלון, משרדי חברות ובתים פרטיים.</h3>
            <div className="container">
                <div className="inner-container">
                    <div className="ul-flex">
                        <ul>
                            <li>
                                מחקרים מוכיחים שחלק מרכישת אמון הלקוח בעסק הינה ע"י ריח טוב ומזמין. ובכך יועצי הריח המומחים של דון ארומה ישמחו לעמוד לשירותכם ולהעניק לכם את הריח המיוחד לעסק שלכם ובכך לגרום ללקוח חוויה בלתי נשכחת.
                            </li>
                            <li>
                                אנו מאמינים שמגיע ללקוחות שלנו ולעובדים שלהם הטוב ביותר. ובכך מציעים את השירות שלנו לכל המקומות האפשריים(לובאים,חדרי ישיבות וכנסים, מסעדות,שירותים,פירי אשפה.)
                            </li>
                        </ul>
                    </div>
                    <h3 className="bigandstrong">
                        צרו קשר עם מומחי הריח שלנו והצטרפו לקהל הלקוחות שלנו וקבלו עד 20% הנחה במחיר על החודש הראשון לשירות. <br /> 050-3713852
                    </h3>
                </div>
                <div className="ol">
                    <h2 className="underlined">חבילת השירות של דון ארומה כוללת:</h2>
                    <ol>
                        <li>
                            התאמה מקסימלית לצרכי הלקוח.
                        </li>
                        <li>
                            התקנה נקייה ואסתטית ללא תוספת תשלום.
                        </li>
                        <li>
                            התאמת הריח הטוב ביותר למקום לשירות אשר הלקוח מציע.
                        </li>
                        <li>
                            ביקור טכנאי מומחה מצוות דון ארומה אחת לחודש אשר בודק את תקינות מפיץ הריח,איכות השמן במכשיר,ותדירות העבודה בהתאם לבקשת הלקוח.
                        </li>
                        <li>
                            החלפת הריח בתיאום מראש בהגעת הטכנאי של דון ארומה.
                        </li>
                        <li>
                            חיוך ואנושיות של כל הצוות שלנו החל מהתמיכה הטכנית ועד לטכנאי השטח(חובה).
                        </li>
                    </ol>
                </div>
            </div>
            <div className="iconsContainerDiv">
                <h1>יתרונות השימוש במפיצי ארומה בעסק שלכם:</h1>
                <div className="iconsFlex">
                    <div className="iconItem">
                        <AccessTime fontSize="inherit" />
                        <p>
                            מגדיל את זמן השהייה של הלקוח בחנות ומעודד רכישה.
                        </p>
                    </div>
                    <div className="iconItem">
                        <PeopleAlt fontSize="inherit" />
                        <p>
                            מגדיל את הסיכוי ללקוחות חוזרים.
                        </p>
                    </div>
                    <div className="iconItem">
                        <Spa fontSize="inherit" />
                        <p>מוריד את המתח הנפשי של הלקוח בעסק שלכם.</p>
                    </div>
                    <div className="iconItem">
                        <Lightbulb fontSize="inherit" />
                        <p>מעלה את התפוקה של הצוות המקצועי ומפחית סיכוי לטעויות.</p>
                    </div>
                </div>
            </div>
            <ContactUs />
        </div>

    );
}

export default BusinessPage;
