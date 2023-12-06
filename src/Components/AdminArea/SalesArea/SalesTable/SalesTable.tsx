import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector } from '../../../../Redux/Store';
import salesService from '../../../../Services/Sales';
import SaleModel from '../../../../Models/SaleModel';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import dayjs from 'dayjs';

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(sale: SaleModel): SaleModel {
    let info = "";
    switch (sale.type) {
        case ('percent'):
            info = sale.saleData + " אחוז הנחה";
            break;
        case ('quantity'):
            const pQuantity = sale.saleData.split('in')[0];
            const price = sale.saleData.split('in')[sale.saleData.split('in').length - 1];
            info = pQuantity + " ב - " + price;
            break;
        default:
            info = sale.saleData
    }
    const type = sale.type === 'quantity' ? 'הנחה על כמות מסוימת' : sale.type === 'percent' ? 'הנחה באחוזים' : "כמות + כמות"
    return { _id: sale._id, name: sale.name, type, saleData: info, date: sale.date };
}


export default function SalesTable() {
    const sales = useAppSelector(state => state.salesState.sales);
    const rows: SaleModel[] = [];
    React.useEffect(() => {
        if (sales.length === 0) salesService.getSales();
    }, [])
    sales.forEach(s => rows.push(createData(s)));

    return (
        <TableContainer component={Paper} sx={{ direction: 'rtl', maxWidth: '70vw' }}>
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
                            <StyledTableCell dir='ltr' align="right">{row.date ? dayjs(+row.date).format("DD/MM/YY - HH:mm") : ''}</StyledTableCell>
                            <StyledTableCell align="right"><IconButton color='error' onClick={async () => { await salesService.deleteSale(row._id) }} ><Delete /></IconButton></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}