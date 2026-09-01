const { Router } = require("express");
const route = Router();

const controller = require("../controllers/dashboardController.js");

route.get("/dashboard", controller.dashboardGet);

module.exports = route;
