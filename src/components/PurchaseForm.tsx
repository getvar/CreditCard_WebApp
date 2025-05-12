import { useNavigate } from "react-router-dom";
import type { Sale } from "../models/sale-models";
import { useEffect, useState } from "react";
import saleService from "../services/credit-card/sale-service";
import { toast } from "react-toastify";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const PurchaseForm = () => {
    const [saleList, setSales] = useState<Sale[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSales();
    }, []);

    const getSales = () => {
        saleService.getSales()
            .then(res => {
                if (res.success) {
                    setSales(res.data);
                } else {
                    toast.warning(res.message);
                }
            })
            .catch(err => toast.error(err.message));
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
                Listado de compras
            </Typography>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código compra</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Valor total</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Cantidad de productos</TableCell>
                                    <TableCell>Tarjeta</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {saleList.map(sale => (
                                    <TableRow key={sale.id}>
                                        <TableCell>{sale.saleCode}</TableCell>
                                        <TableCell>{sale.creationDate}</TableCell>
                                        <TableCell>{sale.totalValue}</TableCell>
                                        <TableCell>{sale.state}</TableCell>
                                        <TableCell>{sale.productQuantity}</TableCell>
                                        <TableCell>{sale.cardAlias}</TableCell>
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

export default PurchaseForm;
