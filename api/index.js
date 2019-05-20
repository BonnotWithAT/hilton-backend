require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./db");
const resolvers = require("./resolvers");
const typeDefs = require("./typedefs");

// Passing in the db as a context to see if mocking is simplified for testing
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV === "development",
  context: req => ({ ...req, db }),
});
const app = express();
app.use(cors());

// These were fun to figure out
app.get("/reservations", async (req, res) => {
  allres = await resolvers.Query.allReservations(null);
  res.json(allres);
});
app.get("/reservation/:id", async (req, res) => {
  reservation = await resolvers.Query.getReservation(null, {
    id: req.params.id
  });
  res.json(reservation);
});
// Not sure that req.query is the most correct here but it is what is currently working
app.post("/reservation", async (req, res) => {
  newid = await resolvers.Mutation.addReservation(null, {
    name: req.query.name,
    hotelName: req.query.hotelName,
    arrivalDate: req.query.arrivalDate,
    departureDate: req.query.departureDate
  });
  res.json(newid._id);
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => console.log(`Server now ready`));
