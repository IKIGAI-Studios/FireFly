var multer = require("multer");

var uploadPhoto = (type) => {
  var route;
  switch (type) {
    case "user":
      route = "./web/img/user";
      break;
    case "product":
      route = "./web/img/product";
      break;
  }
  const storage = multer.diskStorage({
    destination: route,
    filename: function (req, file, cb) {
      var name;
      switch (type) {
        case "user":
          name = req.body.usr + "-" + file.originalname;
          break;
        case "product":
          name = req.body.id_usr + "-" + file.originalname;
          break;
      }
      cb(null, name);
    },
  });
  const upload = multer({ storage }).single("photo");
  return upload;
};

module.exports = { uploadPhoto };
