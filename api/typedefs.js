const { GraphQLDateTime } = require("graphql-iso-date");

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

module.exports = typeDefs;