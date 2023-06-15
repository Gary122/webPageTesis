const { Router } = require('express');
const { getAllReinos, getReino, createReino, deleteReino, updateReino } = require('../../controllers/controllerTaxonomic/reino.controller');
const pool = require('../../db');




const router = Router();

router.get('/taxonReino', getAllReinos)

router.get('/taxonReino/:id', getReino)

router.post('/taxonReino', createReino)

router.delete('/taxonReino/:id', deleteReino)

router.put('/taxonReino/:id', updateReino)


module.exports = router;