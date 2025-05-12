import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import masterService from "../../services/credit-card/master-service";
import { toast } from "react-toastify";
import type { Master } from "../../models/master-models";
import type { UserManage } from "../../models/user-models";
import userService from "../../services/credit-card/user-service";
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [identificationTypes, setIdentificationTypeData] = useState<Master[]>([]);
    const navigate = useNavigate();
    const initialFormState = {
        identification: '',
        identificationType: 1,
        name: '',
        lastName: '',
        phone: '',
        adrress: '',
        userName: '',
        password: '',
        confirmPassword: '',
    };
    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        getIdentificationTypes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            toast.warning('Las contraseñas no coinciden');
            return;
        }
        let user: UserManage = {
            adrress: form.adrress,
            identification: form.identification,
            identificationType: form.identificationType,
            lastName: form.lastName,
            name: form.name,
            password: form.password,
            phone: form.phone,
            userName: form.userName
        };
        addUser(user);
    };
    const getIdentificationTypes = () => {
        masterService.getIdentificationTypes()
            .then(res => {
                if (res.success) {
                    setIdentificationTypeData(res.data);
                } else {
                    toast.warning(res.message);
                }
            })
            .catch(err => toast.error(err.message));
    };
    const addUser = (user: UserManage) => {
        userService.addUser(user)
            .then(res => {
                if (res.success) {
                    toast.success(res.message);
                    setForm(initialFormState);
                    navigate('/Login');
                } else {
                    toast.warning(res.message);
                }
            })
            .catch(err => toast.error(err.message));
    };


    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }} className='box-style'>
            <Typography variant="h5" gutterBottom color="black">
                Registro de usuario
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Identificación"
                            name="identification"
                            fullWidth
                            value={form.identification}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Tipo de identificación"
                            name="identificationType"
                            select
                            fullWidth
                            value={form.identificationType}
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
                            label="Nombres"
                            name="name"
                            fullWidth
                            value={form.name}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Apellidos"
                            name="lastName"
                            fullWidth
                            value={form.lastName}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Teléfono"
                            name="phone"
                            fullWidth
                            value={form.phone}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Dirección"
                            name="adrress"
                            fullWidth
                            value={form.adrress}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Email"
                            name="userName"
                            type="email"
                            placeholder="mail@mail.com"
                            fullWidth
                            value={form.userName}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            fullWidth
                            value={form.password}
                            onChange={handleChange}
                            required />
                    </Grid>
                    <Grid size={6}><TextField
                        label="Confirmar contraseña"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required /></Grid>
                </Grid>
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default UserForm;
