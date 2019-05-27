var book = require('../models/book');
require('mongoose-pagination');
const { check, validationResult } = require('express-validator/check');

exports.validate = function(method){
    switch (method){
        case 'save':{
            return [
                check('name', 'Name is required!').exists(),
                check('price', 'Invalid price').exists(),
            ]
        }
    }
}

exports.getList = function (req, resp) {
    var page = req.query.page;
    var limit = req.query.limit;
    var responseData;
    book.find().where('status').ne(-1).paginate(parseInt(page), parseInt(limit),
        function (err, listData, totalItem) {
            responseData = {
                'listData': listData,
                'totalPage': Math.ceil(totalItem / limit),
                'page': page,
                'limit': limit
            };
            resp.render('admin/book/list', responseData);
        });
};

exports.create = function (req, resp) {
    var responseData = {
        'action': '/admin/book/create',
        'obj': new book()
    };
    resp.render('admin/book/form', responseData);
};

exports.save = function (req, resp) {
    var obj = new book(req.body);
    if (req.files && req.files.image) {
        var fileGettingUploaded = req.files.image.data;
        cloudinary.uploader
            .upload_stream(function (error, result) {
                var imageUrl = result.url;
                obj.imageUrl = imageUrl;
                obj.save(function (err) {
                    if (err) {
                        return resp.status(500).send(err);
                    } else {
                        return resp.redirect('/admin/book/list');
                    }
                });

                console.log(cloudinary.image(result.public_id, {format: "jpg", crop: "fill", width: 120, height: 80}));
            }).end(fileGettingUploaded);
    }else{
        obj.imageUrl = 'https://www.touchtaiwan.com/images/default.jpg';
        obj.save(function (err) {
            if (err) {
                return resp.status(500).send(err);
            } else {
                return resp.redirect('/admin/book/list');
            }
        });
    }

};
    exports.getDetail = function (req, resp) {
    book.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'obj': obj
            };
            resp.render('admin/book/detail', obj);
        }
    });
};

    exports.edit = function (req, resp) {
        book.findById(req.params.id, function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                var responseData = {
                    'action': '/admin/book/edit/' + req.params.id,
                    'obj': obj
                };
                resp.render('admin/book/form', responseData);
            }
        });
    };

    exports.update = function (req, resp) {
        book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: false},
            function (err, obj) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    resp.redirect('/admin/book/list');
                }
            });
    };

    exports.delete = function (req, resp) {
        book.findByIdAndUpdate(
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
                    resp.redirect('/admin/book/list');
                }
            });
    };
