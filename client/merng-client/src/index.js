import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider,createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/merng-bhxcr/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      apiKey: "BwmYU3knNvRrmjh9rl0Y6S1ElwSpIPvnwE2pvX26d9FAbpzSyUvPlHRt3BnQpTez"
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>

    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


