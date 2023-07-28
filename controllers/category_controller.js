const categoryService = require("../services/category_service");
const upload = require("../middleware/category_upload");

exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoryService.createCategory(model, (error, results) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        }
      });
    }
  });
};

exports.getAll = (req, res, next) => {
  var model = {
    categoryName: req.query.categoryName,
    pageSize: req.query.pageSize,
    page: req.query.page,
  };

  categoryService.getCategory(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

exports.getById = (req, res, next) => {
  var model = {
    categoryId: req.params.id,
  };

  categoryService.getCategoryById(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryId: req.params.id,
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoryService.updateCategory(model, (error, results) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        }
      });
    }
  });
};

exports.delete = (req, res, next) => {
  var model = {
    categoryId: req.params.id,
  };

  categoryService.deleteCategory(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};
