const usersServices = require("./user.services");

const router = require("express").Router();
const passportJwt = require('../middlewares/auth.middleware')

router.get("/", usersServices.getAllUsers);
router.get("/:id", usersServices.getUserById);

router.get('/me', passportJwt.authenticate('jwt', { session: false }), usersServices.getMyUser)
router.patch('/me', passportJwt.authenticate('jwt', { session: false }), usersServices.patchMyUser)
router.delete('/me', passportJwt.authenticate('jwt', { session: false }), usersServices.delteMyUser)

router.post("/", usersServices.createUser);
router.patch("/:id", usersServices.updateUser);
router.delete("/:id", usersServices.deleteUser);



module.exports = router;