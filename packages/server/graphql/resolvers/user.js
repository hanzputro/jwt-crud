const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

module.exports = {
  Query: {
    async getUser(_, { ID }) {
      const user = await User.findOne({ ID }).populate("products");
      return user;
    },

    async getUsers() {
      const users = await User.find({}).populate("products");
      return users;
    },
  },

  Mutation: {
    async createRegister(_, { username, email, password }) {
      // check old user
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new GraphQLError("Email already registered!");
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

    async createLogin(_, { email, password }, { req }) {
      // find user
      const user = await User.findOne({ email });
      // check password
      const matchPassword = bcrypt.compare(password, user.password);

      if (user) {
        if (!matchPassword) {
          throw new GraphQLError(`Incorrect password!`, "INCORRECT_PASSWORD");
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
          secure: process.env.NODE_ENV === "production", // only transferred over https
          // sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
        });

        // saven token
        user.token = accessToken;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new GraphQLError("Incorrect email!", "INCORRECT_EMAIL");
      }
    },
  },
};
