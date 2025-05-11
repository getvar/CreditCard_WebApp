import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { UserLogin, UserLoginResponse } from "../../models/auth-models";
import authService from "../../services/credit-card/auth-service";
import { toast } from "react-toastify";
import '../Login/Login.css';

const Login: React.FC = () => {
    // Estado para los campos del formulario
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userName || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        setError(null);
        let loginData: UserLogin = {
            password: password,
            userName: userName
        }
        sendData(loginData);
    };

    const sendData = (loginData: UserLogin) => {
        authService.login(loginData)
            .then(res => {
                if (res.success) {
                    toast.success(res.message);
                    showLoginResponse(res.data);
                } else {
                    toast.warning(res.message);
                }
            })
            .catch(err => toast.error(err.message));
    }

    const showLoginResponse = (data: UserLoginResponse) => {
        console.log('DATOS DE RESPUESTA', data);
    }

    return (
        <Box className='box-style'>
            <Typography variant="h5" align="center" gutterBottom color="black">
                Iniciar Sesión
            </Typography>
            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Nombre de usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="userName"
                    required
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Ingresar
                </Button>
            </form>
        </Box>
    );
};

export default Login;