import { useEffect, useState } from "react";
import productService from "../../services/credit-card/product-service";
import type { Product } from "../../models/product-models";
import { toast } from "react-toastify";
import { Box, IconButton, Card, CardContent, CardMedia, Grid, TextField, Typography, Tooltip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { SaleDetailAdd } from "../../models/sale-models";
import { useLoading } from "../Loading/Loading";

const ProductForm = () => {
    const [productList, setProducts] = useState<Product[]>([]);
    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === productId ? { ...p, requiredQuantity: newQuantity } : p
            )
        );
    };
    const { setLoading } = useLoading();


    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);
        productService.getProducts()
            .then(res => {
                if (res.success) {
                    setProducts(res.data);
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
    const validateAddProduct = (product: Product) => {
        if (!product.requiredQuantity || product.requiredQuantity <= 0) {
            toast.warning('Debe agregar al menos una unidad del producto');
            return;
        }

        let localStorageElement = localStorage.getItem('shopCartDetail');
        let saleDetail: SaleDetailAdd[] | null = null;
        localStorage.removeItem('shopCartDetail');
        let detail: SaleDetailAdd = {
            productId: product.id, quantity: product.requiredQuantity
        };

        if (localStorageElement) {
            const parsed = JSON.parse(localStorageElement);
            saleDetail = Array.isArray(parsed) ? parsed : [];
        }

        saleDetail ??= [];
        let element = saleDetail.find(x => x.productId === product.id);

        if (element) {
            element.quantity += detail.quantity;
        } else {
            saleDetail.push(detail);
        }

        localStorage.setItem('shopCartDetail', JSON.stringify(saleDetail));
        toast.success('Producto agregado al carrito!');
    };

    return (
        <Box sx={{ border: 'none', outline: 'none' }} className='box-style'>
            <Typography variant="h5" gutterBottom color="black">
                Listado de productos
            </Typography>
            <Grid container spacing={2}>
                {productList.map(product => (
                    <Grid size={4} key={product.id}>
                        <Card sx={{
                            maxWidth: 345,
                            maxHeight: 300,
                            height: '100%',
                            display: 'flex'
                        }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.imageUrl}
                                alt={product.reference}
                                sx={{ objectFit: 'contain' }}
                            />
                            <CardContent>
                                <Typography gutterBottom component="div">
                                    {product.name}
                                </Typography>
                                <Typography gutterBottom component="div">
                                    {product.strPrice}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={8}>
                                        <TextField
                                            id="outlined-number"
                                            label="Cantidad"
                                            type="number"
                                            value={product.requiredQuantity ?? 0}
                                            onChange={(e) =>
                                                handleQuantityChange(product.id, parseInt(e.target.value))
                                            }
                                            size="small"
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={4}>
                                        <Tooltip title="Agregar al carrito">
                                            <IconButton color="primary" aria-label="Agregar al carrito" onClick={() => validateAddProduct(product)} >
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default ProductForm;


