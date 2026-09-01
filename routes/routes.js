const { Router } = require("express");
const route = Router();

const controller = require("../controllers/controller.js");

route.get("/", controller.signUpFormGet);
route.post("/", controller.signUpFormPost);

module.exports = route;
