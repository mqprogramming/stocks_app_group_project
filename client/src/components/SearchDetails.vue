<template>
  <div>
    <div id="stock-details">
      <p>Symbol: {{ this.ticker }}</p>
      <p>Information: {{ this.stockDetails["0"]["Meta Data"]["1. Information"] }}</p>
      <p>Last Refreshed: {{ this.stockDetails["0"]["Meta Data"]["3. Last Refreshed"] }}</p>
      <p>Time Zone: {{ this.stockDetails["0"]["Meta Data"]["6. Time Zone"] }}</p>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "search-details",
  data() {
    return {
      stockDetails: [
        {
          "Meta Data": {
            "1. Information":
              "Intraday (5min) open, high, low, close prices and volume",
            "2. Symbol": "BAC",
            "3. Last Refreshed": "2000-04-09 16:00:00",
            "4. Interval": "5min",
            "5. Output Size": "Compact",
            "6. Time Zone": "US/Eastern"
          }
        }
      ],
      query: "",
      ticker: "IBM"
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
  }
};
</script>

<style>
</style>