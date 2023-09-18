import React, { useState, useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Grid, Typography, Box, TextField, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Autocomplete } from '@mui/lab';

const StyledTreeItem = styled(TreeItem)(({ rootNode, hasData }) => {
  const borderColor = "gray";
  const nivelColor = "#808080"; // Color para el nivel "Reino"
  const itemColor = "#189FFF"; // Color para el nombre del elemento

  return {
    position: "relative",
    "&:before": {
      pointerEvents: "none",
      content: '""',
      position: "absolute",
      width: 32,
      left: -23,
      top: 12,
      borderBottom: !rootNode ? `1px solid ${borderColor}` : "none",
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 16,
      paddingLeft: 23,
      borderLeft: `1px solid ${borderColor}`,
    },
    "& .MuiTreeItem-content": {
      color: nivelColor,
      fontWeight: hasData ? "bold" : "inherit",
      fontSize: "30px",
    },
    "& .MuiTreeItem-iconContainer": {
      color: itemColor,
    },
    "& .MuiTreeItem-label": {
      whiteSpace: "nowrap",
    },
    "& .doi-row": {
      cursor: "text",
      userSelect: "text",
    },
    "& .doi-text": {
      display: "inline-block",
    },
  };
});

const StyledBox = styled(Box)({
  width: "90%",
  fontSize: "1.2em",
  margin: "20px auto",
  textAlign: "center",
  "& p": {
    textAlign: "justify",
    color: "#000000",
    fontFamily: "Helvetica Neue",
    margin: "20px 20px"
  },
  maxWidth: "600px",
  color: "#000000" // Cambia el color del texto a negro
});

