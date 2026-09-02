const { Router } = require("express");
const route = Router();

const controller = require("../controllers/homepageController.js");

route.use("/", controller.homepageGet);

module.exports = route;
