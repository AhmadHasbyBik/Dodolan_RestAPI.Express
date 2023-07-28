const multer = require("multer");
const Path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const Ext = [".png", ".jpg", ".jpeg"];
  if (!Ext.includes(Path.extname(file.originalname))) {
    return callback(new Error("Please Only Use .png, .jpg, and .jpeg !!!"));
  }

  const filesize = parseInt(req.headers["content-length"]);

  if (filesize > 1048576) {
    return callback(new Error("File Size is Too Big!!!"));
  }

  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  filesize: 1048576,
});

module.exports = upload.single("categoryImageç");
