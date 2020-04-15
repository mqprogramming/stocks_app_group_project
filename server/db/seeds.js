use shares_portfolio;
db.dropDatabase();

db.shares.insertMany([
  { ticker: "AAPL", price: 120, quantity: 30, date_and_time: "2020-04-01 16:00:00" },
  { ticker: "GOOGL", price: 330, quantity: 20, date_and_time: "2020-03-06 15:55:00" },
  { ticker: "AMZN", price: 70, quantity: 40, date_and_time: "2020-02-15 12:05:00" },
  { ticker: "AAPL", price: 110, quantity: 10, date_and_time: "2019-04-02 13:25:00" }
]);