export default function FileSystemNavigator() {
  

  const [showContent, setShowContent] = useState(false);

  const [colorNiveles, setColorNiveles] = useState({});
  const [colorItems, setColorItems] = useState({});

  const [reinos, setReinos] = useState([]);
  const [filos, setFilos] = useState([]);
  const [clases, setClases] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [familias, setFamilias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [especies, setEspecies] = useState([]);

  const [reinoElementCounts, setReinoElementCounts] = useState({});
  const [filoElementCounts, setFiloElementCounts] = useState({});
  const [claseElementCounts, setClaseElementCounts] = useState({});
  const [ordenElementCounts, setOrdenElementCounts] = useState({});
  const [familiaElementCounts, setFamiliaElementCounts] = useState({});
  const [generoElementCounts, setGeneroElementCounts] = useState({});

  const [noticias, setNoticias] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [noInvestigacionesMessage, setNoInvestigacionesMessage] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);



  const colorNivel = "#00000073"
  const colorItem = "#1890FF"
  const tamanoNivel = "15px"
  const tamanoItem = "14px"
  const tipoLetra = "Helvetica Neue"


  useEffect(() => {
    // Obtener los reinos al cargar el componente
    fetchReinos();
  }, []);

  ///////////////////////////////////   LOGICA ////////////////////////////////////////////////////////

  const fetchReinos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/reinos");
      const reinosData = response.data;

      // Asignar el nivel "Reino" y su color correspondiente
      const coloresNiveles = {};
      const coloresItems = {};
      for (const reino of reinosData) {
        coloresNiveles[reino.rei_id] = colorNivel; // Color gris para el nivel "Reino"
        coloresItems[reino.rei_id] = colorItem; // Color azul celeste para el nombre del elemento
      }

      // Obtener el número de elementos de cada reino
      const elementCounts = {};

      for (const reino of reinosData) {
        const response = await axios.get(`http://localhost:4000/filos/${reino.rei_id}`);
        const filosData = response.data;
        elementCounts[reino.rei_id] = filosData.length;
      }


      setReinos(reinosData);
      setReinoElementCounts(elementCounts);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching reinos data: ", error);
    }
  };

  const fetchFilos = async (reinoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/filos/${reinoId}`);
      const filosData = response.data;


      // Asignar el nivel "Filo" y su color correspondiente
      const coloresNiveles = {};
      const coloresItems = {};
      for (const filo of filosData) {
        coloresNiveles[filo.fil_id] = colorNivel;
        coloresItems[filo.fil_id] = colorItem;
      }


      // Obtener el número de elementos de cada filo
      const elementCounts = {};

      for (const filo of filosData) {
        const response = await axios.get(`http://localhost:4000/clases/${filo.fil_id}`);
        const clasesData = response.data;
        elementCounts[filo.fil_id] = clasesData.length;
      }

      setFilos(filosData);
      setFiloElementCounts(elementCounts);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching filos data: ", error);
    }
  };


  const fetchClases = async (filoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/clases/${filoId}`);
      const clasesData = response.data;


      // Asignar el nivel "Clase" y su color correspondiente
      const coloresNiveles = { ...colorNiveles };
      const coloresItems = { ...colorItems };
      for (const clase of clasesData) {
        coloresNiveles[clase.cla_id] = colorNivel; // Color gris para el nivel "Clase"
        coloresItems[clase.cla_id] = colorItem; // Color azul celeste para el nombre del elemento
      }

      // Obtener el número de elementos de cada clase
      const elementCounts = {};

      for (const clase of clasesData) {
        const response = await axios.get(`http://localhost:4000/ordenes/${clase.cla_id}`);
        const ordenesData = response.data;
        elementCounts[clase.cla_id] = ordenesData.length;
      }

      setClases(clasesData);
      setClaseElementCounts(elementCounts);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching clases data: ", error);
    }
  };


  const fetchOrdenes = async (claseId) => {
    try {
      const response = await axios.get(`http://localhost:4000/ordenes/${claseId}`);
      const ordenesData = response.data;


      // Asignar el nivel "Orden" y su color correspondiente
      const coloresNiveles = { ...colorNiveles };
      const coloresItems = { ...colorItems };
      for (const orden of ordenesData) {
        coloresNiveles[orden.ord_id] = colorNivel; // Color gris para el nivel "Orden"
        coloresItems[orden.ord_id] = colorItem; // Color azul celeste para el nombre del elemento
      }

      // Obtener el número de elementos de cada orden
      const elementCounts = {};

      for (const orden of ordenesData) {
        const response = await axios.get(`http://localhost:4000/familias/${orden.ord_id}`);
        const familiasData = response.data;
        elementCounts[orden.ord_id] = familiasData.length;
      }

      setOrdenes(ordenesData);
      setOrdenElementCounts(elementCounts);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching ordenes data: ", error);
    }
  };


  const fetchFamilias = async (ordenId) => {
    try {
      const response = await axios.get(`http://localhost:4000/familias/${ordenId}`);
      const familiasData = response.data;

      // Asignar el nivel "Familia" y su color correspondiente
      const coloresNiveles = { ...colorNiveles };
      const coloresItems = { ...colorItems };
      for (const familia of familiasData) {
        coloresNiveles[familia.fam_id] = colorNivel; // Color gris para el nivel "Familia"
        coloresItems[familia.fam_id] = colorItem; // Color azul celeste para el nombre del elemento
      }

      // Obtener el número de elementos de cada familia
      const elementCounts = {};

      for (const familia of familiasData) {
        const response = await axios.get(`http://localhost:4000/generos/${familia.fam_id}`);
        const generosData = response.data;
        elementCounts[familia.fam_id] = generosData.length;
      }

      setFamilias(familiasData);
      setFamiliaElementCounts(elementCounts);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching familias data: ", error);
    }
  };

  const fetchGeneros = async (familiaId) => {
    try {
      const response = await axios.get(`http://localhost:4000/generos/${familiaId}`);
      const generosData = response.data;

      // Asignar el nivel "Género" y su color correspondiente
      const coloresNiveles = { ...colorNiveles };
      const coloresItems = { ...colorItems };
      for (const genero of generosData) {
        coloresNiveles[genero.gen_id] = colorNivel; // Color gris para el nivel "Género"
        coloresItems[genero.gen_id] = colorItem; // Color azul celeste para el nombre del elemento
      }
      // Obtener el número de elementos de cada género
      const elementCounts = {};

      for (const genero of generosData) {
        const response = await axios.get(`http://localhost:4000/especies/${genero.gen_id}`);
        const especiesData = response.data;
        elementCounts[genero.gen_id] = especiesData.length;
      }

      setGeneros(generosData);
      setGeneroElementCounts(elementCounts);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching generos data: ", error);
    }
  };


  const fetchEspecies = async (generoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/especies/${generoId}`);
      const especiesData = response.data;
      // Asignar el nivel "Especie" y su color correspondiente
      const coloresNiveles = { ...colorNiveles };
      const coloresItems = { ...colorItems };
      for (const especie of especiesData) {
        coloresNiveles[especie.esp_id] = colorNivel; // Color gris para el nivel "Especie"
        coloresItems[especie.esp_id] = colorItem; // Color azul celeste para el nombre del elemento
      }

      setEspecies(response.data);
      setColorNiveles(coloresNiveles);
      setColorItems(coloresItems);
    } catch (error) {
      console.error("Error fetching especies data: ", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/country');
      const countriesData = response.data.map((country) => ({
        label: country.pas_nombre.trim(),
        value: country.pas_nombre.trim()
      }));
      setCountryOptions(countriesData);
    } catch (error) {
      console.error('Error fetching countries data:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);


  ///////////////////////////////////     EVENTOS  ////////////////////////////////////////////////////////


  const handleCountryChange = (event, value) => {
    setSelectedCountry(value);
  };

  const handleReinoClick = (event, nodeId) => {
    if (nodeId) {
      const reinoId = nodeId.split("-")[1];
      const reino = reinos.find((reino) => reino.rei_id.toString() === reinoId);
      if (reino) {
        fetchFilos(reinoId);
        setClases([]); // Reiniciar las clases cuando se cambia de reino
        setOrdenes([]);
        setFamilias([]);
        setGeneros([]);
        setEspecies([]);
      }
    }
  };

  const handleFiloClick = (event, nodeId) => {
    if (nodeId) {
      const filoId = nodeId.split("-")[1];
      const filo = filos.find((filo) => filo.fil_id.toString() === filoId);
      if (filo) {
        fetchClases(filoId);
        setOrdenes([]);
        setFamilias([]);
        setGeneros([]);
        setEspecies([]);
      }
    }
  };

  const handleClaseClick = (event, nodeId) => {
    if (nodeId) {
      const claseId = nodeId.split("-")[1];
      const clase = clases.find((clase) => clase.cla_id.toString() === claseId);
      if (clase) {
        fetchOrdenes(claseId);
        setFamilias([]);
        setGeneros([]);
        setEspecies([]);
      }
    }
  };

  const handleOrdenClick = (event, nodeId) => {
    if (nodeId) {
      const ordenId = nodeId.split("-")[1];
      const orden = ordenes.find((orden) => orden.ord_id.toString() === ordenId);
      if (orden) {
        fetchFamilias(ordenId);
        setGeneros([]);
        setEspecies([]);
      }
    }
  };

  const handleFamiliaClick = (event, nodeId) => {
    if (nodeId) {
      const familiaId = nodeId.split("-")[1];
      const familia = familias.find((familia) => familia.fam_id.toString() === familiaId);
      if (familia) {
        fetchGeneros(familiaId);
        setEspecies([]);
      }
    }
  };

  const handleGeneroClick = (event, nodeId) => {
    if (nodeId) {
      const generoId = nodeId.split("-")[1];
      const genero = generos.find((genero) => genero.gen_id.toString() === generoId);
      if (genero) {
        fetchEspecies(generoId);
      }
    }
  };

  const handleButtonClickNoticias = async () => {
    if (selectedCountry) {
      setNoticias([]);
      try {
        const countryParam = selectedCountry.value.trim();
        const url = `http://localhost:4000/noticias/${countryParam}`;
        const response = await axios.get(url);
        const noticiasData = response.data;

        if (noticiasData.length === 0) {
          setNoInvestigacionesMessage(
            "Por el momento no hay Investigaciones en nuestro sistema con el país seleccionado."
          );
        } else {
          setNoticias(noticiasData);
          setShowContent(!showContent);
          setNoInvestigacionesMessage(""); // Limpiar el mensaje si hay investigaciones
        }
      } catch (error) {
        console.error("Error fetching noticias data: ", error);
      }
    }
  };

  const handleSpeciesSearch = async (event, value) => {
    try {
      const response = await axios.get("http://localhost:4000/taxonEspecie");
      const speciesData = response.data;
      setSpeciesOptions(speciesData.map((species) => species.esp_nombre.trim()));
    } catch (error) {
      console.error("Error fetching species data: ", error);
    }
  };



  ///////////////////////////////////   RENDERS  ////////////////////////////////////////////////////////


  const renderReinos = () => {
    return reinos.map((reino) => (
      <StyledTreeItem
        key={reino.rei_id}
        nodeId={`reino-${reino.rei_id}`}
        label={
          <>
            <Typography component="span" style={{ color: colorNiveles[reino.rei_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
              Reino:
            </Typography>{" "}
            <span style={{ color: colorItems[reino.rei_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{reino.rei_nombre.trim()} ({reinoElementCounts[reino.rei_id] || 0})</span>
          </>
        }
        onClick={(event) => handleReinoClick(event, `reino-${reino.rei_id}`)}
        hasData={filos.some((filo) => filo.rei_id === reino.rei_id)}
      >
        {/* Renderizar los filos */}
        {renderFilos(reino.rei_id)}
      </StyledTreeItem>
    ));
  }

  const renderFilos = (reinoId) => {
    const filosOfReino = filos.filter((filo) => filo.rei_id === reinoId);

    return filosOfReino.map((filo) => (
      <StyledTreeItem
        key={filo.fil_id}
        nodeId={`filo-${filo.fil_id}`}
        label={
          <>
            <Typography component="span" style={{ color: colorNiveles[filo.fil_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
              Filo:
            </Typography>{" "}
            <span style={{ color: colorItems[filo.fil_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{filo.fil_nombre.trim()} ({filoElementCounts[filo.fil_id] || 0})</span>
          </>
        }
        onClick={(event) => handleFiloClick(event, `filo-${filo.fil_id}`)}
        hasData={clases.some((clase) => clase.fil_id === filo.fil_id)}
      >
        {/* Renderizar las clases */}
        {renderClases(filo.fil_id)}
      </StyledTreeItem>
    ));
  };

  const renderClases = (filoId) => {
    const clasesOfFilo = clases.filter((clase) => clase.fil_id === filoId);

    return clasesOfFilo.map((clase) => (
      <StyledTreeItem
        key={clase.cla_id}
        nodeId={`clase-${clase.cla_id}`}
        label={
          <>
            <Typography component="span" style={{ color: colorNiveles[clase.cla_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
              Clase:
            </Typography>{" "}
            <span style={{ color: colorItems[clase.cla_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{clase.cla_nombre.trim()} ({claseElementCounts[clase.cla_id] || 0})</span>
          </>
        }
        onClick={(event) => handleClaseClick(event, `clase-${clase.cla_id}`)}
        hasData={ordenes.some((orden) => orden.cla_id === clase.cla_id)}
      >
        {/* Renderizar las órdenes */}
        {renderOrdenes(clase.cla_id)}
      </StyledTreeItem>
    ));
  };

  const renderOrdenes = (claseId) => {
    const ordenesOfClase = ordenes.filter((orden) => orden.cla_id === claseId);

    return ordenesOfClase.map((orden) => (
      <StyledTreeItem
        key={orden.ord_id}
        nodeId={`orden-${orden.ord_id}`}
        label={
          <>
            <Typography component="span" style={{ color: colorNiveles[orden.ord_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
              Orden:
            </Typography>{" "}
            <span style={{ color: colorItems[orden.ord_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{orden.ord_nombre.trim()} ({ordenElementCounts[orden.ord_id] || 0})</span>
          </>
        }
        onClick={(event) => handleOrdenClick(event, `orden-${orden.ord_id}`)}
        hasData={familias.some((familia) => familia.ord_id === orden.ord_id)}
      >
        {/* Renderizar las familias */}
        {renderFamilias(orden.ord_id)}
      </StyledTreeItem>
    ));
  };

  const renderFamilias = (ordenId) => {
    const familiasOfOrden = familias.filter((familia) => familia.ord_id === ordenId);

    return familiasOfOrden.map((familia) => (
      <StyledTreeItem
        key={familia.fam_id}
        nodeId={`familia-${familia.fam_id}`}
        label={
          <>
            <Typography component="span" style={{ color: colorNiveles[familia.fam_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
              Familia:
            </Typography>{" "}
            <span style={{ color: colorItems[familia.fam_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{familia.gen_nombre.trim()}  ({familiaElementCounts[familia.fam_id] || 0})</span>
          </>
        }
        onClick={(event) => handleFamiliaClick(event, `familia-${familia.fam_id}`)}
        hasData={generos.some((genero) => genero.fam_id === familia.fam_id)}
      >
        {/* Renderizar los géneros */}
        {renderGeneros(familia.fam_id)}
      </StyledTreeItem>
    ));
  };

  const renderGeneros = (familiaId) => {
    const generosOfFamilia = generos.filter((genero) => genero.fam_id === familiaId);

    return generosOfFamilia.map((genero) => (
      <StyledTreeItem
        key={genero.gen_id}
        nodeId={`genero-${genero.gen_id}`}
        label={
          <>
            <Typography component="span" style={{ color: colorNiveles[genero.gen_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
              Género:
            </Typography>{" "}
            <span style={{ color: colorItems[genero.gen_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{genero.gen_nombre.trim()} ({generoElementCounts[genero.gen_id] || 0})</span>
          </>
        }
        onClick={(event) => handleGeneroClick(event, `genero-${genero.gen_id}`)}
        hasData={especies.some((especie) => especie.gen_id === genero.gen_id)}
      >
        {/* Renderizar las especies */}
        {renderEspecies(genero.gen_id)}
      </StyledTreeItem>
    ));
  };

  const renderEspecies = (generoId) => {
    const especiesOfGenero = especies.filter((especie) => especie.gen_id === generoId);

    return especiesOfGenero.map((especie) => (
      <StyledTreeItem
        key={especie.esp_id}
        nodeId={`especie-${especie.esp_id}`}
        label={
          <div>
            <div>
              <Typography component="span" style={{ color: colorNiveles[especie.esp_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
                Especie:
              </Typography>{" "}
              <Link
                to={`https://doi.org/${especie.ref_doi.trim()}`}
                target="_blank"
                style={{ color: colorItems[especie.esp_id], fontSize: tamanoItem, fontFamily: tipoLetra }}
              >
                {especie.esp_nombre.trim()}
              </Link>
            </div>
            <div className="doi-row">
              <Typography component="span" style={{ color: colorNiveles[especie.esp_id], fontSize: tamanoNivel, fontFamily: tipoLetra }}>
                DOI:
              </Typography>{" "}
              <span className="doi-text" style={{ color: colorItems[especie.esp_id], fontSize: tamanoItem, fontFamily: tipoLetra }}>{especie.ref_doi.trim()}</span>
            </div>
          </div>
        }
      />
    ));

  };


  ///////////////////////////////////   GRAFICA  ////////////////////////////////////////////////////////


  return (
    <Box >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Descripción */}
          <StyledBox>
            <Typography variant="h5" fontFamily="Helvetica Neue">Descripción</Typography>
            <Typography variant="body1" fontFamily="Helvetica Neue">
              Nuestro sitio web es una plataforma diseñada para facilitar la
              georreferenciación de datos de especies. Con su interfaz fácil de usar
              y su funcionalidad avanzada, permite a los investigadores,
              administradores y usuarios administrar y analizar de manera eficiente
              la información sobre especies.
            </Typography>
          </StyledBox>
        </Grid>
        <Grid item xs={12}>
          {/* Contenedor del Árbol y Trabajo académico */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <StyledBox>
                <Typography variant="h6">Árbol Filogenético</Typography>
                <Autocomplete
                  options={speciesOptions}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label="Especie" variant="outlined" />
                  )}
                  onInputChange={handleSpeciesSearch}
                />
              </StyledBox>
              {/* Árbol filogenético */}
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 240, flexGrow: 1, marginLeft: "60px" }}
              >
                {/* Renderizar los reinos */}
                {renderReinos()}
              </TreeView>
            </Grid>
            <Grid item xs={8}>
              {/* Trabajo académico */}
              <Box >
                <StyledBox>
                  <Typography variant="h6">Investigaciones</Typography>
                  {/* Contenido del trabajo académico */}

                  <Autocomplete
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Seleccionar País"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ width: '50%', fontSize: '12px' }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {params.InputProps.endAdornment}
                              <IconButton>
                                <SearchIcon onClick={handleButtonClickNoticias} />
                              </IconButton>
                            </>
                          )
                        }}
                      />
                    )}
                  />
                  <Typography variant="body2" color="error">
                    {noInvestigacionesMessage}
                  </Typography>

                  {showContent && (
                    <>
                      {noticias.map((noticia, index) => (
                        <div key={index}>
                          <Link to={`https://doi.org/${noticia.ref_doi}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" style={{ fontSize: "14px", fontWeight: "bold", color: "#333333", fontFamily: "Helvetica Neue", textTransform: "uppercase", marginBottom: "20px" }}>
                              {noticia.ref_titulo}
                            </Typography>
                          </Link>
                          <Typography variant="body1" style={{ textAlign: "justify", fontSize: "14px", color: "#666666", fontFamily: "Helvetica Neue", marginBottom: "20px" }}>
                            {noticia.ref_resumen}
                          </Typography>
                        </div>
                      ))}
                    </>
                  )}

                </StyledBox>
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  );

}
