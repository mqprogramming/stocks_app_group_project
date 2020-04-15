use shares_portfolio;
db.dropDatabase();

db.shares.insertMany([
<<<<<<< HEAD
  { ticker: "BA", name: "The Boeing Company", price: "140.9900", quantity: "3", date_and_time: "2020-04-14 16:00:00" },
  { ticker: "BABA", name: "Alibaba Group Holding Limited", price: "204.9400", quantity: "2", date_and_time: "2020-04-14 16:00:00" }
  
=======
  { ticker: "AAPL", price: 120, quantity: 30, date_and_time: "2020-04-01 16:00:00" },
  { ticker: "GOOGL", price: 330, quantity: 20, date_and_time: "2020-03-06 15:55:00" },
  { ticker: "AMZN", price: 70, quantity: 40, date_and_time: "2020-02-15 12:05:00" },
  { ticker: "AAPL", price: 110, quantity: 10, date_and_time: "2019-11-02 13:25:00" },
  { ticker: "AMZN", price: 110, quantity: 50, date_and_time: "2020-03-15 13:25:00" },
  { ticker: "AMZN", price: 110, quantity: 15, date_and_time: "2020-03-01 13:25:00" },
  { ticker: "AAPL", price: 110, quantity: 12, date_and_time: "2020-01-02 13:25:00" },
>>>>>>> develop
]);
