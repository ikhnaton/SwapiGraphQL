const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('configuration-master');
const { prepRequest } = require('./server/prepRequest');
config.loadConfig("../../config.js");
const app = express();

app.use(prepRequest);
app.use(bodyParser.json({ type: '*/*', limit: '500kb' }));
console.log(config.apiHost);
app.use("/", require('./server/graphql'));

// todo: remove
app.use("/", express.static(path.resolve('.', 'dist')));
// app.get('/', async (req, res, next) => {
// 	const error = new Error(`The server is working, but you should not be here. Current correlationId: ${req.correlationId}`)
// 	throw error;
// });

// final error handler
app.use("/", require('./server/error'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});