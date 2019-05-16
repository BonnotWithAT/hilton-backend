const { GraphQLServer } = require('graphql-yoga');
const { GraphQLDateTime } = require('graphql-iso-date');
const mongoose = require('mongoose');
mongoose.connect("mongodb://mongouser:terriblepassword@mongodb:27017");
const Reservation = require('./models/Reservation');

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
  port: 4000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playgaround: "/playground"
};

const server = new GraphQLServer({ typeDefs, resolvers });
//server.start(() => console.log('Server is running on localhost: 4000'));
// mongoose.connection.once("open", function() {
  server.start(options, ({ port }) =>
    console.log(`Server started on port ${port}`)
  );
// });

