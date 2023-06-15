import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { } from '@mui/material';
import { Button, Typography , Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const StyledForm = styled('form')({
  background: 'rgba(255, 255, 255, 1)',  // Un fondo blanco con opacidad del 70%.
  padding: '20px',
  borderRadius: '10px',  // Bordes redondeados.
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',  // Sombra para darle un poco de profundidad.
  opacity: 0.8

});

export default function TaxonomicList() {
  const [openDialog, setOpenDialog] = useState(false);

  const [setTaxonomic] = useState([]);
  const [reino, setReino] = useState([]);
  const [selectedReino, setSelectedReino] = useState('');
  const [filos, setFilos] = useState([]);
  const [selectedFilos, setSelectedFilos] = useState('');

  const loadTaxos = async (filo) => {
    const response = await fetch(`http://localhost:4000/consult/${filo}`);
    const data = await response.json();
    if (data.message) {
      setOpenDialog(true);
    } else {
      setTaxonomic(data);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);

  };

  useEffect(() => {
    fetch('http://localhost:4000/taxonReino')
      .then(response => response.json())
      .then(data => setReino(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (selectedReino !== '') {
      fetch(`http://localhost:4000/taxonFiloByReino/${selectedReino}`)
        .then(response => response.json())
        .then(data => setFilos(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedReino]);

  useEffect(() => {
    if (selectedFilos) {
      loadTaxos(selectedFilos);
    }
  }, [selectedFilos]);

  const handleCountryChange = (event) => {
    setSelectedReino(event.target.value);
    setFilos([]);
    setSelectedFilos('');
  };

  const handlefiloChange = (event) => {
    setSelectedFilos(event.target.value);
  };

  const handleSearch = () => {
    if (selectedFilos) {
      loadTaxos(selectedFilos);
    }
  };



  return (
    <>
       <StyledForm>
              <Typography variant="h" color="#000080"  gutterBottom component="div">
                Fitrar por provincias
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
                  <InputLabel id="reino-select-label">Reino</InputLabel>
                  <Select
                    labelId="reino-select-label"
                    value={selectedReino}
                    onChange={handleCountryChange}
                  >
                    {/* Aquí es donde mapeas los países para generar los elementos de menú */}
                    {reino.map((reino, index) => (
                      <MenuItem key={index} value={reino.rei_nombre.trim()}>
                        {reino.rei_nombre.trim()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
                  <InputLabel id="filo-select-label">Filo</InputLabel>
                  <Select
                    labelId="filo-select-label"
                    value={selectedFilos}
                    onChange={handlefiloChange}
                  >
                    {/* Y aquí es donde mapeas las provincias para generar los elementos de menú */}
                    {filos && filos.length > 0 ? (
                      filos.map((filo, index) => (
                        <MenuItem key={index} value={filo.fil_nombre.trim()}>
                          {filo.fil_nombre.trim()}
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
    </>
  );
}