import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'; // para poder navegar


export default function Navbar() {

  const navigate = useNavigate() //constante que ayuda a navegar

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{textDecoration:"none", color: "#eee"}}> 
              Bio-Inka
              </Link>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/tasks/new")}> 
              New Task
            </Button>
            

          </Toolbar>
        </Container>
      </AppBar>
    </Box>

  )
}
