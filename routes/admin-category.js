var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryControllers');

router.get('/create', categoryController.create);

router.post('/create', categoryController.save);

router.get('/list', categoryController.getList);

router.get('/detail/:id', categoryController.getDetail);

router.get('/edit/:id', categoryController.edit);

router.post('/edit/:id', categoryController.update);

router.post('/delete/:id', categoryController.delete);

module.exports = router;