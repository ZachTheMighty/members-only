const { Router } = require("express");
const route = Router();

const controller = require("../controllers/logInController.js");

route.get("/log-in", controller.logInFormGet);
route.post("/log-in", controller.logInFormPost);

route.get("/dashboard", controller.dashboardGet);
route.get("/log-out", controller.logOutGet);

module.exports = route;
