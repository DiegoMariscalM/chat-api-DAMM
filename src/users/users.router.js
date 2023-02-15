const usersServices = require("./user.services");

const router = require("express").Router();

router.get("/", usersServices.getAllUsers);

router.get("/:id", usersServices.getUserById);

router.post("/", usersServices.createUser);

router.patch("/:id", usersServices.updateUser);

router.delete("/:id", usersServices.deleteUser);

module.exports = router;