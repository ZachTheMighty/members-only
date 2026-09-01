const { Router } = require("express");
const route = Router();

const controller = require("../controllers/logInController.js");

route.get("/log-in", controller.logInFormGet);

module.exports = route;
