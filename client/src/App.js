import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Menu from "./components/Navbar"
import Box from '@mui/material/Box';

export default function App() {
  
  return (
    <BrowserRouter>   
      <Menu/>
      <Box>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
