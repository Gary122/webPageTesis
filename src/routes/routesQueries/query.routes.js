const { Router } = require('express');
const { getConsult } = require('../../controllers/controllerQueries/query.controller');



const pool = require('../../db');



const router = Router();

router.get('/consult/:provincia', getConsult)





module.exports = router;