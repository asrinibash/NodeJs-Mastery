const express = require("express");
const router = express.Router();
const User = require("../model/User");

const {
  handlegetUser,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controller/user");


router.route("/").get(handlegetUser).post(handleCreateUser);

router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
