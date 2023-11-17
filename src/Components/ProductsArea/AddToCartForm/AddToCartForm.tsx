import "./AddToCartForm.css";
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Brightness1, RadioButtonUnchecked, ShoppingCart } from "@mui/icons-material";
import UseNumberInputCompact from "../../Generics/NumberInput/NumberInput";
import ProductModel from "../../../Models/ProductModel";
import store from "../../../Redux/Store";
import { addItem } from "../../../Redux/Reducers/cart.slice";
import CartItemModel from "../../../Models/CartItemModel";

interface Props {
    product: ProductModel
}

const colorMap = {
    white: '#ffffff',
    black: '#000000'
};

function AddToCartForm(props: Props): JSX.Element {
    const [scent, setScent] = useState('');
    const [color, setColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const handleScentChange = (e: SelectChangeEvent) => {
        setScent(e.target.value);
    }
    const handleColorChange = (e: React.MouseEvent, colorInput: string) => {
        setColor(colorInput);
    }

    const submit = () => {
        const cartItem: CartItemModel = {
            product: props.product,
            color,
            scent,
            quantity
        };
        store.dispatch(addItem(cartItem));

    }
    return (
        <div className="AddToCartForm">
            <div className="productPicker">
                {props.product?.scents.length > 0 && <div className="scents">
                    <FormControl fullWidth sx={{ minWidth: '70px' }} margin="normal">
                        <InputLabel id="demo-simple-scent-label">ניחוח </InputLabel>
                        <Select
                            labelId="demo-simple-scent-label"
                            id="demo-simple-scent"
                            label="ניחוח "
                            onChange={handleScentChange}
                            value={scent}
                        >
                            {props.product.scents.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)}

                        </Select>
                    </FormControl>
                </div>}
                {props.product?.colors.length > 0 && <div className="colorsContainer">
                    <p>בחר צבע</p>
                    <div className="colorsDiv">
                        {props.product.colors.map((c, i) => {
                            let current = c.toLowerCase();
                            if (current === "white") return <Checkbox id="white-color-checkbox" key={i} onClick={(e) => { handleColorChange(e, "לבן") }} checkedIcon={<RadioButtonUnchecked />} checked />
                            return <Checkbox key={i} id="black-color-checkbox" checkedIcon={<Brightness1 htmlColor="#000000" />} onClick={(e) => { handleColorChange(e, "שחור") }} checked />
                        })}
                    </div>
                    <span>{color}</span>
                </div>}
                <div className="quantity">
                    {/* <p>כמות</p>
                    <UseNumberInputCompact setState={setQuantity} /> */}
                </div>
            </div>
            <div className="priceDiv">
                <p>מחיר : <span className="strikethrough">{(props.product.price * 1.3).toFixed()}&#8362;</span></p>
                <p>מחיר באתר : {props.product.price}&#8362;</p>
            </div>
            <div className="buyDiv">
                {/* <Button onClick={submit} variant="contained" color="success" endIcon={<ShoppingCart />}>הוסף לעגלה&nbsp;</Button> */}
            </div>
        </div>
    );
}

export default AddToCartForm;
