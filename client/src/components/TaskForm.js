import React, { useState, useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Grid, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const StyledTreeItem = styled(TreeItem)(({ rootNode, hasData }) => {
  const borderColor = "gray";

  return {
    position: "relative",
    "&:before": {
      pointerEvents: "none",
      content: '""',
      position: "absolute",
      width: 32,
      left: -16,
      top: 12,
      borderBottom: !rootNode ? `1px dashed ${borderColor}` : "none",
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 16,
      paddingLeft: 18,
      borderLeft: `1px dashed ${borderColor}`,
    },
    "& .MuiTreeItem-content": {
      color: hasData ? "black" : "inherit",
      fontWeight: hasData ? "bold" : "inherit",
    },
    "& .MuiTreeItem-iconContainer": {
      color: hasData ? "black" : "inherit",
    },
  };
});

export default function FileSystemNavigator() {
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




  useEffect(() => {
    // Obtener los reinos al cargar el componente
    fetchReinos();
  }, []);

  const fetchReinos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/reinos");
      const reinosData = response.data;

      // Obtener el número de elementos de cada reino
      const elementCounts = {};

      for (const reino of reinosData) {
        const response = await axios.get(`http://localhost:4000/filos/${reino.rei_id}`);
        const filosData = response.data;
        elementCounts[reino.rei_id] = filosData.length;
      }

      setReinos(reinosData);
      setReinoElementCounts(elementCounts);
    } catch (error) {
      console.error("Error fetching reinos data: ", error);
    }
  };


  const fetchFilos = async (reinoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/filos/${reinoId}`);
      const filosData = response.data;

      // Obtener el número de elementos de cada filo
      const elementCounts = {};

      for (const filo of filosData) {
        const response = await axios.get(`http://localhost:4000/clases/${filo.fil_id}`);
        const clasesData = response.data;
        elementCounts[filo.fil_id] = clasesData.length;
      }

      setFilos(filosData);
      setFiloElementCounts(elementCounts);
    } catch (error) {
      console.error("Error fetching filos data: ", error);
    }
  };


  const fetchClases = async (filoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/clases/${filoId}`);
      const clasesData = response.data;

      // Obtener el número de elementos de cada clase
      const elementCounts = {};

      for (const clase of clasesData) {
        const response = await axios.get(`http://localhost:4000/ordenes/${clase.cla_id}`);
        const ordenesData = response.data;
        elementCounts[clase.cla_id] = ordenesData.length;
      }

      setClases(clasesData);
      setClaseElementCounts(elementCounts);
    } catch (error) {
      console.error("Error fetching clases data: ", error);
    }
  };


  const fetchOrdenes = async (claseId) => {
    try {
      const response = await axios.get(`http://localhost:4000/ordenes/${claseId}`);
      const ordenesData = response.data;

      // Obtener el número de elementos de cada orden
      const elementCounts = {};

      for (const orden of ordenesData) {
        const response = await axios.get(`http://localhost:4000/familias/${orden.ord_id}`);
        const familiasData = response.data;
        elementCounts[orden.ord_id] = familiasData.length;
      }

      setOrdenes(ordenesData);
      setOrdenElementCounts(elementCounts);
    } catch (error) {
      console.error("Error fetching ordenes data: ", error);
    }
  };


  const fetchFamilias = async (ordenId) => {
    try {
      const response = await axios.get(`http://localhost:4000/familias/${ordenId}`);
      const familiasData = response.data;
  
      // Obtener el número de elementos de cada familia
      const elementCounts = {};
  
      for (const familia of familiasData) {
        const response = await axios.get(`http://localhost:4000/generos/${familia.fam_id}`);
        const generosData = response.data;
        elementCounts[familia.fam_id] = generosData.length;
      }
  
      setFamilias(familiasData);
      setFamiliaElementCounts(elementCounts);
    } catch (error) {
      console.error("Error fetching familias data: ", error);
    }
  };
  
  const fetchGeneros = async (familiaId) => {
    try {
      const response = await axios.get(`http://localhost:4000/generos/${familiaId}`);
      const generosData = response.data;
  
      // Obtener el número de elementos de cada género
      const elementCounts = {};
  
      for (const genero of generosData) {
        const response = await axios.get(`http://localhost:4000/especies/${genero.gen_id}`);
        const especiesData = response.data;
        elementCounts[genero.gen_id] = especiesData.length;
      }
  
      setGeneros(generosData);
      setGeneroElementCounts(elementCounts);
    } catch (error) {
      console.error("Error fetching generos data: ", error);
    }
  };
  

  const fetchEspecies = async (generoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/especies/${generoId}`);
      setEspecies(response.data);
    } catch (error) {
      console.error("Error fetching especies data: ", error);
    }
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

  const renderReinos = () => {
    return reinos.map((reino) => (
      <StyledTreeItem
        key={reino.rei_id}
        nodeId={`reino-${reino.rei_id}`}
        label={`${reino.rei_nombre.trim()} (${reinoElementCounts[reino.rei_id] || 0})`}
        onClick={(event) => handleReinoClick(event, `reino-${reino.rei_id}`)}
        hasData={filos.some((filo) => filo.rei_id === reino.rei_id)}
        style={{ color: "#000000" }} // Cambiar el color del texto a negro
      >
        {/* Renderizar los filos */}
        {renderFilos(reino.rei_id)}
      </StyledTreeItem>
    ));
  };


  const renderFilos = (reinoId) => {
    const filosOfReino = filos.filter((filo) => filo.rei_id === reinoId);

    return filosOfReino.map((filo) => (
      <StyledTreeItem
        key={filo.fil_id}
        nodeId={`filo-${filo.fil_id}`}
        label={`${filo.fil_nombre.trim()} (${filoElementCounts[filo.fil_id] || 0})`}
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
        label={`${clase.cla_nombre.trim()} (${claseElementCounts[clase.cla_id] || 0})`}
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
        label={`${orden.ord_nombre.trim()} (${ordenElementCounts[orden.ord_id] || 0})`}
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
        label={`${familia.gen_nombre.trim()} (${familiaElementCounts[familia.fam_id] || 0})`}
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
        label={`${genero.gen_nombre.trim()} (${generoElementCounts[genero.gen_id] || 0})`}
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
        label={especie.esp_nombre.trim()}
      />
    ));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Contenedor del Árbol y Trabajo académico */}
          <Box
            border={1}
            borderColor="#333333"
            p={2}
            borderRadius={2}
            minHeight="100vh"
            display="flex"
            flexDirection="column"
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* Árbol filogenético */}
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ height: 240, flexGrow: 1 }}
                >
                  {/* Renderizar los reinos */}
                  {renderReinos()}
                </TreeView>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
