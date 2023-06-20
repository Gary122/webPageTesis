const { Router } = require('express');

const pool = require('../../db');
const { getTreeTaxos } = require('../../controllers/controllerTaxonomic/treeTaxonomic.controller');







const router = Router();

router.get('/taxonTree', getTreeTaxos)



module.exports = router;