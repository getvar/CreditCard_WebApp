import { useEffect, useState } from "react";
import type { Product } from "../models/product-models";
import productService from "../services/credit-card/product-service";
import { toast } from "react-toastify";
import cardService from "../services/credit-card/card-service";
import type { Card } from "../models/card-models";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import type { SaleAdd, SaleDetailAdd } from "../models/sale-models";
import { useNavigate } from "react-router-dom";
import saleService from "../services/credit-card/sale-service";
import { useLoading } from "./Loading/Loading";

const ShopCart = () => {
    const [productList, setProducts] = useState<Product[]>([]);
    const [productRows, setProductsFromShopCart] = useState<Product[]>([]);
    const [cardList, setCards] = useState<Card[]>([]);
    const [card, setCard] = useState('');
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    useEffect(() => {
        getProducts();
        getCards();
    }, []);

    const getProducts = () => {
        setLoading(true);
        productService.getProducts()
            .then(res => {
                if (res.success) {
                    setProducts(res.data);
                    validateProductsShopCart(res.data);
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

    const getCards = () => {
        cardService.getCards()
            .then(res => {
                if (res.success) {
                    setCards(res.data);
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

    const validateProductsShopCart = (products: Product[]) => {
        let localStorageElement = localStorage.getItem('shopCartDetail');
        let saleDetail: SaleDetailAdd[] | null = null;

        if (localStorageElement) {
            const parsed = JSON.parse(localStorageElement);
            saleDetail = Array.isArray(parsed) ? parsed : [];
        }

        if (!saleDetail || saleDetail.length <= 0) {
            toast.warning('No hay productos en el carrito');
            navigate('/Product');
        }

        let prodRows = products
            .filter(x => saleDetail?.some(sd => sd.productId === x.id))
            .map(m => {
                return {
                    ...m,
                    requiredQuantity: saleDetail!.find(sd => sd.productId === m.id)?.quantity ?? 0
                };
            });
        setProductsFromShopCart(prodRows);
    };
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(value);
    };
    const cancelPurchase = () => {
        localStorage.removeItem('shopCartDetail');
        navigate('/Product');
    };
    const confirmPurchase = () => {
        if (!card || card === '') {
            toast.warning('Debe seleccionar una tarjeta para confirmar');
            return;
        }

        let sale: SaleAdd = {
            cardId: card,
            SaleDetails: productRows.map(p => ({
                productId: p.id, quantity: p.requiredQuantity
            }))
        };
        confirmSale(sale);
    };

    const confirmSale = (sale: SaleAdd) => {
        setLoading(true);
        saleService.addSale(sale)
            .then(res => {
                if (res.success) {
                    toast.success(res.message);
                    cancelPurchase();
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
                Detalle del carrito
            </Typography>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre producto</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Precio unitario</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productRows.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.requiredQuantity}</TableCell>
                                        <TableCell>{formatCurrency(product.price)}</TableCell>
                                        <TableCell>{formatCurrency(product.requiredQuantity * product.price)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid size={12}>
                    <TextField
                        label="Tarjeta para compra"
                        name="card"
                        select
                        fullWidth
                        value={card}
                        onChange={(e) => setCard(e.target.value)}>
                        {cardList.map(type => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.alias} - Total: {formatCurrency(productRows.reduce((sum, p) => sum + p.price * p.requiredQuantity, 0))}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Box mt={3}>
                <Button variant="contained" color="error" sx={{ marginRight: '10px' }} onClick={() => cancelPurchase()}>
                    Cancelar compra
                </Button>
                <Button variant="contained" color="success" onClick={() => confirmPurchase()}>
                    Confirmar compra
                </Button>
            </Box>
        </Box>
    );
};

export default ShopCart;

