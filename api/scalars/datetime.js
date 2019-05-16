const { GraphQLScalarType, Kind } = require('graphql');

const typeDef = `
  scalar DateTime
`;

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A DateTime representation in ISO format'
})