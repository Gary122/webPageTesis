import React, { useState, useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Grid, Typography, Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const StyledTreeItem = styled(TreeItem)(({ rootNode }) => {
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
      borderBottom: !rootNode ? `1px dashed ${borderColor}` : "none"
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 16,
      paddingLeft: 18,
      borderLeft: `1px dashed ${borderColor}`
    }
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
    margin: "20px 10px"
  },
  maxWidth: "250px",
  color: "#000000" // Cambia el color del texto a negro
});

const StyledTreeView = styled(TreeView)({
  "& .MuiTreeItem-content": {
    color: "#000000", // Cambiar el color del texto cuando el árbol se despliega
  },
});

export default function FileSystemNavigator() {
  const [reinos, setReinos] = useState([]);
  const [filos, setFilos] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Obtener los reinos al cargar el componente
    fetchReinos();
  }, []);

  const fetchReinos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/reinos");
      setReinos(response.data);
    } catch (error) {
      console.error("Error fetching reinos data: ", error);
    }
  };

  const fetchFilos = async (reinoId) => {
    try {
      const response = await axios.get(`http://localhost:4000/filos/${reinoId}`);
      setFilos(response.data);
    } catch (error) {
      console.error("Error fetching filos data: ", error);
    }
  };

  const handleReinoClick = (event, nodeId) => {
    if (nodeId) {
      const reinoId = nodeId.split("-")[1];
      const reino = reinos.find((reino) => reino.rei_id.toString() === reinoId);
      if (reino) {
        fetchFilos(reinoId);
      }
    }
  };

  const renderReinos = () => {
    return reinos.map((reino) => (
      <StyledTreeItem
        key={reino.rei_id}
        nodeId={`reino-${reino.rei_id}`}
        label={reino.rei_nombre.trim()}
        onClick={(event) => handleReinoClick(event, `reino-${reino.rei_id}`)}
      />
    ));
  };

  const renderFilos = () => {
    return filos.map((filo) => (
      <StyledTreeItem
        key={filo.fil_id}
        nodeId={`filo-${filo.fil_id}`}
        label={filo.fil_nombre.trim()}
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
                <StyledTreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ height: 240, flexGrow: 1 }}
                >
                  {/* Resto del árbol */}
                  {renderReinos()}
                </StyledTreeView>
              </Grid>
              <Grid item xs={8}>
                {/* Contenido del panel derecho */}
                <Typography variant="h5" component="h2">
                  Filos
                </Typography>
                {filos.length === 0 ? (
                  <Typography variant="body1">Seleccione un reino para ver los filos.</Typography>
                ) : (
                  <StyledTreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >
                    {renderFilos()}
                  </StyledTreeView>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
