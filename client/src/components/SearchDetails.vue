<template>
  <div></div>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "search-details",
  data() {
    return {
      stockDetails: {},
      query:"",
      ticker: ""
    };
  },

  mounted() {
    eventBus.$on("search-submit", symbol => {
      this.ticker = symbol;
      this.query =
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        symbol +
        "&interval=5min&apikey=";
      fetch(`${this.query}${process.env.VUE_APP_API_KEY}`)
        .then(res => res.json())
        .then(stockData => (this.stockDetails[0] = stockData));
    });

    console.log(`Output: `, this.stockDetails);
  }
};
</script>

<style>
</style>