const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');
const crudController = require('../controllers/crud.controller');

router.get('/fetch_from_API', dataController.fetchFromAPI);

router.post('/', crudController.createData);
router.get('/', crudController.getData);
router.get('/:id', crudController.getDataById);
router.put('/:id', crudController.updateData);
router.delete('/:id', crudController.deleteData);

module.exports = router;
