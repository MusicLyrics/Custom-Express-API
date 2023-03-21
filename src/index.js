require('./models/User')
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middleware/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

//Connection to MongoDB and Error message
const mongoUri = 'mongodb+srv://DBmbma37913:NfQ9iIDgh958ykE5@cluster.zjjf5in.mongodb.net/?retryWrites=true&w=majority';
if (!mongoUri) {
    throw new Error(
        'Please provide a mongoUri'
    );
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected',() => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});


//request to run the function
app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3002, () => {
    console.log('listening on port 3002!');
})