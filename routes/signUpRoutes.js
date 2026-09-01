const { Router } = require("express");
const route = Router();

const controller = require("../controllers/signUpController.js");

route.get("/", controller.signUpFormGet);
route.post("/", controller.signUpFormPost);

module.exports = route;
