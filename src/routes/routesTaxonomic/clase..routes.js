const { Router } = require('express');

const pool = require('../../db');
const { getAllClase, getClase, createClase, deleteClase, updateClase, getClaseByFilo } = require('../../controllers/controllerTaxonomic/clase.controller');




const router = Router();

router.get('/taxonClase', getAllClase)

router.get('/taxonClaseByFilo/:filo', getClaseByFilo)

router.get('/taxonClase/:id', getClase)

router.post('/taxonClase', createClase)

router.delete('/taxonClase/:id', deleteClase)

router.put('/taxonClase/:id', updateClase)


module.exports = router;

