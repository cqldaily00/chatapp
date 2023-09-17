require("../../db_connect/db");

const router = require("express").Router();
const controller = require("../controller/messagePersons");



router.post("/", controller.getMESSAGESPERSONS);
router.post("/post", controller.postMessagePersonsController);
router.post("/status", controller.getMessageShow);
router.put("/status", controller.updateMessageShow);



module.exports = router;
