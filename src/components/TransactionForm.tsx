import { useEffect, useState } from "react";
import transactionService from "../services/credit-card/transaction-service";
import { toast } from "react-toastify";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import type { Transaction } from "../models/transaction-models";
import { useLoading } from "./Loading/Loading";

const TransactionForm = () => {
    const [transactionList, setTransactions] = useState<Transaction[]>([]);
    const { setLoading } = useLoading();

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = () => {
        setLoading(true);
        transactionService.getTransactions()
            .then(res => {
                if (res.success) {
                    setTransactions(res.data);
                } else {
                    toast.warning(res.message);
                }
                setLoading(false);
            })
            .catch(err => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    return (
        <Box sx={{
            width: '80vw',
            height: '80vh',
            overflow: 'auto',
            p: 2,
            boxSizing: 'border-box'
        }} className='box-style'>
            <Typography variant="h5" gutterBottom color="black">
                Listado de transacciones
            </Typography>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Referencia</TableCell>
                                    <TableCell>Código de compra</TableCell>
                                    <TableCell>Alias tarjeta</TableCell>
                                    <TableCell>Valor</TableCell>
                                    <TableCell>Fecha de transacción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactionList.map(tran => (
                                    <TableRow key={tran.transactionReference}>
                                        <TableCell>{tran.transactionReference}</TableCell>
                                        <TableCell>{tran.saleCode}</TableCell>
                                        <TableCell>{tran.cardAlias}</TableCell>
                                        <TableCell>{tran.value}</TableCell>
                                        <TableCell>{tran.creationDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TransactionForm;
