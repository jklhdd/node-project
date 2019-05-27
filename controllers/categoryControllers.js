var category = require('../models/category');
require('mongoose-pagination');

exports.getList = function (req, resp) {
    var page = req.query.page;
    var limit = req.query.limit;
    var responseData;
    category.find().where('status').ne(-1).paginate(parseInt(page), parseInt(limit),
        function (err, listData, totalItem) {
            responseData = {
                'listData': listData,
                'totalPage': Math.ceil(totalItem / limit),
                'page': page,
                'limit': limit
            };
            resp.render('admin/category/list', responseData);
        });
};

exports.create = function (req, resp) {
    var responseData = {
        'action': '/admin/category/create',
        'obj': new category()
    };
    resp.render('admin/category/form', responseData);
};

exports.save = function (req, resp) {
    var obj = new category(req.body);
    obj.save(function (err) {
        if (err) {
            return resp.status(500).send(err);
        } else {
            return resp.redirect('/admin/category/list');
        }
    });
}
exports.getDetail = function (req, resp) {
    category.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'obj': obj
            };
            resp.render('admin/category/detail', obj);
        }
    });
};

exports.edit = function (req, resp) {
    category.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'action': '/admin/category/edit/' + req.params.id,
                'obj': obj
            };
            resp.render('admin/category/form', responseData);
        }
    });
};

exports.update = function (req, resp) {
    category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: false},
        function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                resp.redirect('/admin/category/list');
            }
        });
};

exports.delete = function (req, resp) {
    category.findByIdAndUpdate(
        req.params.id,
        {
            'status': -1
        },
        {
            new: false
        },
        function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                resp.redirect('/admin/category/list');
            }
        });
};