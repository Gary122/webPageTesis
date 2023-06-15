const { Router } = require('express');

const pool = require('../../db');
const { getAllEspecie, getEspecie, createEspecie, deleteEspecie, updateEspecie, getEspecieByGenero } = require('../../controllers/controllerTaxonomic/especie.controller');




const router = Router();

router.get('/taxonEspecie', getAllEspecie)

router.get('/taxonEspecieByGenero/:genero', getEspecieByGenero)

router.get('/taxonEspecie/:id', getEspecie)

router.post('/taxonEspecie', createEspecie)

router.delete('/taxonEspecie/:id', deleteEspecie)

router.put('/taxonEspecie/:id', updateEspecie)

module.exports = router;