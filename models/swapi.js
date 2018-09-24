const axios = require('axios');
const config = require('configuration-master');
const BasicError = require('../utils/errors');

const planets = async (filter) => 
{
    try
    {
        const options = {
            method: "get",
            url: `${config.apiHost}planets`
        };
        const result = await axios(options);
        if (filter != null)
        {
            return result.data.results.filter(item => {
                return ~item.name.toLowerCase().indexOf(filter.toLowerCase()) ||
                ~item.terrain.toLowerCase().indexOf(filter.toLowerCase());
            })
        }
        return result.data.results;
    }
    catch(err)
    {
        throw new BasicError(err);
    }
};

const planet = async (id) => 
{
    try
    {
        const options = {
            method: "get",
            url: `${config.apiHost}planets/${id}`
        };
        const result = await axios(options);
        return result.data;
    }
    catch(err)
    {
        throw new BasicError(err);
    }
};

module.exports = { planet, planets };