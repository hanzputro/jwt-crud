const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../../utils/token.js");
const User = require("../../models/User");

module.exports = {
  Query: {
    async getUser(_, { ID }) {
      const user = await User.findOne({ ID }).populate("products");
      return user;
    },

    async getUsers(_, {}, context) {
      const users = await User.find({}).populate("products");
      const decodeEmail = (decoded) => {
        context.req.email = decoded.email;
      };

      verifyToken(
        context.accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        decodeEmail
      );

      return users;
    },
  },

  Mutation: {
    async createUser(_, { username, email, password }) {
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

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    async loginUser(_, { email, password }, context) {
      // find user
      const user = await User.findOne({ email });
      // check password
      const matchPassword = bcrypt.compare(password, user.password);

      if (user) {
        if (!matchPassword) {
          throw new GraphQLError(`Incorrect password!`, "INCORRECT_PASSWORD");
        }

        const refreshToken = jwt.sign(
          { userId: user._id, email },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        const oneHour = 1 * 60 * 60 * 1000;
        context.res.cookie("refreshToken", refreshToken, {
          maxAge: oneHour,
          httpOnly: true, // cookie is only accessible by the server not the client side
          secure: process.env.NODE_ENV === "production", // only transferred over https
          // sameSite: true, // only sent for requests to the same FQDN as the domain in the cookie
        });

        const accessToken = jwt.sign(
          { userId: user._id, email },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        await user.updateOne({
          refreshToken,
        });

        return {
          accessToken,
        };
      } else {
        throw new GraphQLError("Incorrect email!", "INCORRECT_EMAIL");
      }
    },

    async logoutUser(_, {}, context) {
      const refreshToken = context.req.headers.cookie?.split("=")?.pop() ?? "";

      if (!refreshToken) {
        throw new GraphQLError("No Content!", {
          extensions: { http: { status: 204 } },
        });
      }

      const user = await User.findOne({ refreshToken });

      if (!user) {
        throw new GraphQLError("No Content!", {
          extensions: { http: { status: 204 } },
        });
      }

      await context.res.clearCookie("refreshToken");
      await user.updateOne({ refreshToken: null });

      return {
        refreshToken,
      };
    },
  },
};
