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

// Configure CORS middleware based on environment
let corsOptions = {};

if (process.env.NODE_ENV === "development") {
  corsOptions = {
    origin: "http://localhost:5173", // Replace with your development frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable set cookie
  };
} else if (process.env.NODE_ENV === "production") {
  corsOptions = {
    // Add your production frontend URL here
    origin: "https://project-management-client-ten.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable set cookie
  };
}

app.use(cors(corsOptions));

connectDB();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
