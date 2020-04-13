// Requiring dependencies
const express = require('express');
const app = express();

const parser = require('body-parser');
app.use(parser.json());

const cors = require('cors');
app.use(cors());

// Creating client
const OurClient = require('mongodb').MongoClient;

const createRouter = require('./helper/create_router.js');

OurClient.connect('mongodb://localhost:27017')
  .then( (client) => {
    const db = client.db(portfolio);
    const portfolioCollection = db.collection('user_portfolio');
    const portfolioRouter = createRouter(portfolioCollection);
    app.use('/api/user-portfolio', portfolioRouter);
  });

app.listen(3000, function(){
  console.log(`Listening on port ${this.address().port}`)
});