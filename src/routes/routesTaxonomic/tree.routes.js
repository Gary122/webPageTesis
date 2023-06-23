const express = require('express');
const router = express.Router();
const pool = require("../../db");

// Devuelve todos los reinos
router.get('/reinos', async (req, res) => {
    const { rows: reinos } = await pool.query('SELECT * FROM reino');
    res.json(reinos);
});

// Devuelve todos los filos de un reino específico
router.get('/filos/:reinoId', async (req, res) => {
    const { reinoId } = req.params;
    const { rows: filos } = await pool.query('SELECT * FROM filo WHERE rei_id = $1', [reinoId]);
    res.json(filos);
});

// Devuelve todas las clases de un filo específico
router.get('/clases/:filoId', async (req, res) => {
    const { filoId } = req.params;
    const { rows: clases } = await pool.query('SELECT * FROM clase WHERE fil_id = $1', [filoId]);
    res.json(clases);
});

// Devuelve todos los ordenes de una clase específica
router.get('/ordenes/:claseId', async (req, res) => {
    const { claseId } = req.params;
    const { rows: ordenes } = await pool.query('SELECT * FROM orden WHERE cla_id = $1', [claseId]);
    res.json(ordenes);
});

// Devuelve todas las familias de un orden específico
router.get('/familias/:ordenId', async (req, res) => {
    const { ordenId } = req.params;
    const { rows: familias } = await pool.query('SELECT * FROM familia WHERE ord_id = $1', [ordenId]);
    res.json(familias);
});

// Devuelve todos los generos de una familia específica
router.get('/generos/:familiaId', async (req, res) => {
    const { familiaId } = req.params;
    const { rows: generos } = await pool.query('SELECT * FROM genero WHERE fam_id = $1', [familiaId]);
    res.json(generos);
});

// Devuelve todas las especies de un genero específico
router.get('/especies/:generoId', async (req, res) => {
    const { generoId } = req.params;
    const { rows: especies } = await pool.query('SELECT * FROM especie WHERE gen_id = $1', [generoId]);
    res.json(especies);
});

module.exports = router;
