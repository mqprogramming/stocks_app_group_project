<template>
  <div>
    <header>
      <h2>Total portfolio value : £ {{ totalBalance }}</h2>
    </header>
  </div>
</template>

<script>
export default {
  name: "PortfolioTotalValue",
  data() {
    return {
      portfolio: "",
      tickerList: {},
      query:"",
      latestPrice:0,
      stockTimeSeries:{},
      totalBalance: 0
    };
  },
  mounted: function() {
    this.totalPrice();
  },
  methods: {
    retrieveTickerList: function() {
      const request = async () => {
        const response = await fetch(
          "http://localhost:3000/api/shares-portfolio"
        );
        this.portfolio = await response.json();
        for (var stock in this.portfolio) {
          const stockSymbol = this.portfolio[stock].ticker;
          this.tickerList[stockSymbol] = this.portfolio[stock].quantity;
        }
        const tickers = Object.keys(this.tickerList);
        console.log("tickers:"+tickers)
        for (var stockId in tickers) {
          let stockId1=stockId;
          this.query =
            "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
            tickers[stockId1] +
            "&interval=5min&apikey=";
          const request1 = async () => {
            const response = await fetch(
              `${this.query}${process.env.VUE_APP_API_KEY}`
            );
            const json = await response.json();
            const stockDetails = json["Meta Data"];
            this.stockTimeSeries = json["Time Series (5min)"];
            const keys=Object.keys(this.stockTimeSeries)
            const firstKey=keys[0]
            this.latestPrice = this.stockTimeSeries[firstKey][
              "4. close"
            ];
            const stockName=tickers[stockId1];
            console.log("StockName:" + stockName +"latestPrice"+this.latestPrice+"stockAmount"+this.tickerList[stockName]);
            this.totalBalance =this.totalBalance + this.latestPrice * parseFloat(this.tickerList[stockName]);
          };

          request1();
        }
      };
      request();
    },
    totalPrice: function() {
      this.retrieveTickerList();
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
