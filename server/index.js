const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const cors = require("cors");
const connectDB = require("./config/db.js");
const PORT = process.env.PORT || 5000;
const app = express();

// Add a route handler for the root path
app.get("/", (req, res) => {
  res.send("Hello! Your GraphQL server is live.");
});

connectDB();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
