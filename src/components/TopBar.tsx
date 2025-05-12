import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Tooltip, List } from '@mui/material';
import { AccountCircle, Checklist, CreditCard, FormatListBulleted, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const user = JSON.parse(localStorage.getItem('userData') || 'null');

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate('/Login');
        handleMenuClose();
    };

    const handleRegister = () => {
        navigate('/UserForm');
        handleMenuClose();
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            {!user ? [
                    <MenuItem onClick={handleLogin} key={0}>Iniciar sesión</MenuItem>,
                    <MenuItem onClick={handleRegister} key={1}>Registrarse</MenuItem>
             ] : [
                <MenuItem disabled key={0}>Hola, {user.fullName}</MenuItem>,
                <MenuItem onClick={handleLogin} key={1} sx={{ color: 'red', textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer' }}>Salir</MenuItem>
             ]
            }
        </Menu>
    );

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/Product')}>
                        Tienda
                    </Typography>

                    {user && (
                        <Tooltip title="Compras">
                            <IconButton color="inherit" onClick={() => navigate('/PurchaseForm')}>
                                <FormatListBulleted />
                            </IconButton>
                        </Tooltip>
                    )}

                    {user && (
                        <Tooltip title="Transacciones">
                            <IconButton color="inherit" onClick={() => navigate('/TransactionForm')}>
                                <Checklist />
                            </IconButton>
                        </Tooltip>
                    )}

                    {user && (
                        <Tooltip title="Tarjetas">
                            <IconButton color="inherit" onClick={() => navigate('/CreditCard')}>
                                <CreditCard />
                            </IconButton>
                        </Tooltip>
                    )}

                    {user && (
                        <Tooltip title="Carrito">
                            <IconButton color="inherit" onClick={() => navigate('/ShopCart')}>
                                <ShoppingCart />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Tooltip title={user ? 'Usuario' : 'Iniciar sesión o registrarse'}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleProfileMenuOpen}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Toolbar /> {/* spacer to push content below fixed AppBar */}
            {renderMenu}
        </>
    );
};

export default TopBar;
