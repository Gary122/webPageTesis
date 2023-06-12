import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">
              <Link to="/" style={{ textDecoration: "none", color: "#eee" }}>
                Bio-Inka
              </Link>
            </Typography>
            <Box>
              <Button variant="contained" color="primary" onClick={() => navigate("/inicio/geo")} sx={{ margin: '0 10px' }}>
                Georreferenciación
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/inicio/new")} sx={{ margin: '0 10px' }}>
                Destacados
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/inicio/about")} sx={{ margin: '0 10px' }}>
                Acerca de nosotros
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/inicio/login")} sx={{ margin: '0 10px' }}>
                Log-In
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
