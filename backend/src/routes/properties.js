var express = require("express");
var router = express.Router();
const {
  createProperty,
  updateProperty,
  deleteProperty,
  userProperties,
  search,
  getPropertiesById,
  getProperties,
} = require("../controller/properties.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

/* GET users listing. */

router.post("/create", authenticateToken, createProperty);
router.get("/", getProperties);
router.get("/:id", getPropertiesById);
router.put("/update/:id", authenticateToken, updateProperty);
router.delete("/delete/:id", authenticateToken, deleteProperty);
// router.get('/check',authenticateToken, function (req, res, next) {
// res.send("checked")
// })

router.get("/user", authenticateToken, userProperties);
router.get("/search", search);

module.exports = router;
