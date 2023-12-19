import "./AddToCartForm.css";
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useRef, useState } from "react";
import { Brightness1, RadioButtonUnchecked, ShoppingCart } from "@mui/icons-material";
import ProductModel from "../../../Models/ProductModel";
import CartItemModel from "../../../Models/CartItemModel";
import QuantityInput from "../../Generics/QuantityInput/QuantityInput";
import cartService from "../../../Services/Cart";
import store from "../../../Redux/Store";

interface Props {
    product: ProductModel;
    modalSetOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const colorMap = {
    white: '#ffffff',
    black: '#000000'
};

function AddToCartForm(props: Props): JSX.Element {
    const [scent, setScent] = useState('');
    const [color, setColor] = useState('');
    const [ml, setMl] = useState<'200' | '500' | '1000'>(props.product.mlPrices ? '200' : null);
    const [quantity, setQuantity] = useState(1);
    const spanErrorRef = useRef<HTMLSpanElement>(null)
    const handleScentChange = (e: SelectChangeEvent) => {
        setScent(e.target.value);
    }
    const handleColorChange = (e: React.MouseEvent, colorInput: string) => {
        setColor(colorInput);
    }
    const handleMlChange = (e: SelectChangeEvent) => {
        setMl(e.target.value as '200' | '500' | '1000');
    }

    const submit = () => {

        if ((props.product?.colors?.length > 0 && color === '') || ((props.product?.scents?.length > 0 || props.product?.category._id === "650adc37c4c0c3b0a4da8aec") && scent === '')) {
            if (spanErrorRef.current) {
                spanErrorRef.current.textContent = "אנא מלא את פרטי המוצר";
            }
            return;
        }
        else {
            if (spanErrorRef.current) {
                spanErrorRef.current.textContent = "";
            }
        }
        if (quantity > props.product.stock) {
            if (spanErrorRef.current) {
                spanErrorRef.current.textContent = `נשארו ${props.product.stock} יחידות במלאי`;
                return;
            }
        }
        const cartItem: CartItemModel = {
            product: props.product,
            color,
            scent,
            quantity,
            ml
        };
        cartService.addToCart(cartItem);
        if (props.modalSetOpen) props.modalSetOpen(false);
    }
    return (
        <div className="AddToCartForm">
            {props.product?.scents.length > 0 && <div className="scents">
                <FormControl fullWidth sx={{ minWidth: '75px' }} margin="normal">
                    <InputLabel id="demo-simple-scent-label">ניחוח </InputLabel>
                    <Select
                        labelId="demo-simple-scent-label"
                        id="demo-simple-scent"
                        label="ניחוח "
                        onChange={handleScentChange}
                        value={scent}
                    >
                        {props.product?.scents[0] !== '***' && props.product.scents.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)}
                        {props.product?.scents[0] === '***' && store.getState().productsState.products.map((c, i) => c.level && <MenuItem key={i} value={c.name.replace("שמן למפיץ ריח -", "") ? c.name.replace("שמן למפיץ ריח -", "") : c.name}>
                            {c.name.replace("שמן למפיץ ריח -", "") ? c.name.replace("שמן למפיץ ריח -", "") : c.name}
                        </MenuItem>)}
                    </Select>
                </FormControl>
            </div>}
            <div className="productPicker">
                {props.product?.colors.length > 0 && <div className="colorsContainer">
                    <p>צבע המכשיר</p>
                    <div className="colorsDiv">
                        {props.product.colors.map((c, i) => {
                            let current = c.toLowerCase();
                            if (current === "white") return <Checkbox id="white-color-checkbox" key={i} onClick={(e) => { handleColorChange(e, "לבן") }} checkedIcon={<RadioButtonUnchecked />} checked />
                            return <Checkbox key={i} id="black-color-checkbox" checkedIcon={<Brightness1 htmlColor="#000000" />} onClick={(e) => { handleColorChange(e, "שחור") }} checked />
                        })}
                    </div>
                    <span>{color}</span>
                </div>}
                {props.product?.mlPrices && <div dir='rtl'>
                    <FormControl fullWidth sx={{ minWidth: '75px' }} margin="normal">
                        <InputLabel id="demo-simple-ml-label"> מ"ל </InputLabel>
                        <Select
                            labelId="demo-simple-ml-label"
                            id="demo-simple-ml"
                            label='מ"ל'
                            onChange={handleMlChange}
                            value={ml}
                        >
                            {Object.keys(props.product.mlPrices).map(key => <MenuItem key={key} value={key}>{key + ' מ"ל'}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>}
                <div className="quantity">
                    <QuantityInput maxVal={props.product.stock ? props.product.stock : 99} changeHandler={(val: number) => { setQuantity(val); return true }} />
                </div>
            </div>
            <span ref={spanErrorRef} style={{ color: 'red' }}></span>
            <div className="priceDiv">
                <p>מחיר : <span className="strikethrough">{props.product.mlPrices ? (props.product.mlPrices[ml] * 1.3) : (props.product.price * 1.3).toFixed()}&#8362;</span></p>
                <p>מחיר באתר : {props.product.mlPrices ? props.product.mlPrices[ml] : props.product.price}&#8362;</p>
            </div>
            <div className="buyDiv">
                <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} onClick={submit} variant="contained" color="success" endIcon={<ShoppingCart />}>הוסף לעגלה&nbsp;</Button>
            </div>
        </div>
    );
}

export default AddToCartForm;
