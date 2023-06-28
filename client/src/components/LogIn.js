import React from 'react';
import { TextField, Button, Typography, Box, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    background: {
      default: '#cfd8dc',  // Color de fondo de la página
    },
  },
});

const IconTextField = styled(TextField)({
  '& .MuiInputLabel-outlined': {
    fontSize: '1rem',
  },
  '& .MuiOutlinedInput-input': {
    fontSize: '1rem',
    backgroundColor: '#f5f5f5',  // Color de fondo de los campos de entrada
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f5f5f5',  // Color del borde cuando el campo está enfocado
  },
});

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ bgcolor: '#f5f5f5', py: 5, borderRadius: 2, my: 8, boxShadow: 3 }}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', mt: 5, gap: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>Iniciar sesión</Typography>
          <Typography variant="body2" align="justify" sx={{ mt: 2, mb: 2, color: '#777' }}>
            Por favor, ingrese sus credencial para ingresar al sistema de georreferenciación
          </Typography>
          <IconTextField
            label="Correo Electrónico"
            type="email"
            required
            InputProps={{
              startAdornment: <MailOutlineIcon color="action" />,
            }}
          />
          <IconTextField
            label="Contraseña"
            type="password"
            required
            InputProps={{
              startAdornment: <LockOutlinedIcon color="action" />,
            }}
          />
          
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, fontSize: '1.2rem' }}>
            Iniciar sesión
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
