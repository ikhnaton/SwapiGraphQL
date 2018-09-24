const uuidv4 = require('uuid/v4');

const prepRequest = (req, res, next) => 
{
    const correlationId = uuidv4();
    req.correlationId = correlationId;
    next();
}

module.exports = { prepRequest };