const { Router } = require("express");
const route = Router();

const controller = require("../controllers/signUpController.js");

route.get("/sign-up", controller.signUpFormGet);
route.post("/sign-up", controller.signUpFormPost);

module.exports = route;
