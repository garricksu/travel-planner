import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // credentials: 'include',
  cache: new InMemoryCache()
})
