const stringify = require('fast-safe-stringify');

class BasicError extends Error
{
	constructor(err)
	{
        super(err.toString());
        
        const replacer = (key, value) =>
        {
            // console.log('Key:', JSON.stringify(key), 'Value:', JSON.stringify(value))
            // Remove the circular structure
            if (value === '[Circular]') {
              return;
            }
            return value;
        }
        
        const errCopy = JSON.parse(stringify(err));
        // if (err.request)
        // {
        //     err.request.connection = null;
        //     err.request.res = null;
        //     err.request.socket._httpMessage = "[Circular]";
        //     err.request._httpMessage = null;
        //     err.request._currentRequest = null;
        //     err.request._redirectable._currentRequest = "[Circular]";
        // }
        // if (err.response)
        // {
        //     err.response.request = null;
        // }

        Object.getOwnPropertyNames(errCopy).map((item) => {
            this[item] = errCopy[item];
        }, {});
        
        if (this.name !== "BasicError")
        {
            this.wrappedError = this.name;
            this.name = "BasicError";
        }
	}
}

module.exports = { BasicError };
