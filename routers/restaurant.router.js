const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

//Create a restaurant

router.post("/", restaurantController.create);

//Get a restaurant

router.get("/", restaurantController.getAll);

//Get a restaurant BY Id

router.get("/:id", restaurantController.getById);

//Update a restaurant
router.put("/:id", restaurantController.update);

//Delete a restaurant
router.delete("/:id", restaurantController.delete);

module.exports = router;