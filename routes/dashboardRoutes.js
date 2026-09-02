const { Router } = require("express");
const route = Router();

const controller = require("../controllers/dashboardController.js");

route.use((req, res, next) => {
  if (req.isAuthenticated()) next();
  else
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource." });
});
route.get("/", controller.dashboardGet);

route.get("/new_message", controller.createMessageGet);
route.post("/new_message", controller.createMessagePost);

route.get("/join", controller.joinGet);
route.post("/join", controller.joinPost);

route.get("/leave", controller.leaveGet);

module.exports = route;
