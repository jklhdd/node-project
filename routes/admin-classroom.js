var express = require('express');
var router = express.Router();
var ClassroomRouter = require('../controllers/classControllers');

router.get('/create', ClassroomRouter.create);

router.post('/create', ClassroomRouter.save);

router.get('/list', ClassroomRouter.getList);

router.get('/detail/:id', ClassroomRouter.getDetail);

router.get('/edit/:id', ClassroomRouter.edit);

router.post('/edit/:id', ClassroomRouter.update);

router.post('/delete/:id', ClassroomRouter.delete);

module.exports = router;