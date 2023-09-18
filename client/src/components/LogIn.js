import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    background: {
      default: '#cfd8dc',
    },
  },
});

const IconTextField = styled(TextField)({
  // Estilos personalizados
});

function Login({ onUpdateLinkText }) {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [credencialesValidas, setCredencialesValidas] = useState(true);
  const navigate = useNavigate();

  const handleCorreoElectronicoChange = (event) => {
    setCorreoElectronico(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setContrasena(event.target.value);
  };

  const handleInicioSesionClick = () => {
    if (correoElectronico === 'jaraque@puce.edu.ec' && contrasena === 'jnc18241') {
      navigate('/inicio/JuanAraque');
      onUpdateLinkText(); // Llamada a la función pasada como prop para actualizar el texto del enlace
    } else {
      setCredencialesValidas(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ bgcolor: '#f5f5f5', py: 5, borderRadius: 2, my: 8, boxShadow: 3 }}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', mt: 5, gap: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>Iniciar sesión</Typography>
          <Typography variant="body2" align="justify" sx={{ mt: 2, mb: 2, color: '#777' }}>
            Por favor, ingrese sus credenciales para ingresar al sistema de georreferenciación.
          </Typography>
          <IconTextField
            label="Correo Electrónico"
            type="email"
            required
            value={correoElectronico}
            onChange={handleCorreoElectronicoChange}
            InputProps={{
              startAdornment: <MailOutlineIcon color="action" />,
            }}
          />
          <IconTextField
            label="Contraseña"
            type="password"
            required
            value={contrasena}
            onChange={handleContrasenaChange}
            InputProps={{
              startAdornment: <LockOutlinedIcon color="action" />,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, fontSize: '1.2rem' }}
            onClick={handleInicioSesionClick}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
