const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

const options = {
  port: 4000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playgaround: "/playground"
};

const server = new GraphQLServer({ typeDefs, resolvers });
//server.start(() => console.log('Server is running on localHost: 4000'));
server.start(options, ({ port }) =>
  console.log(`Server started on port ${port}`)
);
