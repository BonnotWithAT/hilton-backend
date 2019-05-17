require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-iso-date");
const mongoose = require("mongoose");
const Reservation = require("./models/Reservation");

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${
    process.env.MONGO_CONTAINER
  }:27017`
);

// I am not entirely sure I'm including the graphql-iso-date the "right" way here
const typeDefs = `
  scalar GraphQLDateTime
  type Query {
    getReservation(id: ID!): Reservation
    allReservations: [Reservation]
  }
  type Reservation {
    id: ID!
    name: String!
    hotelName: String!
    arrivalDate: GraphQLDateTime!
    departureDate: GraphQLDateTime!
  }
  type Mutation {
    addReservation(name: String!, hotelName: String!, arrivalDate: GraphQLDateTime!, departureDate: GraphQLDateTime!): Reservation!
  }
`;

const resolvers = {
  Query: {
    getReservation: async (_, { id }) => {
      const reservation = await Reservation.findById(id);
      return reservation;
    },
    allReservations: async _ => {
      const reservations = await Reservation.find();
      return reservations;
    }
  },
  Mutation: {
    addReservation: async (
      _,
      { name, hotelName, arrivalDate, departureDate }
    ) => {
      const reservation = new Reservation({
        name,
        hotelName,
        arrivalDate,
        departureDate
      });
      await reservation.save();
      return reservation.id;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
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
  res.json(newid);
});

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => console.log(`Server now ready`));
