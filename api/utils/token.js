const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

function verifyToken(token, tokenSecret, callback) {
  // check authorization
  if (!token) {
    throw new GraphQLError(token, {
      extensions: { code: "UNAUTHENTICATED", http: { status: 401 } },
    });
  }

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      throw new GraphQLError("User don't have permission!", {
        extensions: { code: "FORBIDDEN", http: { status: 403 } },
      });
    }

    callback && callback(decoded);
  });
}

module.exports = { verifyToken };
