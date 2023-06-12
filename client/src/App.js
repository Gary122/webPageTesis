import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Georeference from './components/Georeference'
import Menu from "./components/Navbar"
import Box from '@mui/material/Box';

export default function App() {
  
  return (
    <BrowserRouter>   
      <Menu/>
      <Box>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/inicio/geo" element={<Georeference />} /> // Asegúrate de usar el mismo nombre aquí también
          <Route path="/inicio/login" element={<TaskForm />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
