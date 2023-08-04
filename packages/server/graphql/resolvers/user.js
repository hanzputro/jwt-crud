const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

module.exports = {
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },

  Mutation: {
    async inputRegister(_, { inputRegister: { username, email, password } }) {
      // check old user
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new ApolloError("Email already registered!");
      }

      // encrypt password
      const salt = await bcrypt.genSalt();
      const encrytedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encrytedPassword,
      });

      // access token
      const accessToken = jwt.sign(
        {
          userId: newUser._id,
          email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );

      newUser.token = accessToken;
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async inputLogin(_, { inputLogin: { email, password } }, { req }) {
      // find user
      const user = await User.findOne({ email });
      // check password
      const matchPassword = bcrypt.compare(password, user.password);

      if (user) {
        if (!matchPassword) {
          throw new ApolloError(`Incorrect password!`, "INCORRECT_PASSWORD");
        }

        // access token
        const accessToken = jwt.sign(
          { userId: user._id, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        const oneHour = 1 * 60 * 60 * 1000;

        const cookie = req.response.cookie("refreshToken", accessToken, {
          maxAge: oneHour,
          httpOnly: true, // cookie is only accessible by the server not the client side
          // secure: process.env.NODE_ENV === 'prod', // only transferred over https
          // sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
        });
        console.log("cookie:", cookie);

        // saven token
        user.token = accessToken;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Incorrect email!", "INCORRECT_EMAIL");
      }
    },
  },
};
