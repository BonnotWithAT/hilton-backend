// Modified from https://github.com/wesbos/Advanced-React/blob/master/finished-application/frontend/lib/withData.js
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';


function createClient({ headers }) {
  return new ApolloClient({
    uri: 'http://api:4000/graphql',
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'same-origin',
        },
        headers,
      });
    },
  })
}

export default withApollo(createClient);