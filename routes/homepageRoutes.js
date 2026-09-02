const { Router } = require("express");
const route = Router();

const controller = require("../controllers/homepageController.js");

route.get("/", controller.homepageGet);
route.get("/delete_message", controller.deleteMessageGet);

module.exports = route;
