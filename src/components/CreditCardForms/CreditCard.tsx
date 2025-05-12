import { useEffect, useState } from "react";
import type { Card } from "../../models/card-models";
import { useNavigate } from "react-router-dom";
import cardService from "../../services/credit-card/card-service";
import { toast } from "react-toastify";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useLoading } from "../Loading/Loading";

const CreditCard = () => {
    const [cardList, setCards] = useState<Card[]>([]);
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    useEffect(() => {
        getCards();
    }, []);

    const getCards = () => {
        setLoading(true);
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
    const deleteCard = (card: Card) => {
        if (window.confirm(`¿Está seguro que desea eliminar la tardeta finalizada en: ${card.last4Digits}?`)) {
            setLoading(true);
            cardService.deleteCard(card.id)
                .then(res => {
                    if (res.success) {
                        toast.success('Tarjeta eliminada con éxito');
                        getCards();
                    } else {
                        toast.warning(res.message);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err.message);
                    setLoading(false);
                });
        }
    };
    const goAddCard = () => {
        navigate('/CreditCardForm');
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
                Tarjetas de crédito
            </Typography>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Alias</TableCell>
                                    <TableCell>Últimos 4 dígitos</TableCell>
                                    <TableCell>Banco</TableCell>
                                    <TableCell>Franquicia</TableCell>
                                    <TableCell>Fecha de vencimiento</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cardList.map(card => (
                                    <TableRow key={card.id}>
                                        <TableCell>{card.alias}</TableCell>
                                        <TableCell>{card.last4Digits}</TableCell>
                                        <TableCell>{card.bank}</TableCell>
                                        <TableCell>{card.franchise}</TableCell>
                                        <TableCell>{card.expirationDate}</TableCell>
                                        <TableCell><IconButton color="inherit" onClick={() => deleteCard(card)}>
                                            <Delete />
                                        </IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Box mt={3}>
                <Button variant="contained" color="success" onClick={() => goAddCard()}>
                    Agregar nueva tarjeta
                </Button>
            </Box>
        </Box>
    );
}

export default CreditCard;