import "./QuickAddToCart.css";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProductModel from "../../../Models/ProductModel";
import AddToCartForm from "../../ProductsArea/AddToCartForm/AddToCartForm";
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

interface Props {
    product: ProductModel;
    state: boolean;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}


function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} sx={{overflowX:'hidden'}}/>
        </Draggable>
    );
}
function QuickAddToCart(props: Props): JSX.Element {

    const handleClose = () => {
        props.setState(false);
    };

    return (
        <Dialog
            open={props.state}
            onClose={handleClose}
            dir="rtl"
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle>הוסף לעגלה</DialogTitle>
            <DialogContent>
               {(props.product.colors?.length>0 || props.product.scents?.length>0) && <DialogContentText>
                    אנא בחר אחת מהאפשרויות:
                </DialogContentText>}
                <AddToCartForm product={props.product} modalSetOpen={props.setState} />
            </DialogContent>
        </Dialog>
    );
}

export default QuickAddToCart;
