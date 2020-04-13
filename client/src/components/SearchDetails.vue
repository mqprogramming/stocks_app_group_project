<template>
  <div v-if="stockDetails">
      <p >{{ stockDetails["2. Symbol"] }}</p>
      <!-- <p>{{stockDetails["Time Series (5min)"]}}</p> -->
      <ul >
        <li v-for="(stockTime, index) in this.stockTimeSeries" :key="index" :stockTime="stockTime" > {{ stockTime["4. close"] }} </li>

      </ul>

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
        this.stockDetails = json["Meta Data"];
        this.stockTimeSeries = json["Time Series (5min)"];
        console.log(json["Meta Data"]);
      };

      request();
    });
  }
};

</script>

<style>
</style>