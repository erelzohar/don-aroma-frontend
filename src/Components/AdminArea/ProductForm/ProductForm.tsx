import "./ProductForm.css";
import jwtAxios from "../../../Services/JwtAxios";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProductModel from "../../../Models/ProductModel";
import notify from "../../../Services/Notify";
import globals from "../../../Services/Globals";
import store from "../../../Redux/Store";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import productsService from "../../../Services/Products";
import CategoryModel from "../../../Models/CategoryModel";
import { Add, Delete, Edit } from "@mui/icons-material";


interface ProductFormProps {
    product?: ProductModel;
}


const schema = yup
    .object()
    .shape({
        name: yup.string().min(2).max(100).required(),
        category: yup.string().required(),
        description: yup.string(),
        price: yup.number().min(0).max(10000),
        color: yup.string(),
        scentCategory: yup.string()
    })

interface InitialState {
    productCategory: string
    ProductScentCategory: string
    productScents: string[]
    productColors: string[]
    productLevel: number
    categories: CategoryModel[]
    scentCategories: CategoryModel[]
    open: boolean
    productImage?: File
}
function ProductForm(props: ProductFormProps): JSX.Element {
    const productToEdit = props?.product ? props.product : new ProductModel();
    const initialState: InitialState = {
        productCategory: productToEdit.category ? productToEdit.category._id : '',
        ProductScentCategory: productToEdit.scentCategory ? productToEdit.scentCategory._id : '',
        productLevel: productToEdit.level ? productToEdit.level : 0,
        productScents: productToEdit.scents ? productToEdit.scents : [],
        productColors: productToEdit.colors ? productToEdit.colors : [],
        categories: store.getState().productsState.categories,
        scentCategories: store.getState().productsState.scentCategories,
        open: false
    }
    const [{ productCategory, productScents, productColors, ProductScentCategory, productLevel, categories, scentCategories, open, productImage }, setState] = useState(initialState);
    const handleOpen = () => setState(prevState => ({ ...prevState, open: true }));
    const handleClose = () => {
        setState(initialState);
        reset();
    };
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (categories.length === 0) productsService.getCategories().then(res => { setState(prevState => ({ ...prevState, categories: res })) });
        if (scentCategories.length === 0) productsService.getScentCategories().then(res => { setState(prevState => ({ ...prevState, scentCategories: res })) });
    }, [])

    const handleCategoryChange = (event: SelectChangeEvent) => { setState(prevState => ({ ...prevState, productCategory: event.target.value })) };
    const handleScentChange = (event: SelectChangeEvent) => { setState(prevState => ({ ...prevState, ProductScentCategory: event.target.value })) }
    const handleLevelChange = (event: SelectChangeEvent) => { setState(prevState => ({ ...prevState, productLevel: +event.target.value })) };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target.files && (event.target as HTMLInputElement).files.length)) {
            if (imgRef.current) {
                var fr = new FileReader();
                fr.onload = function () {
                    imgRef.current.src = (fr.result as string);
                }
                fr.readAsDataURL(event.target.files[0]);
            }
            setState(prevState => ({ ...prevState, productImage: (event.target as HTMLInputElement).files[0] }))
        }
    };
    const { register, handleSubmit, reset, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
    const submit: SubmitHandler<ProductModel> = async data => {
        try {
            const productToUpsert: ProductModel = { ...data };
            if (productToEdit._id) {
                productToUpsert._id = productToEdit._id;
                if (productToEdit.imageName) {
                    productToUpsert.imageName = productToEdit.imageName;
                }
            }
            productToUpsert.level = productLevel;
            productToUpsert.category = new CategoryModel(({ _id: productCategory } as CategoryModel))
            if (ProductScentCategory) productToUpsert.scentCategory = new CategoryModel(({ _id: ProductScentCategory } as CategoryModel))
            await productsService.upsertProduct(productToUpsert, productImage);
            // const formData = ProductModel.convertToFormData(productToUpsert, productImage);
            // const res = await jwtAxios.post<ProductModel>(globals.productsUrl, formData);
            handleClose();

            // if (productToEdit._id) {
            //     store.dispatch(updateProduct(res.data));
            //     return notify.success('!המוצר עודכן בהצלחה');
            // }
            // store.dispatch(addProduct(res.data));
            // notify.success('!המוצר נוסף בהצלחה');
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="ProductForm">
            <Button
                onClick={handleOpen}
                variant='contained'
                color={props.product ? 'info' : 'success'}
            >
                {props.product ? <Edit /> : <Add />}
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
                <Button onClick={handleClose} variant='contained' color='error' sx={{ maxWidth: '5%', margin: '5px' }}>X</Button>
                <DialogTitle>{props.product ? "עריכת מוצר" : "הוספת מוצר"}</DialogTitle>
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
                                {categories.map((c, i) => <MenuItem key={i} value={c._id}>{c.name}</MenuItem>)}

                            </Select>
                            <span style={{ direction: "ltr", fontSize: 'small', color: 'red', margin: '5px' }}>{errors.category?.message}</span>
                        </FormControl>
                        {productCategory === "650acfabc4c0c3b0a4da8ad3" &&
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-scent-label">קטגורית ריח</InputLabel>
                                <Select
                                    {...register("scentCategory")}
                                    value={ProductScentCategory}
                                    onChange={handleScentChange}
                                    labelId="demo-simple-scent-label"
                                    id="demo-simple-scent"
                                    label="קטגורית ריח"
                                >
                                    {scentCategories.map((c, i) => <MenuItem key={i} value={c._id}>{c.name}</MenuItem>)}

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
                        <div className="form-arrays-div">
                            <FormControl margin="normal" fullWidth >
                                <FormLabel id="colors-label">ריחות נוספים</FormLabel>
                                {productScents.map((e, i) =>
                                    <span key={i} className="form-array-child">
                                        <TextField
                                            value={e}
                                            dir="rtl"
                                            label="ריח נוסף"
                                            variant="outlined"
                                        />
                                        <Button
                                            color="error"
                                        >
                                            <Delete />
                                        </Button>
                                    </span>
                                )}
                                <span className="form-array-child">
                                    <TextField
                                        margin="none"
                                        dir="rtl"
                                        label="ריח נוסף"
                                        variant="outlined"
                                    />
                                    <Button
                                        color="info"
                                    >
                                        <Add />
                                    </Button>
                                </span>
                            </FormControl>
                            <FormControl margin="normal" fullWidth >
                                <FormLabel id="scents-label">צבעים</FormLabel>
                                {productColors.map((e, i) =>
                                    <span key={i} className="form-array-child">
                                        <TextField

                                            value={e}
                                            dir="rtl"
                                            label="ריח נוסף"
                                            variant="outlined"
                                        />
                                        <Button
                                            color="error"
                                        >
                                            <Delete />
                                        </Button>
                                    </span>
                                )}
                                <span className="form-array-child">
                                    <TextField
                                        margin="none"
                                        dir="rtl"
                                        label="הוסף צבע"
                                        variant="outlined"
                                    />
                                    <Button
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

                        <FormControl margin="normal" >
                            <FormLabel>תמונה</FormLabel>
                            <input type="file" onChange={handleImageChange} id="image-input" style={{ margin: '1rem' }} multiple={false} accept="image/*" />
                            {productToEdit?.imageName ? <img width="50%" src={globals.productsUrl + "/img/" + productToEdit?.imageName} ref={imgRef} alt="" /> : <img width="50%" src="" alt="" ref={imgRef} />}
                        </FormControl>
                        <Button type="submit" variant="contained" color="success">שלח</Button>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default ProductForm;
