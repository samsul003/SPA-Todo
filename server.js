const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todos');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// DB config
const dbConfig = require('./config/keys').mongoURI;
// debug
mongoose.set('debug', true);
// utilize promise
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect(dbConfig, { useNewUrlParser: true })
	.then(() => console.log('Successfully Connected to MongoDB...'))
	.catch(err => console.log(err));

// default app view
app.get('/', (req, res) => {
	res.sendFile("index.html");
});

// use routes
app.use('/api/todos', todoRoutes);

const port = process.env.PORT || 5000;
// start server
app.listen(port, () => console.log(`Server started on port ${port}`));