const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');
const dbConfig = require('./config/keys').mongoURI;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true })
	.then(() => console.log('Successfully Connected to MongoDB...'))
	.catch(err => console.log(err));

app.get('/', (_, res) => {
	res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));