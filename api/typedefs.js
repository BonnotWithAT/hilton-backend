const { GraphQLDate } = require("graphql-iso-date");

const typeDefs = `
  scalar GraphQLDate
  type Query {
    getReservation(id: ID!): Reservation
    allReservations: [Reservation]
  }
  type Reservation {
    id: ID!
    name: String!
    hotelName: String!
    arrivalDate: GraphQLDate!
    departureDate: GraphQLDate!
  }
  type Mutation {
    addReservation(name: String!, hotelName: String!, arrivalDate: GraphQLDate!, departureDate: GraphQLDate!): Reservation!
  }
`;

module.exports = typeDefs;