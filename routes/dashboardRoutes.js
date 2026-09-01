const { Router } = require("express");
const route = Router();

const controller = require("../controllers/dashboardController.js");

route.get("/", controller.dashboardGet);
route.get("/new_message", controller.createMessageGet);

module.exports = route;
