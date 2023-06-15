const { Router } = require('express');
const { getAllOrden, getOrden, createOrden, deleteOrden, updateOrden, getOrdenByClase } = require('../../controllers/controllerTaxonomic/orden.controller');
const pool = require('../../db');





const router = Router();

router.get('/taxonOrden', getAllOrden)

router.get('/taxonOrdenByClase/:clase', getOrdenByClase)

router.get('/taxonOrden/:id', getOrden)

router.post('/taxonOrden', createOrden)

router.delete('/taxonOrden/:id', deleteOrden)

router.put('/taxonOrden/:id', updateOrden)


module.exports = router;