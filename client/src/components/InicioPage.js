import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledForm = styled('form')({
  background: 'rgba(255, 255, 255, 1)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  opacity: 0.8
});

export default function TaxonomicList() {
  const [openDialog, setOpenDialog] = useState(false);
  const [setTaxonomic] = useState([]);

  // Reino
  const [reino, setReino] = useState([]);
  const [selectedReino, setSelectedReino] = useState('');

  // Filo
  const [filos, setFilos] = useState([]);
  const [selectedFilos, setSelectedFilos] = useState('');

  // Clase
  const [clases, setClases] = useState([]);
  const [selectedClase, setSelectedClase] = useState('');

  // Orden
  const [ordenes, setOrdenes] = useState([]);
  const [selectedOrden, setSelectedOrden] = useState('');

  // Familia
  const [familias, setFamilias] = useState([]);
  const [selectedFamilia, setSelectedFamilia] = useState('');

  // Genero
  const [generos, setGeneros] = useState([]);
  const [selectedGenero, setSelectedGenero] = useState('');

  // Especie
  const [especies, setEspecies] = useState([]);
  const [selectedEspecie, setSelectedEspecie] = useState('');

  const loadTaxos = async (especie) => {
    const response = await fetch(`http://localhost:4000/consult/${especie}`);
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
    if (selectedFilos !== '') {
      fetch(`http://localhost:4000/taxonClaseByFilo/${selectedFilos}`)
        .then(response => response.json())
        .then(data => setClases(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedFilos]);

  useEffect(() => {
    if (selectedClase !== '') {
      fetch(`http://localhost:4000/taxonOrdenByClase/${selectedClase}`)
        .then(response => response.json())
        .then(data => setOrdenes(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedClase]);

  useEffect(() => {
    if (selectedOrden !== '') {
      fetch(`http://localhost:4000/taxonFamiliaByOrden/${selectedOrden}`)
        .then(response => response.json())
        .then(data => setFamilias(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedOrden]);

  useEffect(() => {
    if (selectedFamilia !== '') {
      fetch(`http://localhost:4000/taxonGeneroByFamilia/${selectedFamilia}`)
        .then(response => response.json())
        .then(data => setGeneros(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedFamilia]);

  useEffect(() => {
    if (selectedGenero !== '') {
      fetch(`http://localhost:4000/taxonEspecieByGenero/${selectedGenero}`)
        .then(response => response.json())
        .then(data => setEspecies(data))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedGenero]);

  useEffect(() => {
    if (selectedEspecie) {
      loadTaxos(selectedEspecie);
    }
  }, [selectedEspecie]);

  const handleReinoChange = (event) => {
    setSelectedReino(event.target.value);
    setFilos([]);
    setSelectedFilos('');
    setClases([]);
    setSelectedClase('');
    setOrdenes([]);
    setSelectedOrden('');
    setFamilias([]);
    setSelectedFamilia('');
    setGeneros([]);
    setSelectedGenero('');
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleFiloChange = (event) => {
    setSelectedFilos(event.target.value);
    setClases([]);
    setSelectedClase('');
    setOrdenes([]);
    setSelectedOrden('');
    setFamilias([]);
    setSelectedFamilia('');
    setGeneros([]);
    setSelectedGenero('');
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleClaseChange = (event) => {
    setSelectedClase(event.target.value);
    setOrdenes([]);
    setSelectedOrden('');
    setFamilias([]);
    setSelectedFamilia('');
    setGeneros([]);
    setSelectedGenero('');
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleOrdenChange = (event) => {
    setSelectedOrden(event.target.value);
    setFamilias([]);
    setSelectedFamilia('');
    setGeneros([]);
    setSelectedGenero('');
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleFamiliaChange = (event) => {
    setSelectedFamilia(event.target.value);
    setGeneros([]);
    setSelectedGenero('');
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleGeneroChange = (event) => {
    setSelectedGenero(event.target.value);
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleEspecieChange = (event) => {
    setSelectedEspecie(event.target.value);
  };

  const handleSearch = () => {
    if (selectedEspecie) {
      loadTaxos(selectedEspecie);
    }
  };

  return (
    <>
      <StyledForm>
        <Typography variant="h" color="#000080" gutterBottom component="div">
          Fitrar por provincias
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px' }}>


          {/* Tao reino*/}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="reino-select-label">Reino</InputLabel>
            <Select
              labelId="reino-select-label"
              value={selectedReino}
              onChange={handleReinoChange}
            >
              {reino.map((reino, index) => (
                <MenuItem key={index} value={reino.rei_nombre.trim()}>
                  {reino.rei_nombre.trim()}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          {/* Taxo filo */}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="filo-select-label">Filo</InputLabel>
            <Select
              labelId="filo-select-label"
              value={selectedFilos}
              onChange={handleFiloChange}
            >
              {filos && filos.length > 0 ? (
                filos.map((filo, index) => (
                  <MenuItem key={index} value={filo.fil_nombre.trim()}>
                    {filo.fil_nombre.trim()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay filos disponobles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/*Taxo clase */}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="clase-select-label">Clase</InputLabel>
            <Select
              labelId="clase-select-label"
              value={selectedClase}
              onChange={handleClaseChange}
            >
              {clases && clases.length > 0 ? (
                clases.map((clase, index) => (
                  <MenuItem key={index} value={clase.cla_nombre.trim()}>
                    {clase.cla_nombre.trim()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay clases disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Taxo orden*/}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="orden-select-label">Orden</InputLabel>
            <Select
              labelId="orden-select-label"
              value={selectedOrden}
              onChange={handleOrdenChange}
            >
              {ordenes && ordenes.length > 0 ? (
                ordenes.map((orden, index) => (
                  <MenuItem key={index} value={orden.ord_nombre.trim()}>
                    {orden.ord_nombre.trim()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay ordenes disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Taxo familia */}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="familia-select-label">Familia</InputLabel>
            <Select
              labelId="familia-select-label"
              value={selectedFamilia}
              onChange={handleFamiliaChange}
            >
              {familias && familias.length > 0 ? (
                familias.map((familia, index) => (
                  <MenuItem key={index} value={familia.gen_nombre.trim()}>
                    {familia.gen_nombre.trim()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay familias disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Taxo genero */}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="genero-select-label">Genero</InputLabel>
            <Select
              labelId="genero-select-label"
              value={selectedGenero}
              onChange={handleGeneroChange}
            >
              {generos && generos.length > 0 ? (
                generos.map((genero, index) => (
                  <MenuItem key={index} value={genero.gen_nombre.trim()}>
                    {genero.gen_nombre.trim()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay provincias disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Taxo especie */}
          <FormControl variant="filled" sx={{ minWidth: 120, margin: '0 10px' }}>
            <InputLabel id="especie-select-label">Especie</InputLabel>
            <Select
              labelId="especie-select-label"
              value={selectedEspecie}
              onChange={handleEspecieChange}
            >
              {especies && especies.length > 0 ? (
                especies.map((especie, index) => (
                  <MenuItem key={index} value={especie.esp_nombre.trim()}>
                    {especie.esp_nombre.trim()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No hay especies disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Box>
      </StyledForm>
    </>
  );
}
