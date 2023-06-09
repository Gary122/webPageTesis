const { Router } = require('express');
const { getAllCountries, getCountry, createCountry, deleteCountry, updateCountry } = require('../../controllers/controllerMundo/countries.controller');



const pool = require('../../db');


const router = Router();

router.get('/country', getAllCountries)

router.get('/country/:id', getCountry)

router.post('/country', createCountry)

router.delete('/country/:id', deleteCountry)

router.put('/country/:id', updateCountry)


module.exports = router;