const {ApolloServer} = require ('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');


const typeDefs = require ('./typeDefs')
const resolvers = require('./resolvers')


const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });