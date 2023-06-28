import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import bannerImage from '../imagenes/bannerInicio.jpg';  // Asegúrate de cambiar esto a la ruta correcta de tu imagen
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const StyledForm = styled('form')({
  background: 'rgba(255, 255, 255, 1)',  // Un fondo blanco con opacidad del 70%.
  padding: '20px',
  borderRadius: '10px',  // Bordes redondeados.
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',  // Sombra para darle un poco de profundidad.
  opacity: 0.8
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
  const [openDialog, setOpenDialog] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isTableVisible, setIsTableVisible] = useState(false);

  const loadTasks = async (province) => {
    const response = await fetch(`http://localhost:4000/consult/${province}`);
    const data = await response.json();
    if (data.message) {
      setOpenDialog(true);
      setIsTableVisible(false); // Ocultar la tabla si se abre el diálogo
    } else {
      setTasks(data);
      setIsTableVisible(data.length > 0);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsTableVisible(false); // Ocultar la tabla cuando se cierra el diálogo
  };

  useEffect(() => {
    fetch('http://localhost:4000/country')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry !== '') {
      fetch(`http://localhost:4000/stateByCountry/${selectedCountry}`)
        .then(response => response.json())
        .then(data => setProvinces(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedProvince) {
      loadTasks(selectedProvince);
    }
  }, [selectedProvince]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setProvinces([]);
    setSelectedProvince('');
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleSearch = () => {
    if (selectedProvince) {
      loadTasks(selectedProvince);
    }
  };

  const handleUpdate = (taskId) => {
    // Lógica para actualizar la tarea con el ID proporcionado
    console.log(`Actualizar tarea con ID: ${taskId}`);
  };

  const handleDelete = (taskId) => {
    // Lógica para eliminar la tarea con el ID proporcionado
    console.log(`Eliminar tarea con ID: ${taskId}`);
  };

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


            <StyledForm>
              <Typography variant="h" color="#000080" gutterBottom component="div">
                Fitrar por provincias
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
                  <InputLabel id="country-select-label">País</InputLabel>
                  <Select
                    labelId="country-select-label"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {/* Aquí es donde mapeas los países para generar los elementos de menú */}
                    {countries.map((country, index) => (
                      <MenuItem key={index} value={country.pas_nombre.trim()}>
                        {country.pas_nombre.trim()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
                  <InputLabel id="province-select-label">Provincia</InputLabel>
                  <Select
                    labelId="province-select-label"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    {/* Y aquí es donde mapeas las provincias para generar los elementos de menú */}
                    {provinces && provinces.length > 0 ? (
                      provinces.map((province, index) => (
                        <MenuItem key={index} value={province.pro_nombre.trim()}>
                          {province.pro_nombre.trim()}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No hay provincias disponibles</MenuItem>
                    )}
                  </Select>
                  <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Advertencia"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        No se encontraron datos para la provincia seleccionada.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>

                </FormControl>
                <Button variant="contained" onClick={handleSearch}>Buscar</Button>
              </Box>

            </StyledForm>
          </Box>
        </ContentContainer>
      </StyledBannerImage>
      {isTableVisible && (
        tasks.length > 0 ? (
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
                  <StyledTableHeaderCell>Acciones</StyledTableHeaderCell>
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
                    <StyledTableCell>
                      <IconButton onClick={() => handleUpdate(task.id)} aria-label="actualizar">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(task.id)} aria-label="eliminar">
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        ) : (
          <Typography variant="h6" color="error"></Typography>
        )
      )}
    </>
  );
}
