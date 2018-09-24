const router = require('express').Router();
const { BasicError } = require('../utils/errors.js');

router.use('/', (err, req, res, next) =>
    {
        console.log(err.name);
        const newError = err.name === "Error" ? new BasicError(err) : err;

        if (res.finished)
        {
            return;
        }
        
        if (res.headersSent)
        {
            let errResult = {};
            
            if (typeof newError === 'string')
            {
                errResult.message = newError;
            }
            else
            {
                errResult = Object.assign({}, newError);
            }
            
            if (typeof newError.status === 'undefined')
            {
                errResult.statusCode = 500;
            }
            console.log(newError);
            res.write(JSON.stringify(errResult));
            res.end();
        }
        else
        {
            res.status(newError.statusCode || 500);
            
            console.log(newError);
            res.send(Object.getOwnPropertyNames(newError).reduce((acc, item) => {
                acc[item] = newError[item];
                return acc;
            }, {}));
        }
    }
);

module.exports = router;
