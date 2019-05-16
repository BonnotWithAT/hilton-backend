require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');
const { GraphQLDateTime } = require('graphql-iso-date');
const mongoose = require('mongoose');
const Reservation = require('./models/Reservation');

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CONTAINER}:27017`);

const typeDefs = `
  scalar GraphQLDateTime
  type Query {
    hello(name: String): String!
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
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getReservation: async (_, {id}) => {
      const reservation = await Reservation.findById(id);
      return reservation;
    },
    allReservations: async (_) => {
      const reservations = await Reservation.find();
      return reservations;
    }
  },
  Mutation: {
    addReservation: async (_, { name, hotelName, arrivalDate, departureDate }) => {
      const reservation = new Reservation({name, hotelName, arrivalDate, departureDate});
      await reservation.save();
      return reservation;
    }
  }
};

const options = {
  port: process.env.PORT,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playgaround: "/playground"
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(options, ({ port }) =>
  console.log(`Server started on port ${port}`)
);

