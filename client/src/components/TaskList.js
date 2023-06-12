import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import bannerImage from '../imagenes/bannerInicio.jpg';  // Asegúrate de cambiar esto a la ruta correcta de tu imagen
import Box from '@mui/material/Box';

const StyledBannerImage = styled('div')({
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '600px',
  width: '100%',
  opacity: 0.7,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 20px',
  color: '#FFFFFF',
  margin: '0 auto',
});

const ContentContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  '@media (max-width:600px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});


const StyledTableCell = styled(TableCell)({
  padding: '4px',
});

const StyledTableHeaderCell = styled(TableCell)({
  padding: '8px',
  backgroundColor: '#3f51b5', // Color de fondo del encabezado
  color: '#fff', // Color del texto del encabezado
  fontSize: '1.1em', // Tamaño de la fuente del encabezado
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f4f6f8', // Puedes cambiar a cualquier color que te guste.
  },
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});

const StyledTableContainer = styled(TableContainer)({
  borderRadius: '10px',  // Puedes ajustar el valor a tu gusto.
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Sombra alrededor de la tabla.
  overflow: 'auto', // Permite el desplazamiento cuando el contenido supera la altura máxima.
  maxHeight: '400px', // Ajusta esto a la altura que desees.
});

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const response = await fetch('http://localhost:4000/consult/Pichincha')
    const data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>

      <StyledBannerImage>
        <ContentContainer>
          <Box sx={{
            width: { xs: '100%', sm: '45%' }, fontSize: '1.2em', margin: '0 10px', '& p': {
              textAlign: 'justify'
            }
          }}>
            <h2>Descripción</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Box>
          <Box sx={{ width: { xs: '100%', sm: '45%' }, fontSize: '1.2em', margin: '0 10px' }}>
            <form>
              {/* Aquí va tu formulario */}
            </form>
          </Box>
        </ContentContainer>
      </StyledBannerImage>
      <StyledTableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Especie</StyledTableHeaderCell>
              <StyledTableHeaderCell>Sexo</StyledTableHeaderCell>
              <StyledTableHeaderCell>Parque Nacional </StyledTableHeaderCell>
              <StyledTableHeaderCell>Provincia</StyledTableHeaderCell>
              <StyledTableHeaderCell>Identificador</StyledTableHeaderCell>
              <StyledTableHeaderCell>Año identificado</StyledTableHeaderCell>
              <StyledTableHeaderCell>Colector</StyledTableHeaderCell>
              <StyledTableHeaderCell>Fecha colectado</StyledTableHeaderCell>
              <StyledTableHeaderCell>Metodo colectar</StyledTableHeaderCell>
              <StyledTableHeaderCell>Destino</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <StyledTableRow key={task.esp_nombre}>
                <StyledTableCell component="th" scope="row">{task.esp_nombre}</StyledTableCell>
                <StyledTableCell>{task.esp_sexo}</StyledTableCell>
                <StyledTableCell>{task.loc_parque_nacional}</StyledTableCell>
                <StyledTableCell>{task.pro_nombre}</StyledTableCell>
                <StyledTableCell>{task.ide_apellido}</StyledTableCell>
                <StyledTableCell>{task.ide_anio}</StyledTableCell>
                <StyledTableCell>{task.col_apellido}</StyledTableCell>
                <StyledTableCell>{task.col_fecha}</StyledTableCell>
                <StyledTableCell>{task.col_metodo}</StyledTableCell>
                <StyledTableCell>{task.col_destino}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
}
