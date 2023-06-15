const { Router } = require('express');
const { getAllFilo, getFilo, createFilo, deleteFilo, updateFilo, getFiloByReino } = require('../../controllers/controllerTaxonomic/filo.controller');
const pool = require('../../db');





const router = Router();

router.get('/taxonFilo', getAllFilo)

router.get('/taxonFiloByReino/:reino', getFiloByReino)

router.get('/taxonFilo/:id', getFilo)

router.post('/taxonFilo', createFilo)

router.delete('/taxonFilo/:id', deleteFilo)

router.put('/taxonFilo/:id', updateFilo)


module.exports = router;