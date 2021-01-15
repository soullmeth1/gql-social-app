import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  //   gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://server-gql-social-app.herokuapp.com/',
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query {
//         getPosts {
//           id
//           username
//           body
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

function ProviderApollo({ children }) {
  //   console.log('this is from provider');
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ProviderApollo;
