const app = require("./index.js");
const dotenv = require("dotenv");

dotenv.config();
app.listen(4000, () =>
  console.log(`🚀 Server ready at  http://localhost:4000/api/graphql`)
);
