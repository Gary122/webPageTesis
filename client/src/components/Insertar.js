import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from 'axios';
import { Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


const StyledForm = styled('form')({
  background: 'rgba(255, 255, 255, 1)',
  padding: '100px', // Ajusta el padding según tus necesidades
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  opacity: 0.8,
  width: '400px', // Ancho deseado
  margin: '0 auto', // Esto centrará el formulario horizontalmente
  display: 'flex',
  flexDirection: 'column', // Para que los elementos estén en una disposición vertical
  gap: '10px', // Espacio vertical entre elementos
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
  const [selectedGeneroText, setSelectedGeneroText] = useState('');


  // Especie
  const [especies, setEspecies] = useState([]);
  const [selectedEspecie, setSelectedEspecie] = useState('');

  //Sexo
  const [selectedSexo, setSelectedSexo] = useState(''); // Inicializado con una cadena vacía






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
    setSelectedGeneroText(event.target.value);
    setEspecies([]);
    setSelectedEspecie('');
  };

  const handleEspecieChange = (event) => {
    setSelectedEspecie(event.target.value);
  };


  const handleSexoChange = (event) => {
    setSelectedSexo(event.target.value);
  };
  




  // Variable para almacenar las opciones seleccionadas en una cadena
  const [selectedOptions, setSelectedOptions] = useState('');

  // ...

  const handleSearch = () => {
    // Actualizar la variable de estado con las opciones seleccionadas
    const url = `http://localhost:4000/taxonGeneroNombre/${selectedGeneroText}`;
    let resultadoGeneroId = "";

    // Realiza la solicitud HTTP utilizando fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Almacena la respuesta en una variable (por ejemplo, resultadoGenero)
        resultadoGeneroId = data.gen_id;
        // Puedes utilizar resultadoGenero como necesites en tu aplicación
        console.log("Resultado del género:", selectedGeneroText);
        console.log("Id genero:", resultadoGeneroId);

        // Ahora que tienes resultadoGeneroId, realiza la solicitud POST aquí
        const especieValue = selectedEspecie;
        console.log("Valor de la especie:", especieValue);

        console.log("sexo de la especie:", selectedSexo);

        const postData = {
          gen_id: resultadoGeneroId, // Convierte a entero si es necesario
          esp_nombre: especieValue,
          esp_sexo: selectedSexo,
        };

        // Realizar la solicitud POST a tu endpoint /especies
        return axios.post('http://localhost:4000/especies', postData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      })
      .then(response => {
        // Manejar la respuesta de la solicitud POST aquí si es necesario
        console.log("Solicitud POST exitosa:", response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (
    <>


      <StyledForm>
        <Typography variant="h" color="#000080" gutterBottom component="div">
          Filtrar por provincias
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Reino */}
          <FormControl variant="filled">
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

          {/* Filo */}
          <FormControl variant="filled">
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
                <MenuItem value="">No hay filos disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Clase */}
          <FormControl variant="filled">
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

          {/* Orden */}
          <FormControl variant="filled">
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

          {/* Familia */}
          <FormControl variant="filled">
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

          {/* Genero */}
          <FormControl variant="filled">
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

          {/* Especie */}
          <FormControl variant="filled">
            <TextField
              label="Especie"
              value={selectedEspecie}
              onChange={handleEspecieChange}
              variant="filled"
              InputLabelProps={{ shrink: true }} // Esto hará que la etiqueta se reduzca automáticamente
            />
          </FormControl>
        
          <FormControl variant="filled">
            <InputLabel id="sexo-select-label">Sexo</InputLabel>
            <Select
              labelId="sexo-select-label"
              value={selectedSexo}
              onChange={handleSexoChange}
            >
              <MenuItem value="macho">Macho</MenuItem>
              <MenuItem value="hembra">Hembra</MenuItem>
              <MenuItem value="macho/hembra">Macho/Hembra</MenuItem>
            </Select>
          </FormControl>



        </div>

        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </StyledForm>
      <Typography variant="body1" gutterBottom style={{ color: 'black' }}>
        Opciones seleccionadas: {selectedOptions}
      </Typography>

    </>
  );
}
