const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../utils/token.js");
const User = require("../../models/User.js");

module.exports = {
  Query: {
    async refreshToken(_, {}, context) {
      const refreshToken = context.req.headers.cookie?.split("=")?.pop() ?? "";

      if (!refreshToken) {
        throw new GraphQLError({ extensions: { http: { status: 204 } } });
      }

      const user = await User.find({
        refreshToken: refreshToken,
      });

      if (!user) {
        throw new GraphQLError("User don't have permission!", {
          extensions: { code: "FORBIDDEN", http: { status: 403 } },
        });
      }

      verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );

      return { accessToken };
    },
  },
};
