const router = require('express').Router();
const { ApolloServer } = require('apollo-server-express');
const { schemas } = require('../schemas');

const apollo = new ApolloServer({
  schema: schemas,
  context: async ({req, res, next}) => {
    
    return {
      correlationId: req.correlationId,
    };
  },
  playground: true,
  cacheControl: {
    defaultMaxAge: 86400,
  },
});

apollo.applyMiddleware({ app: router, path: "/graphql"});

module.exports = router;
