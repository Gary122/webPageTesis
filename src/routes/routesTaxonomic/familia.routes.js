const { Router } = require('express');
const pool = require('../../db');
const { getAllFamilia, getFamilia, createFamilia, deleteFamilia, updateFamilia, getFamiliaByOrden } = require('../../controllers/controllerTaxonomic/familia.controller');




const router = Router();

router.get('/taxonFamilia', getAllFamilia)

router.get('/taxonFamiliaByOrden/:orden', getFamiliaByOrden)

router.get('/taxonFamilia/:id', getFamilia)

router.post('/taxonFamilia', createFamilia)

router.delete('/taxonFamilia/:id', deleteFamilia)

router.put('/taxonFamilia/:id', updateFamilia)


module.exports = router;