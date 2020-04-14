use shares_portfolio;
db.dropDatabase();

db.shares.insertMany([
<<<<<<< HEAD
  { ticker: "AAPL", price: 120, quantity: 30, date_and_time: "2020-04-09 16:00:00" },
  { ticker: "GOOGL", price: 330, quantity: 20, date_and_time: "2020-03-06 15:55:00" },
  { ticker: "AMZN", price: 70, quantity: 40, date_and_time: "2020-02-15 12:05:00" },
  { ticker: "AAPL", price: 110, quantity: 10, date_and_time: "2020-04-08 13:25:00" }
]);
=======
  { ticker: "AAPL", name: "Apple Inc.", price: 120, quantity: 30, date_and_time: "2020-04-09 16:00:00" },
  { ticker: "GOOGL", name: "Alphabet Inc.", price: 330, quantity: 20, date_and_time: "2020-03-06 15:55:00" },
  { ticker: "AMZN", name: "Amazon.com Inc.", price: 70, quantity: 40, date_and_time: "2020-02-15 12:05:00" },
  { ticker: "AAPL", name: "Apple Inc.", price: 110, quantity: 10, date_and_time: "2020-04-08 13:25:00" },
  {ticker: "AMZN", name: "Amazon.com Inc.", price: 30, quantity: 40, date_and_time: "2020-03-15 12:10:00" }
]);


>>>>>>> 59a2752f2ec0bdb051eb10c0cea62a02fdc55b2c
