const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
  destination: "./uploads",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("only .jpeg and .png file are accepted"), false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
