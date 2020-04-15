use shares_portfolio;
db.dropDatabase();

db.shares.insertMany([
  { ticker: "BA", name: "The Boeing Company", price: "140.9900", quantity: "3", date_and_time: "2020-04-14 16:00:00" },
  { ticker: "BABA", name: "Alibaba Group Holding Limited", price: "204.9400", quantity: "2", date_and_time: "2020-04-14 16:00:00" }
  
]);


