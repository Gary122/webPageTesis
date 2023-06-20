import React, { useState } from 'react';
import { Button, ButtonGroup, Typography, Paper, Container, CssBaseline, Box, Link } from '@mui/material';
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
  { id: 1, name: 'Juan Araque', email: 'jaraque129@puce.edu.ec' },
  { id: 2, name: 'Usuario Puce', email: 'usuario@puce.edu.ec' },
  { id: 3, name: 'Usuario Puce', email: 'usuario@puce.edu.ec' },
  { id: 4, name: 'Usuario Puce', email: 'usuario@puce.edu.ec' },
  { id: 5, name: 'Usuario Puce', email: 'usuario@puce.edu.ec' },
];

const theme = createTheme();

function RoleAssignment() {
  const [buttonColors, setButtonColors] = useState(Array(users.length * 3).fill("primary"));

  const handleClick = (index) => {
    const newButtonColors = [...buttonColors];
    newButtonColors[index] = newButtonColors[index] === "primary" ? "secondary" : "primary";
    setButtonColors(newButtonColors);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
       
        <Container component="main" maxWidth="md" sx={{ py: 5, my: 8, boxShadow: 3 }}>
          <CssBaseline />
          <Typography variant="h5" align="center" gutterBottom>Asignación de Roles</Typography>
          <TableContainer component={Paper} sx={{backgroundColor: 'transparent'}}>
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
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ fontFamily: 'Helvetica Neue' }}> {user.email}</StyledTableCell>
                    <StyledTableCell style={{ fontFamily: 'Helvetica Neue' }}>
                      <ButtonGroup variant="text" aria-label="outlined primary button group">
                        <StyledButton startIcon={<SupervisorAccountIcon />} variant={buttonColors[index*3] === "primary" ? "outlined" : "contained"} color="primary" onClick={() => handleClick(index*3)}>Administrador</StyledButton>
                        <StyledButton startIcon={<ScienceIcon />} variant={buttonColors[index*3+1] === "primary" ? "outlined" : "contained"} color="primary" onClick={() => handleClick(index*3+1)}>Investigador</StyledButton>
                        <StyledButton startIcon={<BuildIcon />} variant={buttonColors[index*3+2] === "primary" ? "outlined" : "contained"} color="primary" onClick={() => handleClick(index*3+2)}>Técnico</StyledButton>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="contained" color="primary" startIcon={<SaveIcon />} style={{ marginTop: '2px', marginBottom: '1px', float: 'right' }}>Guardar</Button>
          </TableContainer>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default RoleAssignment;
