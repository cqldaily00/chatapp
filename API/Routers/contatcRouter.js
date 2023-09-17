require("../../db_connect/db");

const router = require("express").Router();
const controller = require("../controller/contactController");
const Authcontroller = require("../controller/AuthController");

router.post("/users", controller.getUser);
router.post("/post", controller.postContact);
router.post("/login", Authcontroller.loginUser);



module.exports = router;
