import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Inicio from './components/Inicio';
import BusquedaPais from './components/BusquedaPais';
import Georeference from './components/Georeference';
import BusquedaTaxon from './components/BusquedaTaxon';
import LogIn from './components/LogIn'
import LoginForm from '.components/LoginForm';
import Dashboard from './components/Dashboard';
import Insertar from './components/Insertar'
import Menu from "./components/Navbar"
import Box from '@mui/material/Box';

export default function App() {
  const [linkText, setLinkText] = useState('Log-In');

  const updateLinkText = () => {
    setLinkText('Juan Araque');
  };

  return (
    <Router>
      <Menu linkText={linkText} />
      <Box>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio/busqueda" element={<BusquedaPais />} />
          <Route path="/inicio/georeferencia" element={<Georeference />} />
          <Route path="/inicio/busquedaTaxon" element={<BusquedaTaxon />} />
          <Route path="/inicio/JuanAraque" element={<Dashboard />} />
          <Route path="/inicio/JuanAraque/insertData" element={<Insertar />} />
          <Route path="/inicio/LOGIN/" element={<LoginForm />} />
          <Route
            path="/inicio/login"
            element={<LogIn onUpdateLinkText={updateLinkText} />}
          />
        </Routes>
      </Box>
    </Router>
  );
}
