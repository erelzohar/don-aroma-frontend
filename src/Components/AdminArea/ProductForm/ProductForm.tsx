import "./ProductForm.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../Services/Notify";
import globals from "../../../Services/Globals";
import { useAppSelector } from "../../../Redux/Store";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import productsService from "../../../Services/Products";
import CategoryModel from "../../../Models/CategoryModel";
import { Add, Delete, Edit } from "@mui/icons-material";
import SaleModel from "../../../Models/SaleModel";
import salesService from "../../../Services/Sales";


interface ProductFormProps {
    product?: ProductModel;
}


const schema = yup
    .object()
    .shape({
        name: yup.string().max(100).required(),
        category: yup.string().required(),
        description: yup.string(),
        price: yup.number().min(0).max(10000),
        color: yup.string(),
        scentCategory: yup.string(),
        stock: yup.number().min(-1).max(10000),
        sortIndex: yup.number().min(0).max(10000)
    })

interface InitialState {
    productCategory: string
    ProductScentCategory: string
    productScents: string[]
    productColors: string[]
    productSales: SaleModel[]
    productLevel: number
    categories: CategoryModel[]
    scentCategories: CategoryModel[]
    sales: SaleModel[]
    open: boolean
    imagesToPost?: File[]
    productImageNames: string[]
    imagesToDelete: string[]
    scentToPush: string
    colorToPush: string
    isLoading: boolean
}
function ProductForm(props: ProductFormProps): JSX.Element {
    const [productToEdit, setProductToEdit] = useState(props?.product ? props.product : new ProductModel());
    const allSales = useAppSelector(state=>state.salesState.sales);
    const allCategories = useAppSelector(state=>state.productsState.categories);
    const allScentCategories = useAppSelector(state=>state.productsState.scentCategories);
    const initiateState = (product: ProductModel) => {
        const initialState: InitialState = {
            productCategory: product.category ? product.category._id : '',
            ProductScentCategory: product.scentCategory ? product.scentCategory._id : '',
            productLevel: product.level ? product.level : 0,
            productScents: product.scents ? product.scents : [],
            productSales: product.sales ? product.sales : [],
            scentToPush: '',
            colorToPush: '',
            productColors: product.colors ? product.colors : [],
            categories: allCategories,
            scentCategories:allScentCategories,
            sales: allSales,
            open: false,
            isLoading: false,
            productImageNames: product.images ? product.images : [],
            imagesToDelete: [],
            imagesToPost: []
        }
        return initialState;
    }
    const [{ productImageNames, sales, productSales, imagesToPost, imagesToDelete, isLoading, productCategory, colorToPush, scentToPush, productScents, productColors, ProductScentCategory, productLevel, categories, scentCategories, open }, setState] = useState(initiateState(productToEdit));
    const fixSelectOption = (pruductCurrentSales: SaleModel[], all: SaleModel[]) => {
        const fixedSales = [...all];
        pruductCurrentSales.forEach(s => {
            const index = fixedSales.findIndex(ss => s._id === ss._id);
            if (index >= 0) fixedSales.splice(index, 1);
        });
        return fixedSales;
    }
    const handleOpen = () => setState(prevState => ({ ...prevState, open: true }));
    const handleClose = () => {
        if (!productToEdit._id) {
            setState(initiateState(productToEdit));
            return reset();
        }
        setState(prev => ({ ...prev, open: false, imagesToDelete: [], imagesToPost: [] }));
    };

    useEffect(() => {
        reset();
        setProductToEdit(props?.product ? props.product : new ProductModel());
        setState(initiateState(props?.product ? props.product : new ProductModel()));
        console.log(allSales);
        console.log(categories);
        
        if (sales.length === 0) salesService.getSales();
        if (categories.length === 0) productsService.getCategories();
        if (scentCategories.length === 0) productsService.getScentCategories();
    }, [props]);

    const handleScentDelete = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newState = [...productScents];
        newState.splice(+index, 1);
        setState(prevState => ({ ...prevState, productScents: newState }));
    }
    const handleSaleDelete = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newState = [...productSales];
        newState.splice(+index, 1);
        setState(prevState => ({ ...prevState, productSales: newState }));
    }
    const handleScentAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (scentToPush.length < 2) return;
        const newState = [...productScents];
        newState.push(scentToPush);
        setState(prev => ({ ...prev, productScents: newState, scentToPush: '' }));
    }
    const handleColorDelete = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const newState = [...productColors];
        newState.splice(+index, 1);
        setState(prevState => ({ ...prevState, productColors: newState }));
    }
    const handleColorAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (colorToPush.length < 2) return;
        const newState = [...productColors];
        newState.push(colorToPush);
        setState(prev => ({ ...prev, productColors: newState, colorToPush: '' }));
    }
    const handleSaleChange = (event: SelectChangeEvent) => {
        const saleToAdd = allSales.find(s => s._id === event.target.value);
        const newProductSales = [...productSales];
        if (saleToAdd) newProductSales.push(saleToAdd);
        setState(prevState => ({ ...prevState, productSales: newProductSales }))
    };


    const handleImageDelete = (event: React.MouseEvent<HTMLButtonElement>, imageName: string) => {
        const oldImages = [...productImageNames];
        const newImages = [...imagesToPost];
        const imagesToRemove = [...imagesToDelete];
        let index = oldImages.findIndex(i => i === imageName);
        if (index >= 0) {
            oldImages.splice(index, 1);
            imagesToRemove.push(imageName);
            return setState(prev => ({ ...prev, imagesToDelete: imagesToRemove, productImageNames: oldImages }));
        }
        index = newImages.findIndex(e => e.name === imageName);
        if (index >= 0) newImages.splice(index, 1);
        setState(prev => ({ ...prev, imagesToPost: newImages }));
    }

    const handleColorToPushChange = (event: React.ChangeEvent<HTMLInputElement>) => { setState(prev => ({ ...prev, colorToPush: event.target.value })) };
    const handleScentToPushChange = (event: React.ChangeEvent<HTMLInputElement>) => { setState(prev => ({ ...prev, scentToPush: event.target.value })) };
    const handleCategoryChange = (event: SelectChangeEvent) => { setState(prevState => ({ ...prevState, productCategory: event.target.value })) };
    const handleScentChange = (event: SelectChangeEvent) => { setState(prevState => ({ ...prevState, ProductScentCategory: event.target.value })) }
    const handleLevelChange = (event: SelectChangeEvent) => { setState(prevState => ({ ...prevState, productLevel: +event.target.value })) };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.files && (event.target as HTMLInputElement).files.length)) {
            const newState = [...imagesToPost];
            for (let i = 0; i < (event.target as HTMLInputElement).files.length; i++) {

                newState.push(event.target.files[i]);
            }
            setState(prev => ({ ...prev, imagesToPost: newState }))
            if (productImageNames[0] === "logo-donaroma.com") {
                const newState = [...productImageNames].splice(0, 1);
                setState(prev => ({ ...prev, productImageNames: newState }));
            }

        }
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
    const submit: SubmitHandler<ProductModel> = async data => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));
            const productToUpsert: ProductModel = { ...data };
            console.log(productToUpsert);
            productToUpsert.sales = productSales;
            productToUpsert._id = productToEdit._id;
            productToUpsert.images = productImageNames;
            productToUpsert.scents = productScents;
            productToUpsert.colors = productColors;
            productToUpsert.level = productLevel;
            productToUpsert.category = categories.find(c => productCategory === c._id);
            productToUpsert.scentCategory = productCategory === "650acfabc4c0c3b0a4da8ad3" ? scentCategories.find(c => ProductScentCategory === c._id) : null;
            const res = await productsService.upsertProduct(productToUpsert, imagesToPost, imagesToDelete);
            if (!res) return notify.error("משהו השתבש...");
            handleClose();
            setState(prev => ({ ...prev, isLoading: false, productImageNames: res?.images }));
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="ProductForm">
            <IconButton
                onClick={handleOpen}
                color={props.product ? 'info' : 'success'}
            >
                {props.product ? <Edit /> : <Add />}
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
                <Button onClick={handleClose} color='error' sx={{ maxWidth: '5%', margin: '5px' }}>X</Button>
                <DialogTitle dir="rtl">{props.product ? "עריכת מוצר" : "הוספת מוצר"}</DialogTitle>
                <DialogContent>
                    <form className="modalForm" id="product-form" noValidate onSubmit={handleSubmit(submit)} dir="rtl">
                        <TextField
                            defaultValue={productToEdit?.name}
                            margin="normal"
                            required id="name-input"
                            {...register("name")}
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                            label="שם מוצר"
                            variant="outlined" />
                        <FormControl fullWidth margin="normal" >
                            <InputLabel id="demo-simple-select-label">קטגוריה*</InputLabel>
                            <Select
                                {...register("category")}
                                value={productCategory}
                                onChange={handleCategoryChange}
                                error={errors.category ? true : false}
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="קטגוריה"
                            >
                                {categories.map((c, i) => <MenuItem dir="rtl" key={i} value={c._id}>{c.name}</MenuItem>)}

                            </Select>
                            <span style={{ direction: "ltr", fontSize: 'small', color: 'red', margin: '5px' }}>{errors.category?.message}</span>
                        </FormControl>
                        {productCategory === "650acfabc4c0c3b0a4da8ad3" &&
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-scent-label">קטגורית ריח</InputLabel>
                                <Select
                                    {...register("scentCategory")}
                                    defaultValue={productCategory}
                                    value={ProductScentCategory}
                                    onChange={handleScentChange}
                                    labelId="demo-simple-scent-label"
                                    id="demo-simple-scent"
                                    label="קטגורית ריח"
                                >
                                    {scentCategories.map((c, i) => <MenuItem dir="rtl" key={i} value={c._id}>{c.name}</MenuItem>)}

                                </Select>
                            </FormControl>
                        }
                        {ProductScentCategory && productCategory === "650acfabc4c0c3b0a4da8ad3" && <FormControl dir="rtl" margin="normal">
                            <FormLabel id="demo-row-radio-buttons-group-label">דומיננטיות</FormLabel>
                            <RadioGroup
                                value={productLevel}
                                onChange={handleLevelChange}
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"

                            >
                                <FormControlLabel value={0} control={<Radio />} label="ללא" />
                                <FormControlLabel value={1} control={<Radio />} label="1" />
                                <FormControlLabel value={2} control={<Radio />} label="2" />
                                <FormControlLabel value={3} control={<Radio />} label="3" />
                                <FormControlLabel value={4} control={<Radio />} label="4" />
                                <FormControlLabel value={5} control={<Radio />} label="5" />
                            </RadioGroup>
                        </FormControl>
                        }
                        <TextField
                            {...register("stock")}
                            defaultValue={productToEdit.stock ? productToEdit.stock : 0}
                            dir="ltr"
                            error={errors.stock ? true : false}
                            helperText={errors.stock?.message}
                            type="number"
                            margin="normal"
                            id="stock-input"
                            label="מלאי (-1 להוריד מהמדף)"
                            variant="outlined"
                        />
                        <TextField
                            {...register("sortIndex")}
                            defaultValue={productToEdit.sortIndex ? productToEdit.sortIndex : 0}
                            dir="ltr"
                            error={errors.sortIndex ? true : false}
                            helperText={errors.sortIndex?.message}
                            type="number"
                            margin="normal"
                            id="sortIndex-input"
                            label="מיקום המוצר"
                            variant="outlined"
                        />
                        <TextField
                            {...register("price")}
                            defaultValue={productToEdit.price ? productToEdit.price : 0}
                            dir="ltr"
                            error={errors.price ? true : false}
                            helperText={errors.price?.message}
                            type="number"
                            margin="normal"
                            id="price-input"
                            label="0-10,000 מחיר"
                            variant="outlined"
                        />
                        {productSales.length > 0 && <> <FormLabel id="colors-label">מבצעים קיימים </FormLabel>
                            <div className="sales-array-div">
                                {productSales.map((s, i) => <span key={i} className="form-array-child">
                                    <TextField
                                        margin="dense"
                                        value={s.name}
                                        dir="rtl"
                                        variant="outlined"
                                        disabled
                                    />
                                    <Button
                                        color="error"
                                        onClick={(e) => { handleSaleDelete(e, i) }}
                                    >
                                        <Delete />
                                    </Button>
                                </span>
                                )}
                            </div>
                        </>}
                        <FormControl fullWidth margin="normal" >
                            <InputLabel id="demo-simple-select-label">הוסף מבצע</InputLabel>
                            <Select
                                value=''
                                onChange={handleSaleChange}
                                labelId="demo-simple-select-label"
                                id="demo-sales-select"
                                label="הוסף מבצע"
                            >
                                {fixSelectOption(productSales, allSales).map((s, i) => <MenuItem dir="rtl" key={i} value={s._id}>{s.name}</MenuItem>)}

                            </Select>
                        </FormControl>
                        <div className="form-arrays-div">
                            <FormControl margin="normal" fullWidth >
                                <FormLabel id="colors-label">ריחות נוספים</FormLabel>
                                {productScents.map((e, i) =>
                                    <span key={i} className="form-array-child">
                                        <TextField
                                            margin="dense"
                                            value={e}
                                            dir="rtl"
                                            variant="outlined"
                                            disabled
                                        />
                                        <Button
                                            color="error"
                                            onClick={(e) => { handleScentDelete(e, i) }}
                                        >
                                            <Delete />
                                        </Button>
                                    </span>
                                )}
                                <span className="form-array-child">
                                    <TextField
                                        margin="normal"
                                        dir="rtl"
                                        variant="outlined"
                                        label="ריח נוסף"
                                        value={scentToPush}
                                        onChange={handleScentToPushChange}
                                    />
                                    <Button
                                        color="info"
                                        onClick={handleScentAdd}
                                    >
                                        <Add />
                                    </Button>
                                </span>
                            </FormControl>
                            <FormControl margin="normal" fullWidth >
                                <FormLabel id="scents-label">צבעים(באנגלית)</FormLabel>
                                {productColors.map((e, i) =>
                                    <span key={i} className="form-array-child">
                                        <TextField
                                            margin="dense"
                                            value={e}
                                            dir="ltr"
                                            variant="outlined"
                                            disabled
                                        />
                                        <Button
                                            color="error"
                                            onClick={(e) => { handleColorDelete(e, i) }}
                                        >
                                            <Delete />
                                        </Button>
                                    </span>
                                )}
                                <span className="form-array-child">
                                    <TextField
                                        margin="normal"
                                        dir="ltr"
                                        label="Color"
                                        variant="outlined"
                                        value={colorToPush}
                                        onChange={handleColorToPushChange}
                                    />
                                    <Button
                                        onClick={handleColorAdd}
                                        color="info"
                                    >
                                        <Add />
                                    </Button>
                                </span>
                            </FormControl>
                        </div>
                        <TextField
                            error={errors.description ? true : false}
                            helperText={errors.description?.message}
                            defaultValue={productToEdit.description ? productToEdit?.description : ''}
                            dir="rtl"
                            multiline margin="normal"
                            {...register("description")}
                            id="desc-input"
                            label="תיאור"
                            variant="outlined"
                        />

                        <FormControl margin="normal" id="imagesFormCtrl">
                            <FormLabel>תמונה</FormLabel>
                            <input type="file" onChange={handleImageChange} id="image-input" style={{ margin: '1rem' }} multiple accept="image/*" />

                            {imagesToPost.map((img, i) => <span key={i} className="productImgSpan"><Button onClick={(e) => (handleImageDelete(e, img.name))} color="error">X</Button><img width="50%" src={URL.createObjectURL(img)} alt="" /></span>)}
                            {productImageNames?.map((img, i) => img !== "logo-donaroma.webp" && <span key={i} className="productImgSpan"><Button onClick={(e) => (handleImageDelete(e, img))} color="error">X</Button><img width="50%" src={globals.productsUrl + "/img/" + img} alt="" /></span>)}
                        </FormControl>
                        <Button disabled={isLoading} type="submit" variant="contained" color="success">{isLoading ? "שולח..." : "שלח"}</Button>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default ProductForm;
