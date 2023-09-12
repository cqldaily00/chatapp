require("../../db_connect/db");

const router = require("express").Router();
const controller = require("../controller/contactController");

router.post("/post", controller.postContact);



module.exports = router;
