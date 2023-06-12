import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa los componentes de react-leaflet
import 'leaflet/dist/leaflet.css'; // Importa el CSS de Leaflet
import { Icon } from 'leaflet';

import { styled } from "@mui/system";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import bannerImage from '../imagenes/bannerInicio.jpg';  // Asegúrate de cambiar esto a la ruta correcta de tu imagen
import { Box, FormControl, InputLabel, Select, MenuItem, Typograph } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

document.body.style.height = '100vh';
document.getElementById('root').style.height = '100%';

const myIcon = new Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',  // Reemplaza esto con la URL de tu propio icono
    iconSize: [50, 82],  // Ajusta estos números para cambiar el tamaño de los iconos
    iconAnchor: [25, 82],
});

const ContentContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Esto hará que el contenedor tenga el 100% de la altura de la pantalla
    boxSizing: 'border-box',
});

const MapAndTableContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100vh', // Esto hará que el contenedor tenga el 50% de la altura de la pantalla
    '@media (max-width:600px)': {
        flexDirection: 'column',
    },
    width: '100%', // Asegura que el contenedor ocupa todo el ancho disponible
    boxSizing: 'border-box', // Asegura que los márgenes y el relleno no añaden al ancho total
});



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
    height: '100vh', // Ajusta esto a la altura que desees.
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



    return (
        <>

            <ContentContainer>

                <Box sx={{ width: '100%', fontSize: '1.2em', margin: '0', boxSizing: 'border-box' }}>


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
                <MapAndTableContainer>
                    <Box sx={{ width: { xs: '100%', sm: '50%' }, fontSize: '1.2em', boxSizing: 'border-box', height: '100%' }}>
                        {tasks.length > 0 && (
                            <MapContainer center={[tasks[0].loc_latitud, tasks[0].loc_longitud]} zoom={13} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {tasks.map((task, index) => (
                                    <Marker key={index} position={[task.loc_latitud, task.loc_longitud]} icon={myIcon}>
                                        <Popup>
                                            {task.esp_nombre}
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        )}
                    </Box>

                    {isTableVisible && (
                        tasks.length > 0 ? (
                            <StyledTableContainer component={Paper} sx={{ width: { xs: '100%', sm: '50%' }, margin: '0', boxSizing: 'border-box', height: '100%' }}>
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
                                            <StyledTableHeaderCell>Latitud</StyledTableHeaderCell>
                                            <StyledTableHeaderCell>Longitud</StyledTableHeaderCell>
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
                                                <StyledTableCell>{task.loc_latitud}</StyledTableCell>
                                                <StyledTableCell>{task.loc_longitud}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        ) : (
                            <Typography variant="h6" color="error"></Typography>
                        )
                    )}
                </MapAndTableContainer>

            </ContentContainer>


        </>
    );
}