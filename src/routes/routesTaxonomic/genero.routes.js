const { Router } = require('express');
const { getAllGenero, getGenero, getGenNombre ,createGenero, deleteGenero, updateGenero, getGeneroByFamilia } = require('../../controllers/controllerTaxonomic/genero.controller');
const pool = require('../../db');

const router = Router();

router.get('/taxonGenero', getAllGenero)

router.get('/taxonGeneroByFamilia/:familia', getGeneroByFamilia)

router.get('/taxonGenero/:id', getGenero)

router.get('/taxonGeneroNombre/:genero_nombre', getGenNombre)

router.post('/taxonGenero', createGenero)

router.delete('/taxonGenero/:id', deleteGenero)

router.put('/taxonGenero/:id', updateGenero)

module.exports = router;

