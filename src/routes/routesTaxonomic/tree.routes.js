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

    const consult =
        "SELECT ESPECIE.ESP_ID, " +
        "ESPECIE.GEN_ID, " +
        "ESPECIE.ESP_NOMBRE, " +
        "ESPECIE.ESP_SEXO, " +
        "REFE.REF_TITULO, " +
        "REFE.REF_DOI " +
        "FROM ESPECIE " +
        "INNER JOIN ESPECIE_REFERENCIA AS ESP_REF ON ESPECIE.ESP_ID =ESP_REF.ESP_ID " +
        "INNER JOIN REFERENCIA AS REFE ON ESP_REF.REF_ID =REFE.REF_ID " +
        "WHERE GEN_ID = $1 ";


    const { generoId } = req.params;
    const { rows: especies } = await pool.query(consult, [generoId]);
    res.json(especies);
});

router.get('/noticias/:pais', async (req, res) => {

    const consult =
        "SELECT DISTINCT ON (ref_doi) referencia.ref_doi, " +
        "referencia.ref_titulo, " +
        "referencia.ref_resumen " +
        "FROM referencia " +
        "JOIN especie_referencia ON referencia.ref_id = especie_referencia.ref_id " +
        "JOIN especie ON especie_referencia.esp_id = especie.esp_id " +
        "JOIN localizacion ON especie.esp_id = localizacion.esp_id " +
        "JOIN localizacion_provincia ON localizacion.loc_id = localizacion_provincia.loc_id " +
        "JOIN provincia ON localizacion_provincia.pro_id = provincia.pro_id " +
        "JOIN pais ON provincia.pas_id = pais.pas_id " +
        "WHERE pais.pas_nombre = $1 " +
        "AND referencia.ref_doi != 'Sin DOI' " +
        "ORDER BY ref_doi ";


    const { pais } = req.params;
    const { rows: noticias } = await pool.query(consult, [pais]);
    res.json(noticias);
});

module.exports = router;
