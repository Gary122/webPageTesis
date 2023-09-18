const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Obtener todos los reinos
router.post('/clases', async (req, res) => {
    const { cla_id, fil_id, cla_nombre } = req.body;

    try {
        await pool.query('INSERT INTO clase (cla_id, fil_id, cla_nombre) VALUES ($1, $2, $3)', [cla_id, fil_id, cla_nombre]);
        res.sendStatus(200); // Inserción exitosa
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Error en el servidor
    }
});

// Ruta para insertar en la tabla "orden"
router.post('/ordenes', async (req, res) => {
    const { ord_id, cla_id, ord_nombre } = req.body;

    try {
        await pool.query('INSERT INTO orden (ord_id, cla_id, ord_nombre) VALUES ($1, $2, $3)', [ord_id, cla_id, ord_nombre]);
        res.sendStatus(200); // Inserción exitosa
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Error en el servidor
    }
});







// Ruta para insertar en la tabla "familia"
router.post('/familias', async (req, res) => {
    const { fam_id, ord_id, gen_nombre } = req.body;

    try {
        await pool.query('INSERT INTO familia (fam_id, ord_id, gen_nombre) VALUES ($1, $2, $3)', [fam_id, ord_id, gen_nombre]);
        res.sendStatus(200); // Inserción exitosa
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Error en el servidor
    }
});

// Ruta para insertar en la tabla "genero"
router.post('/generos', async (req, res) => {
    const { gen_id, fam_id, gen_nombre } = req.body;

    try {
        await pool.query('INSERT INTO genero (gen_id, fam_id, gen_nombre) VALUES ($1, $2, $3)', [gen_id, fam_id, gen_nombre]);
        res.sendStatus(200); // Inserción exitosa
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Error en el servidor
    }
});

// Ruta para insertar en la tabla "especie"
router.post('/especies', async (req, res) => {
    const { gen_id, esp_nombre, esp_sexo } = req.body;

    try {
        // Obtener el próximo valor de esp_id
        const nextEspIdQuery = 'SELECT COALESCE(MAX(esp_id), 0) + 1 AS next_id FROM especie';
        const { rows } = await pool.query(nextEspIdQuery);
        const nextEspId = rows[0].next_id;

        // Realizar la inserción
        const insertQuery = 'INSERT INTO especie (esp_id, gen_id, esp_nombre, esp_sexo) VALUES ($1, $2, $3, $4)';
        await pool.query(insertQuery, [nextEspId, gen_id, esp_nombre, esp_sexo]);

        res.sendStatus(200); // Inserción exitosa
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Error en el servidor
    }
});

// Ruta para insertar en la tabla "localizacion"
router.post('/localizacion', async (req, res) => {
    const { loc_id, esp_id, loc_localidad, loc_parque_nacional, loc_minima_altitud, loc_maxima_altitud, loc_informacion_ecologica, loc_latitud, loc_longitud } = req.body;

    try {
        await pool.query('INSERT INTO localizacion (loc_id, esp_id, loc_localidad, loc_parque_nacional, loc_minima_altitud, loc_maxima_altitud, loc_informacion_ecologica, loc_latitud, loc_longitud) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [loc_id, esp_id, loc_localidad, loc_parque_nacional, loc_minima_altitud, loc_maxima_altitud, loc_informacion_ecologica, loc_latitud, loc_longitud]);
        res.sendStatus(200); // Inserción exitosa
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Error en el servidor
    }
});





module.exports = router;
