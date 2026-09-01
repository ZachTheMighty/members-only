const { Router } = require("express");
const route = Router();

const controller = require("../controllers/logInController.js");

route.get("/", controller.logInFormGet);
route.post("/", controller.logInFormPost);
route.get("/", controller.logOutGet);

module.exports = route;
