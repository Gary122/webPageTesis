import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio';
import BusquedaPais from './components/BusquedaPais';
import Georeference from './components/Georeference';
import BusquedaTaxon from './components/BusquedaTaxon';
import LogIn from './components/LogIn'
import Menu from "./components/Navbar"
import Box from '@mui/material/Box';

export default function App() {
  
  return (
    <BrowserRouter>   
      <Menu/>
      <Box>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio/busqueda" element={<BusquedaPais />} /> // Asegúrate de usar el mismo nombre aquí también
          <Route path="/inicio/georeferencia" element={<Georeference />} /> 
          <Route path="/inicio/busquedaTaxon" element={<BusquedaTaxon />} /> 
          <Route path="/inicio/login" element={<LogIn />} /> 
          <Route path="/inicio/georeferencia" element={<Georeference />} /> 
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

