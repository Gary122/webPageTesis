const { Router } = require('express');




const pool = require('../../db');
const { getAllState, getStates, createState, deleteState, updateState, getStateByCountry } = require('../../controllers/controllerMundo/states.controller');


const router = Router();

router.get('/state', getAllState)

router.get('/stateByCountry/:pais', getStateByCountry)

router.get('/state/:id', getStates)

router.post('/state', createState)

router.delete('/state/:id', deleteState)

router.put('/state/:id', updateState)


module.exports = router;

