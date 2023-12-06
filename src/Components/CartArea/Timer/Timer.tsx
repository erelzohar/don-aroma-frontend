import { useEffect, useState } from "react";
import "./Timer.css";
import cartService from "../../../Services/Cart";
import store from "../../../Redux/Store";
import { resetCartState } from "../../../Redux/Reducers/cart.slice";

function Timer(): JSX.Element {
    const [time, setTime] = useState(3600000);

    useEffect(() => {
        let interval: NodeJS.Timer;
        const updatedState = cartService.checkCache();
        if (updatedState.timeToRemove < new Date().getTime()) store.dispatch(resetCartState());
        else {
            interval = setInterval(() => {
                setTime(new Date((updatedState.timeToRemove - new Date().getTime())).getTime());
                if ((time / 1000) < 2) clearInterval(interval);
            }, 1000);
        }
        if (interval) return () => clearInterval(interval);
    }, [time])

    return (
        <div className="Timer">
            <h3>הפריטים ישמרו עבורך למשך :</h3>
            <h3 style={{letterSpacing:"2px" ,color: time < 800000 ? "red" : "green" ,fontStyle:"normal",fontSize:"x-large"}}>{new Date(time).getMinutes() + ":" + (new Date(time).getSeconds().toString().length ===1 ? "0"+new Date(time).getSeconds().toString() : new Date(time).getSeconds())}</h3>
        </div>
    );
}

export default Timer;
