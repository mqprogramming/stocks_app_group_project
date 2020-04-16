<template>
  <div>
    <header>
      <h2>Total portfolio value : £ {{ formatPrice(totalBalance) }}</h2>
    </header>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  name: "PortfolioTotalValue",
  data() {
    return {
      portfolio: "",
      tickerList: {},
      query: "",
      latestPrice: 0,
      stockTimeSeries:{},
      totalBalance: 0
    };
  },
  mounted: function() {
    this.totalPrice();

    eventBus.$on('update-total-add', (cost) => {
      this.totalBalance += cost;
      
    }),
      eventBus.$on('update-total-sell', () => {
      this.portfolio =  "",
      this.tickerList = {},
      this.latestPrice = 0,
      this.query = "",
      this.stockTimeSeries = {},
      this.totalBalance = 0,
      console.log('break one', this.totalBalance);
      this.retrieveTickerList();
      console.log('break two');
    })
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    retrieveTickerList: function() {
      const request = async () => {
        const response = await fetch(
          "http://localhost:3000/api/shares_portfolio"
        );
        this.portfolio = await response.json();
        for (var stock in this.portfolio) {
          const stockSymbol = this.portfolio[stock].ticker;
          if( typeof this.tickerList[stockSymbol] == 'undefined'){
            this.tickerList[stockSymbol] = parseInt(this.portfolio[stock].quantity);
          }else{
            this.tickerList[stockSymbol] = parseInt(this.tickerList[stockSymbol])+ parseInt(this.portfolio[stock].quantity);
          }
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
