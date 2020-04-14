<template>
  <div>
    <header>
      <h2>Total portfolio: £ {{ totalBalance }}</h2>
    </header>
  </div>
</template>

<script>
export default {
  name: "PortfolioTotalValue",
  data() {
    return {
      total: "",
      portfolio: "",
      tickerList: [],
      totalBalance: 0
    };
  },
  mounted: function() {
    this.totalPrice();
  },
  methods: {
    getLatestPrice: function(symbol) {
      this.query =
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        symbol +
        "&interval=5min&apikey=";
      const request = async () => {
        const response = await fetch(
          `${this.query}${process.env.VUE_APP_API_KEY}`
        );
        const json = await response.json();
        const stockDetails = json["Meta Data"];
        const stockTimeSeries = json["Time Series (5min)"];
        const latestPrice = Object.values(this.stockTimeSeries)[0]["4. close"];
        return latestPrice;
      };
    },
    retrieveTickerList: function() {
      fetch("http://localhost:3000/api/shares-portfolio")
        .then(response => response.json())
        .then(portfolio => (this.portfolio = portfolio));
      console.log("hey"+this.portfolio+"hey");
      for (var stock in this.portfolio) {
        this.tickerList[stock.ticker] = stock.quantity;
      }
    },
    totalPrice: function() {
      this.retrieveTickerList();
      const tickers = Object.keys(this.tickerList);
      for (var stockName in tickers) {
        const currentPrice = this.getLatestPrice(stockName);
        this.totalBalance += currentPrice * this.tickerList[stockName];
        console.log(currentPrice);
        console.log(stockName);
      }
    }
  }
};
</script>




<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
