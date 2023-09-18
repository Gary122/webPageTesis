import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Typography, Paper, Container, CssBaseline, Box, Link, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ScienceIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import SaveIcon from '@mui/icons-material/Save';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.black,
    border: '1px solid #ddd',
    padding: '0.5rem',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#ffffff',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#f5f5f5',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: '0 5px',
}));

const users = [
    { id: 1, name: 'Juan Araque', email: 'jaraque129@puce.edu.ec', avatar: 'https://example.com/avatar1.jpg' },
    { id: 2, name: 'Usuario Puce', email: 'usuario@puce.edu.ec', avatar: 'https://example.com/avatar2.jpg' },
    { id: 3, name: 'Usuario Puce', email: 'usuario@puce.edu.ec', avatar: 'https://example.com/avatar3.jpg' },
    { id: 4, name: 'Usuario Puce', email: 'usuario@puce.edu.ec', avatar: 'https://example.com/avatar4.jpg' },
    { id: 5, name: 'Usuario Puce', email: 'usuario@puce.edu.ec', avatar: 'https://example.com/avatar5.jpg' },
];

const theme = createTheme({
    typography: {
        fontFamily: 'Helvetic', // Cambia "Roboto, sans-serif" por la fuente que desees
    },
});

function RoleAssignment() {

    const navigate = useNavigate();


    useEffect(() => {
        // Obtener el estado almacenado en la caché
        const cachedButtonState = localStorage.getItem("buttonState");

        // Verificar si existe un estado almacenado
        if (cachedButtonState) {
            // Parsear el estado almacenado en formato JSON
            const parsedButtonState = JSON.parse(cachedButtonState);

            // Actualizar el estado de los botones según el estado almacenado
            const newButtonColors = parsedButtonState.map((state) => (state ? "secondary" : "primary"));
            setButtonColors(newButtonColors);
        }
    }, []);


    const [buttonColors, setButtonColors] = useState(Array(users.length * 3).fill("primary"));

    const handleClick = (index) => {
        const newButtonColors = [...buttonColors];
        newButtonColors[index] = newButtonColors[index] === "primary" ? "secondary" : "primary";
        setButtonColors(newButtonColors);
    };

    const handleGuardarClick = () => {
        // Obtener el estado actual de los botones
        const buttonState = buttonColors.map((color) => (color === "primary" ? false : true));

        // Guardar el estado de los botones en la caché
        localStorage.setItem("buttonState", JSON.stringify(buttonState));

        console.log("Cambios guardados");
    };


    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    {/* Tabla a la izquierda */}
                    {/* ... código existente ... */}
                    <Box sx={{ width: '20%' }}>
                        <Box display="flex" flexDirection="column" alignItems="center" sx={{ py: 2, my: 2 }} >
                            <Avatar alt={users[0].name} src={users[0].avatar} sx={{ width: 150, height: 150, mb: 1 }} />
                            <Typography variant="subtitle1" align="center" fontWeight="bold">Rol: Administrador {users[0].role}</Typography>
                            <Typography variant="subtitle1" align="center" fontWeight="bold">Nombre: {users[0].name}</Typography>
                            <Typography variant="subtitle1" align="center" fontWeight="bold">Correo: {users[0].email}</Typography>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Typography variant="subtitle1" align="center">
                                <Link onClick={() => navigate('/inicio/JuanAraque/insertData')} href="#">Administrar Especies</Link>
                            </Typography>

                            <Typography variant="subtitle1" align="center">
                                <Link to="/asignacion-roles">Asignación de Roles</Link>
                            </Typography>
                            <Typography variant="subtitle1" align="center">
                                <Link to="/eliminar-usuarios">Eliminar Usuarios</Link>
                            </Typography>
                        </Box>
                    </Box>

                    {/* Tabla a la derecha */}
                    <Container component="main" maxWidth="lg" sx={{ py: 2, my: 2, boxShadow: 3 }}>
                        <CssBaseline />

                        {/* ... código existente ... */}
                        <Typography variant="h5" align="center" gutterBottom>Asignación de Roles</Typography>

                        <Typography variant="body1" gutterBottom>
                            Se ha implementado la funcionalidad de asignación de roles en el sistema, brindando a los administradores la capacidad de asignar roles específicos a los usuarios. Los roles disponibles son:
                        </Typography>

                        <ul>
                            <li>
                                <Typography variant="body1" component="span" fontWeight="bold">Administrador:</Typography> este rol tiene acceso completo a todas las características y funcionalidades del sistema. Como administrador, serías responsable de administrar las cuentas de los usuarios, asignar funciones y permisos, y realizar tareas administrativas, como copias de seguridad de datos y mantenimiento del sistema.
                            </li>
                            <li>
                                <Typography variant="body1" component="span" fontWeight="bold">Investigador:</Typography> este rol tendría acceso a las funciones de administración de datos del sistema, incluida la capacidad de agregar, modificar y eliminar datos de insectos.
                            </li>
                            <li>
                                <Typography variant="body1" component="span" fontWeight="bold">Técnico:</Typography> este rol sería responsable de administrar los componentes de hardware y software del sistema. Como técnico, usarías las funciones de monitoreo y resolución de problemas del sistema para garantizar que el sistema funcione sin problemas y para abordar cualquier problema que surja.
                            </li>
                        </ul>

                        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Usuarios</StyledTableCell>
                                        <StyledTableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Email</StyledTableCell>
                                        <StyledTableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', fontFamily: 'Helvetica Neue' }}>Asignar Rol</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell component="th" scope="row" style={{ fontFamily: 'Helvetica Neue' }}>
                                                {/* ... código existente ... */}
                                            </StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'Helvetica Neue' }}>{user.email}</StyledTableCell>
                                            <StyledTableCell style={{ fontFamily: 'Helvetica Neue' }}>
                                                <ButtonGroup variant="text" aria-label="outlined primary button group">
                                                    <StyledButton startIcon={<SupervisorAccountIcon />} variant={buttonColors[index * 3] === "primary" ? "outlined" : "contained"} color="primary" onClick={() => handleClick(index * 3)}>Administrador</StyledButton>
                                                    <StyledButton startIcon={<ScienceIcon />} variant={buttonColors[index * 3 + 1] === "primary" ? "outlined" : "contained"} color="primary" onClick={() => handleClick(index * 3 + 1)}>Investigador</StyledButton>
                                                    <StyledButton startIcon={<BuildIcon />} variant={buttonColors[index * 3 + 2] === "primary" ? "outlined" : "contained"} color="primary" onClick={() => handleClick(index * 3 + 2)}>Técnico</StyledButton>
                                                </ButtonGroup>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ marginTop: '2px', marginBottom: '1px', float: 'right' }} onClick={handleGuardarClick}>Guardar</Button>
                        </TableContainer>
                    </Container>
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default RoleAssignment;
