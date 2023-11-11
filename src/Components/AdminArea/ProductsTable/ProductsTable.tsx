import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Checkbox } from '@mui/material';
import ProductModel from '../../../Models/ProductModel';
import CategoryModel from '../../../Models/CategoryModel';
import { Delete, StarBorder, Grade } from '@mui/icons-material';
import productsService from '../../../Services/Products';
import globals from '../../../Services/Globals';
import ProductForm from '../ProductForm/ProductForm';

interface Column {
    id: 'name' | 'price' | 'category' | 'images' | 'scents' | 'colors' | 'description' | 'level' | 'scentCategory';
    label: string;
    minWidth?: number;
    maxWidth?: number;
    align?: 'right';
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
        id: 'category',
        label: 'קטגוריה',
        minWidth: 170,
        align: 'right',
        format: (value: CategoryModel) => { if ("name" in value) return value.name; }

    },
    {
        id: 'images',
        label: 'תמונה',
        align: 'right',
        minWidth: 170,
        format:(imageNames:string[])=>imageNames[0]
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

    const rows = [...props.products]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
        const product = { ...rows.find(e => e._id === event.target.id) }
        product.isRecommended = event.target.checked;
        await productsService.upsertProduct(product, null);

    }

    return (
        <Paper sx={{ width: '98%', overflow: 'hidden', direction: "rtl", margin: "1rem auto auto auto" }}>
            <ProductForm />
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
                                                            <Checkbox checked={row.isRecommended ? true : false} onChange={handleCheckboxChange} id={row._id} color='warning' icon={<StarBorder />} checkedIcon={<Grade />} />
                                                            <span style={{ display: "flex", maxHeight: "60px" }}>
                                                                <Button color="error" type="submit" onClick={async () => { await productsService.deleteProduct(row._id) }}><Delete /></Button>
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
