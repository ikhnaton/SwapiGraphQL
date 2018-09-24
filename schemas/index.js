const { makeExecutableSchema } = require('graphql-tools');

// schemas
const { Query } = require('./Query.graphql');
const { Planet } = require('./Planet.graphql');

//resolvers
const resolvers = require('../resolvers');


const schemas = makeExecutableSchema({
    typeDefs: [
        Query,
        Planet
    ],
    resolvers: resolvers
});

module.exports = { schemas };