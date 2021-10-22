const {ApolloServer} = require ('apollo-server');
const {gql} = require ('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const Posts = require('./models/Posts');

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!,
        username: String!,
        createdAt: String!
    }
    type Query{
        getPosts : [Post]
    }
`;

const resolvers = {
    Query : {
        async getPosts() {
            try {
                const posts = await Posts.find();
                return posts;
                
            } catch (error) {
                throw new Error(error);
                
            }
        }
    }
}

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