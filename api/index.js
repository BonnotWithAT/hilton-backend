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
      return reservation;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use(cors());
app.get("/testendpoint", function(req, res) {
  res.json({ message: "Got this" });
});
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => console.log(`Server now ready`));
