import Draggable from "react-draggable";
import "./SaleForm.css";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, PaperProps, Select, TextField } from "@mui/material";
import SaleModel from "../../../../Models/SaleModel";
import { FormEvent, useEffect, useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { BiPlus } from "react-icons/bi";
import dayjs, { Dayjs } from "dayjs";
import notify from "../../../../Services/Notify";
import salesService from "../../../../Services/Sales";


function PaperComponent(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} sx={{ overflowX: 'hidden' }} />
        </Draggable>
    );
}

interface Props {
    sale?: SaleModel;
}

function SaleForm(props: Props): JSX.Element {
    const [open, setOpen] = useState(false);
    const resetForm = () => {
        if (props.sale) return props.sale;
        const newFormData = new SaleModel();
        newFormData.name = '';
        newFormData.type = '';
        return newFormData;
    }
    const [formData, setFormData] = useState(resetForm());
    const getPlusNumbers = () => {
        if (formData.type === 'plus' && formData.saleData) {
            const first = +formData.saleData.split("+")[0];
            const second = +formData.saleData.split("+")[1];
            return [first, second]
        }
        else return [1, 1]
    }
    const [plusNumbers, setPlusNumbers] = useState(getPlusNumbers());
    const handleClose = () => {
        setOpen(false);
        setFormData(resetForm());
    };
    const salesTypes = ['quantity', 'percent', 'plus'];

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const res = await salesService.upsertSale(formData);
            if (res) handleClose();
        }
        catch (err) {
            notify.error(err);
        }
    }
    return (<>
        <IconButton color="success" onClick={() => { setOpen(true) }}><BiPlus /></IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            dir="rtl"
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <DialogTitle width='80%'>{props.sale ? "עדכון מבצע" : "הוסף מבצע"}</DialogTitle>
                <IconButton color="error" onClick={handleClose}>&nbsp;x&nbsp;</IconButton>
            </span>
            <DialogContent>
                <form className="saleForm" onSubmit={handleSubmit}>
                    <TextField
                        label="שם מבצע"
                        margin="normal"
                        required
                        value={formData.name}
                        onChange={(e) => { setFormData(prev => ({ ...prev, name: e.target.value })) }} />
                    <FormControl fullWidth margin="normal" >
                        <InputLabel id="demo-simple-select-label">סוג מבצע*</InputLabel>
                        <Select
                            value={formData.type}
                            onChange={(e) => { setFormData(prev => ({ ...prev, type: e.target.value })) }}
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="סוג"
                        >
                            {salesTypes.map((c, i) => <MenuItem key={i} value={c}>{c === 'quantity' ? 'הנחה על כמות מסוימת' : c === 'percent' ? 'הנחה באחוזים' : "כמות + כמות"}</MenuItem>)}

                        </Select>
                    </FormControl>
                    {formData.type && <span>
                        {formData.type === 'quantity' && <span style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="כמות מוצרים"
                                margin="normal"
                                required
                                type="number"
                                value={formData.saleData ? +formData.saleData.split('in')[0] : ''}//3in200
                                onChange={(e) => { if (+e.target.value > 0) setFormData(prev => ({ ...prev, saleData: +e.target.value + 'in0' })) }}
                            />
                            <p style={{ margin: '2px' }}> ב-</p>
                            <TextField
                                label="מחיר"
                                margin="normal"
                                required
                                type="number"
                                value={formData.saleData ? +formData.saleData.split('in')[1] : ''}//3in200
                                onChange={(e) => { if (+e.target.value > 0) setFormData(prev => ({ ...prev, saleData: (prev.saleData ? prev.saleData.split('in')[0] : '0') + "in" + +e.target.value })) }}
                            />
                        </span>}
                        {formData.type === 'percent' && <>
                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                }}
                                label="אחוזי הנחה"
                                margin="normal"
                                required
                                type="number"
                                value={formData.saleData ? +formData.saleData.replace('%', '') : 0}//3in200
                                onChange={(e) => { if (+e.target.value > 0) setFormData(prev => ({ ...prev, saleData: +e.target.value + "%" })) }}
                            />

                        </>}
                        {formData.type === 'plus' && <span style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="כמות קנייה"
                                margin="normal"
                                required
                                type="number"
                                value={formData.saleData ? +formData.saleData.split('+')[0] : ''}
                                onChange={(e) => { if (+e.target.value > 0) setFormData(prev => ({ ...prev, saleData: +e.target.value + '+0' })) }}
                            />
                            <p style={{ margin: '2px' }}>+</p>
                            <TextField
                                label="מוצרים מתנה"
                                margin="normal"
                                required
                                type="number"
                                value={formData.saleData ? +formData.saleData.split('+')[1] : ''}
                                onChange={(e) => { if (+e.target.value > 0) setFormData(prev => ({ ...prev, saleData: (prev.saleData ? prev.saleData.split('+')[0] : '0') + "+" + +e.target.value })) }}
                            />
                        </span>}
                    </span>}
                    <DateTimePicker
                        minDateTime={dayjs(new Date())}
                        sx={{ direction: 'ltr', margin: '1rem' }}
                        label="תוקף מבצע"
                        value={formData.date ? dayjs(+formData.date) : null}
                        onAccept={(newValue: Dayjs) => {
                            setFormData(prev => ({ ...prev, date: newValue.valueOf().toString() }))
                        }}
                    />
                    <Button variant="contained" color="success" type="submit">הוסף מבצע</Button>
                </form>
            </DialogContent>
        </Dialog>
    </>
    );
}

export default SaleForm;
