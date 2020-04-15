<template>
  <div>
    <header>
      <h2>Total portfolio value : £ {{ formatPrice(totalBalance) }}</h2>
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
      totalBalance: 0,
      tickerArray: []
    };
  },
  mounted: function() {
    this.totalPrice();
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
          // this.tickerList[stockSymbol] = this.portfolio[stock].quantity;
          const object = {}
          object[stockSymbol] = this.portfolio[stock].quantity;
          this.tickerArray.push(object)
        }
        console.log('tickerList: ', this.tickerList);
        
        console.log('test: ', this.tickerArray);
        console.log('portfolio: ', this.portfolio);
        
        // const tickers = Object.keys(this.tickerList);
        // console.log("tickers:"+tickers)
        // for (var stockId in tickers) {
        //   let stockId1=stockId;
        this.tickerArray.forEach((value) => {
// console.log('value: ', value);
          const ticker = Object.keys(value)[0]
          // console.log('ticker: ', ticker) ;
          
          this.query =
            "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
            ticker +
            "&interval=5min&apikey=";
            // console.log('url: ', this.query);
            
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
                        console.log('keys: ', this.latestPrice);

            // const stockName=tickers[stockId1];
            const sharesQty = Object.values(value)[0]
            console.log('shares: ', sharesQty);
            
            // console.log("StockName:" + stockName +"latestPrice"+this.latestPrice+"stockAmount"+this.tickerList[stockName]);
            this.totalBalance = this.totalBalance + this.latestPrice * sharesQty;
          };
          

          request1();
        

        })

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
