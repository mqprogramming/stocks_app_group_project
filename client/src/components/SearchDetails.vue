<template>
  <div>
    <p v-if="stockDetails">{{ stockDetails }}</p>
  </div>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "search-details",
  data() {
    return {
      stockDetails: {},
      ticker: "",
      query: ""
    };
  },
  mounted() {
    eventBus.$on("search-submit", symbol => {
      this.ticker = symbol;
      this.query =
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        symbol +
        "&interval=5min&apikey=";
      const request = async () => {
        const response = await fetch(
          `${this.query}${process.env.VUE_APP_API_KEY}`
        );
        const json = await response.json();
        this.stockDetails = json;
        console.log(json["Meta Data"]);
      };

      request();
    });
  }
};
</script>

<style>
</style>