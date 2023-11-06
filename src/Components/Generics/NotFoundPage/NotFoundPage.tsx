import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
function NotFoundPage(): JSX.Element {
    return (
        <div className="NotFoundPage">
			<h1><SentimentVeryDissatisfiedIcon fontSize="inherit" /></h1>
			<h3>NOT FOUND</h3>
            <Link to="/">Back to home page</Link>
        </div>
    );
}

export default NotFoundPage;
