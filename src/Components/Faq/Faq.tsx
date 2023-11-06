import "./Faq.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

export default function Faq() {
    return (
        <div className='Faq'>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>אם יש לי תקלה מה עושים?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        ניתן לצור קשר טלפוני ובפלטפורמות השונות ונעשה את המיטב כדי לעזור.
                        אם המכשיר תקול במידה ויתאפשר ננסה לתקן או שנחליף למכשיר חדש לכל מכשיר שנרכש מאיתנו יש אחריות של שנה מרגע הרכישה<br/>
                        במידה ונגמרה האחריות ניתן לטפל בכל תקלה  (או תקלה שאינה כלולה באחריות) בתוספת תשלום.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>האם השמן מתבלה?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        לא, בתנאי ששומרים על השמן במקום מוצל
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>האם השמנים בריאותיים?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        השמנים הינם תמציות בושם ולא עשויים מחומרים טבעיים
                        השמנים בעלי תו תקן של איגוד הבישום העולמי
                        ifra
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>האם יש אחריות על המכשיר?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        יש אחריות של שנה על תקלה תכנית בלבד.
                        אין אחריות במקרה של שבר או כניסת שמן למנוע ע"י הפיכת המכשיר שהנוזל בתוך הבקבוק.
                        לא תינתן אחריות אם במידה ויבוצע שימוש במכשיר עם שמנים לא של חברת דון ארומה
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography> מה ההבדל בין רכישה להשכרה?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    <span className="faq-link"><Link to="/products/650acf8fc4c0c3b0a4da8ad2">ברכישת מכשיר-</Link></span>                    תפעול המכשיר מבוצע ע"י הלקוח.
                    בעת תקלה, נשמח לסייע טלפונית ע"מ לעזור(ללא סייג לאחריות של שנה המגיעה לכל רוכש).<br/>
                    <span className="faq-link"><Link to="/business">בהשכרה חודשית-</Link></span>
                    האחריות כוללת כל תקופת ההכשרה בה כל תקלה וכל מקרה יטופל בשטח על ידי הטכנאי מטעם "דון
                    ארומה" וניתן להחליף ריח בכל פעם שמגיעה עת השירות.                    
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>האם ניתן להחזיר ריח שנרכש?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                         ניתן להחזיר ריח רק במידה ולא היה בו שימוש ושלא עברו שלושה חודשים מרגע הקנייה.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>ממה עשויים השמנים?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        השמנים הינם תמציות שמן בושם המיוצרים בטורקיה.
                        כל תמציות הריח שלנו עומדים בתקנים המחמירים ביותר של האיגוד העולמי לבישום IFRA
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className="accordions">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>האם המכשיר בעל תו תקן? </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        כן, המכשיר הינו בעל תו תקן מכון תקנים ישראלי
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}