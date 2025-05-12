import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CardAdd } from "../../models/card-models";
import cardService from "../../services/credit-card/card-service";
import { toast } from "react-toastify";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import type { Master } from "../../models/master-models";
import masterService from "../../services/credit-card/master-service";
import { useLoading } from "../Loading/Loading";

const CreditCardForm = () => {
    const navigate = useNavigate();
    const [identificationTypes, setIdentificationTypeData] = useState<Master[]>([]);
    const [expiry, setExpiry] = useState('');
    const { setLoading } = useLoading();

    useEffect(() => {
        getIdentificationTypes();
    }, []);

    const initialFormState = {
        cardNumber: '',
        securityCode: '',
        expirationDate: new Date(),
        ownerIdentificationType: 10,
        ownerIdentification: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
    };
    const [form, setForm] = useState(initialFormState);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = name === 'securityCode' ? value.slice(0, 3) : value;
        setForm(prev => ({ ...prev, [name]: newValue }));
    };
    const getIdentificationTypes = () => {
        masterService.getIdentificationTypes()
            .then(res => {
                if (res.success) {
                    setIdentificationTypeData(res.data);
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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let dateArray = expiry.split('-');
        let card: CardAdd = {
            cardNumber: form.cardNumber,
            expirationDate: new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, 1),
            ownerEmail: form.ownerEmail,
            ownerIdentification: form.ownerIdentification,
            ownerIdentificationType: form.ownerIdentificationType,
            ownerName: form.ownerName,
            ownerPhone: form.ownerPhone,
            securityCode: form.securityCode.toString()
        };
        addCard(card);
    };
    const addCard = (card: CardAdd) => {
        setLoading(true);
        cardService.addCard(card)
            .then(res => {
                if (res.success) {
                    toast.success('Tarjeta agregada con éxito');
                    setForm(initialFormState);
                    navigate('/CreditCard');
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
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }} className='box-style'>
            <Typography variant="h5" gutterBottom color="black">
                Registro de tarjeta
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Número de tarjeta"
                            name="cardNumber"
                            fullWidth
                            value={form.cardNumber}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                setForm(prev => ({ ...prev, cardNumber: onlyNums }));
                            }}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            type="month"
                            label="Expiración"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)} // resultado: '2025-12'
                            required
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Código de seguridad"
                            name="securityCode"
                            type="password"
                            fullWidth
                            value={form.securityCode}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Tipo de identificación titular"
                            name="ownerIdentificationType"
                            select
                            fullWidth
                            value={form.ownerIdentificationType}
                            onChange={handleChange}>
                            {identificationTypes.map(type => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.description}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Identificación titular"
                            name="ownerIdentification"
                            fullWidth
                            value={form.ownerIdentification}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Nombre titular"
                            name="ownerName"
                            fullWidth
                            value={form.ownerName}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Email titular"
                            name="ownerEmail"
                            type="email"
                            placeholder="mail@mail.com"
                            fullWidth
                            value={form.ownerEmail}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Teléfono titular"
                            name="ownerPhone"
                            fullWidth
                            value={form.ownerPhone}
                            onChange={handleChange}
                            required />
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default CreditCardForm;
