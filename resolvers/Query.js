const { planet, planets } = require('../models/swapi');

module.exports = { 
    Query: {
        planet: async (obj, {id}, context) => {
            const result = await planet(id);

            return result;
        },
        planets: async (obj, {filter}, context) => {
            const result = await planets(filter);

            return result;
        }
    }
};
