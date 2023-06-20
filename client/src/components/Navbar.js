import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    backgroundColor: '#fcfcfc',
    color: '#333',
    borderBottom: '1px solid #ddd',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra en la parte inferior del navbar
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 rem',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#333',
    fontFamily: 'Helvetica Neue',
  },

  logoText: {
    fontFamily: 'Helvetica Neue', // Tipo de letra para el texto del logo
  },

  navLinks: {
    display: 'flex',
    gap: '1rem',
  },
  navLink: {
    fontSize: '1rem',
    color: '#777777',
    textDecoration: 'none',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.3s ease',
    fontFamily: 'Helvetica Neue', 
  },
  navLinkHover: {
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.navbarContainer}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar className={classes.navbar}>
            <Typography variant="h6" component={Link} to="/" className={classes.logo}>
            <span className={classes.logoText}>Bio-Inka</span>
            </Typography>
            <Box className={classes.navLinks}>
              <Link to="/inicio/geo" className={`${classes.navLink} ${classes.navLinkHover}`}>Georreferenciación</Link>
              <Link to="/inicio/iniciova" className={`${classes.navLink} ${classes.navLinkHover}`}>Destacados</Link>
              <Link to="/inicio/about" className={`${classes.navLink} ${classes.navLinkHover}`}>Acerca de nosotros</Link>
              <Link to="/inicio/login" className={`${classes.navLink} ${classes.navLinkHover}`}>Log-In</Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
