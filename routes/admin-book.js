var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookControllers');

router.get('/create', bookController.create);

router.post('/create', bookController.save);

router.get('/list', bookController.getList);

router.get('/detail/:id', bookController.getDetail);

router.get('/edit/:id', bookController.edit);

router.post('/edit/:id', bookController.update);

router.post('/delete/:id', bookController.delete);

module.exports = router;
