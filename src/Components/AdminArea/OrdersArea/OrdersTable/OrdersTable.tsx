import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useAppSelector } from '../../../../Redux/Store';
import { Delete, DoneAll } from '@mui/icons-material';
import "./OrdersTable.css";
import { Link } from 'react-router-dom';
import ordersService from '../../../../Services/Orders';
import dayjs from 'dayjs';
import productsService from '../../../../Services/Products';

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
    const orders = useAppSelector(state => state.ordersState.orders);
    const products = useAppSelector(state => state.productsState.products);
    const [doneFilter, setDoneFilter] = React.useState(false);

    React.useEffect(() => {
        if (orders.length === 0) ordersService.getOrders();
        if (products.length === 0) productsService.getProducts();
    }, [orders, products, doneFilter]);

    const handleChange = (event: React.MouseEvent<HTMLElement>, filter: boolean) => {
        setDoneFilter(filter);
    };
    return (
        <>
            <ToggleButtonGroup
                dir='rtl'
                color="primary"
                value={doneFilter}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{marginTop:'1rem'}}
            >
                <ToggleButton value={false}>הזמנות ממתינות</ToggleButton>
                <ToggleButton value={true}>הזמנות שהסתיימו </ToggleButton>
            </ToggleButtonGroup>
            <TableContainer component={Paper} sx={{ direction: 'rtl', maxWidth: '95vw', margin: '1rem' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">מספר הזמנה</StyledTableCell>
                            <StyledTableCell align="right">מוצרים </StyledTableCell>
                            <StyledTableCell align="right">איש קשר</StyledTableCell>
                            <StyledTableCell align="right">משלוח</StyledTableCell>
                            <StyledTableCell align="right">תאריך הזמנה</StyledTableCell>
                            <StyledTableCell align="right">סיום הזמנה</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length > 0 && products.length > 0 && orders.map((order, i) => {
                            console.log(orders);
                            
                            if (order.done === doneFilter || (!order.done && !doneFilter)) return (
                                <StyledTableRow key={i}>
                                    <StyledTableCell component="th" scope="row" align='right' sx={{ userSelect: 'text' }}>
                                        {order.orderNumber}
                                    </StyledTableCell>
                                    <StyledTableCell align="right"><ol>{order.items.map((e, i) => <li style={{ color: 'blue' }} key={i}><Link to={"/specs/" + e.productId}>{products.find(p => p._id === e.productId).name + (e.color ? " - " + e.color : '') + (e.scent ? " - " + e.scent : '') + " - X" + e.quantity}</Link></li>)}</ol></StyledTableCell>
                                    <StyledTableCell align="right">{order.fullName}<br />{order.email}<br />{order.phone}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        {order.deliveryType === 'express' ? 'אקספרס עד 3 ימי עסקים' : order.deliveryType === 'regular' ? 'רגיל עד 8 ימי עסקים' : 'איסוף עצמי'}
                                        <br />
                                        {`${order.street} ${order.streetNum} ${order.city}`}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{dayjs(+order.orderDate).format("DD/MM/YY - HH:mm")}</StyledTableCell>

                                    {!order.done && <StyledTableCell align="right">
                                        <IconButton color='success' onClick={async () => {
                                            const newOrder = { ...order }
                                            newOrder.done = true;
                                            await ordersService.updateOrder(newOrder)
                                        }} >
                                            סיום&nbsp;< DoneAll />
                                        </IconButton>
                                        <br />
                                        <IconButton color='error' onClick={async () => { await ordersService.deleteOrder(order._id) }} >
                                            מחיקה&nbsp;<Delete />
                                        </IconButton>
                                    </StyledTableCell>}
                                    {order.done && <StyledTableCell align="right">ההזמנה הסתיימה בהצלחה</StyledTableCell>}
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default OrdersTable;
