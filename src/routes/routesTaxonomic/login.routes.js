const express = require('express');
const router = express.Router();
const pool = require("../../db");

router.post('/api/login', async (req, res) => {
    const { usuario, contraseña } = req.body;
  
    try {
      const query = 'SELECT 1 FROM pg_user WHERE usename = $1 AND passwd = $2;';
      const { rowCount } = await pool.query(query, [usuario, contraseña]);
  
      if (rowCount > 0) {
        res.json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      }
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  });
  


module.exports = router;
