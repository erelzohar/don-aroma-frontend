import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import ProductModel from '../../../../Models/ProductModel';
import CategoryModel from '../../../../Models/CategoryModel';
import { Delete, StarBorder, Grade } from '@mui/icons-material';
import productsService from '../../../../Services/Products';
import globals from '../../../../Services/Globals';
import ProductForm from '../ProductForm/ProductForm';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAppSelector } from '../../../../Redux/Store';
import SaleModel from '../../../../Models/SaleModel';

interface Column {
    id: 'name' | 'price' | 'sales' | 'stock' | 'category' | 'sortIndex' | 'images' | 'scents' | 'colors' | 'description' | 'level' | 'scentCategory';
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'right' | 'center';
    format?: (value: any) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'שם', minWidth: 200 },
    {
        id: 'price',
        label: 'מחיר',
        minWidth: 50,
        format: (value: number) => value.toLocaleString()
    },
    {
        id: 'sales',
        label: 'מבצעים',
        minWidth: 100,
        format: (value: SaleModel[]) => {
            let string = '';
            value.forEach(v => string = string + v.name + (value.length > 1 ? ', ' : ''));
            return string;
        }
    },
    {
        id: 'stock',
        label: 'מלאי',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value?.toString()
    },
    {
        id: 'category',
        label: 'קטגוריה',
        minWidth: 170,
        align: 'right',
        format: (value: CategoryModel) => { if ("name" in value) return value.name; }

    },
    {
        id: 'sortIndex',
        label: 'מיקום בקטגוריה',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value?.toString()

    },
    {
        id: 'images',
        label: 'תמונה',
        align: 'right',
        minWidth: 170,
        format: (imageNames: string[]) => imageNames[0]
    },
    {
        id: 'scents',
        label: 'ריחות נוספים',
        minWidth: 170,
        align: 'right',
        format: (scents: string[]) => {
            let str = "";
            scents.forEach(s => { str = str + s + ',\n' });
            return str;
        }
    },
    {
        id: 'colors',
        label: 'צבע',
        minWidth: 170,
        align: 'right',
        format: (colors: string[]) => {
            let str = "";
            colors.forEach(c => { str = str + c + ',\n' });
            return str;
        }
    },
    {
        id: 'description',
        label: 'תיאור',
        minWidth: 170,
        align: 'right'
    },
    {
        id: 'scentCategory',
        label: 'קטגורית ריח',
        minWidth: 100,
        align: 'right',
        format: (value: CategoryModel) => value.name
    },
    {
        id: 'level',
        label: 'דומיננטיות',
        maxWidth: 100,
        align: 'right',
        format: (value: number) => value.toLocaleString()
    }
];

interface TableProps {
    products: ProductModel[];
}

function ProductsTable(props: TableProps): JSX.Element {
    const categories = useAppSelector(state => state.productsState.categories);
    const [rows, setRows] = React.useState(props.products ? [...props.products] : []);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setIsLoading] = React.useState(false);
    const [filter, setFilter] = React.useState(1);
    const [categoryFilter, setCategoryFilter] = React.useState('');

    React.useEffect(() => {
        let products = [...props.products];
        if (categoryFilter !== '') products = products.filter(p => p.category._id === categoryFilter);

        products = products.filter(r => {
            if (filter === 1) return true;
            return r.stock === filter;
        })
        if (categoryFilter !== '') products.sort((a, b) => {
            if (!a.sortIndex && b.sortIndex) {
                return 1;
            } else if (a.sortIndex && !b.sortIndex) {
                return -1;
            } else if (!a.sortIndex && !b.sortIndex) {
                return 0;
            }
            return a.sortIndex - b.sortIndex;
        });
        setRows(products);

    }, [props, filter, categoryFilter])
    const handleChange = (event: React.MouseEvent<HTMLElement>, filterNum: number) => {
        setFilter(filterNum);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const product = { ...rows.find(e => e._id === event.target.id) }
        product.isRecommended = event.target.checked;
        await productsService.upsertProduct(product, null);
        setIsLoading(false);
    }

    return (
        <Paper sx={{ width: '98%', overflow: 'hidden', direction: "rtl", margin: "1rem auto auto auto" }}>
            <div style={{ display: "flex" }} className="upper-settings">
                <ProductForm />
                <ToggleButtonGroup
                    color="primary"
                    value={filter}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value={0}>לא במלאי</ToggleButton>
                    <ToggleButton value={1}>כל המוצרים</ToggleButton>
                    <ToggleButton value={-1}>מוסתרים</ToggleButton>
                </ToggleButtonGroup>
                <FormControl sx={{ minWidth: '100px', maxHeight: '40px', margin: '0.5rem', alignSelf: 'stretch' }} >
                    <InputLabel id="demo-simple-scent-label">קטגוריה</InputLabel>
                    <Select
                        variant='standard'
                        value={categoryFilter}
                        onChange={(e) => { setCategoryFilter(e.target.value) }}
                        labelId="demo-simple-scent-label"
                        id="demo-simple-scent"
                        label="קטגוריה"
                    >
                        <MenuItem value=''>ללא</MenuItem>
                        {categories.map((c, i) => <MenuItem key={i} value={c._id}>{c.name}</MenuItem>)}

                    </Select>
                </FormControl>
            </div>

            <TableContainer>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell
                                    key={column.id + i}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontSize: "medium", maxWidth: column.maxWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id + i}>
                                        {columns.map((column, j) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={j + column.id} align={column.align} >
                                                    <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        {column.id === 'name' && <span style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <Checkbox disabled={isLoading} checked={row.isRecommended} onChange={handleCheckboxChange} id={row._id} color='warning' icon={<StarBorder />} checkedIcon={<Grade />} />
                                                            <span style={{ display: "flex", maxHeight: "60px" }}>
                                                                <IconButton color="error" type="submit" onClick={async () => { await productsService.deleteProduct(row._id) }}><Delete /></IconButton>
                                                                <ProductForm product={row} />
                                                            </span></span>}
                                                        {column.id === 'images' && value && <span><img style={{ width: "25%" }} src={globals.productsUrl + "/img/" + column.format(value)} alt="" /></span>}
                                                        {column.id === 'images' ? "" : column.format && value ? column.format(value) : !value ? <span> &#9940;</span> : value as string}
                                                    </span>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                dir='ltr'
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default ProductsTable;
