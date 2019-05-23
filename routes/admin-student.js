var express = require('express');
var router = express.Router();
var studentControllers = require('../controllers/studentControllers');

router.get('/create', studentControllers.create);

router.post('/create', studentControllers.validate('save'), studentControllers.save);

router.get('/list', studentControllers.getList);

router.get('/detail/:id', studentControllers.getDetail);

router.get('/edit/:id', studentControllers.edit);

router.post('/edit/:id', studentControllers.update);

router.post('/delete/:id', studentControllers.delete);

module.exports = router;
