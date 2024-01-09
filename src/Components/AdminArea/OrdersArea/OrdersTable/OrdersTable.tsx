import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Table,TableBody,TableContainer,TableHead,TableRow,Paper,IconButton} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useAppSelector } from '../../../../Redux/Store';
import salesService from '../../../../Services/Sales';
import SaleModel from '../../../../Models/SaleModel';
import { Delete } from '@mui/icons-material';import "./OrdersTable.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 17,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function OrdersTable(): JSX.Element {
    const orders = useAppSelector(state => state.salesState.sales);
    const rows: SaleModel[] = [];
    // React.useEffect(() => {
    //     if (sales.length === 0) salesService.getSales();
    // }, [])
    // sales.forEach(s => rows.push(createData(s)));

    return (
        <TableContainer component={Paper} sx={{ direction: 'rtl', maxWidth: '95vw' }}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">שם</StyledTableCell>
                        <StyledTableCell align="right">סוג מבצע</StyledTableCell>
                        <StyledTableCell align="right">פירוט</StyledTableCell>
                        <StyledTableCell align="right">תוקף</StyledTableCell>
                        <StyledTableCell align="right">מחיקה</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row" align='right'>
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.type}</StyledTableCell>
                            <StyledTableCell align="right">{row.saleData}</StyledTableCell>
                            {/* <StyledTableCell dir='ltr' align="right">{row.date ? dayjs(+row.date).format("DD/MM/YY - HH:mm") : ''}</StyledTableCell> */}
                            <StyledTableCell align="right"><IconButton color='error' onClick={async () => { await salesService.deleteSale(row._id) }} ><Delete /></IconButton></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrdersTable;
