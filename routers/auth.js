const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const User = require("../models").user;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//POST create log in
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"];
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//POST create user
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"];

    const token = toJWT({ userId: newUser.id });

    res.status(201).json({ token, ...newUser.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//PATCH change user
router.patch("/change_me/:userId", async (req, res, next) => {
  const { userId } = req.params;
  console.log("What is my userId?", userId);
  try {
    // const { password } = req.body;

    // if (!password) {
    //   return res
    //     .status(400)
    //     .send({ message: "Please provide a valid password" });
    // }

    const userToUpdate = await User.findByPk(userId);

    // if (!userToUpdate || !bcrypt.compareSync(password, userToUpdate.password)) {
    //   return res.status(400).send({
    //     message: "User with that email not found or passsword incorrect",
    //   });
    // }

    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }

    delete userToUpdate.dataValues["password"];
    const token = toJWT({ userId: userToUpdate.id });
    return res.status(200).send({ token, ...userToUpdate.dataValues });
  } catch (error) {
    console.log(Error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//GET users profile using only token & check if a token is still valid
router.get("/me", authMiddleware, async (req, res) => {
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
