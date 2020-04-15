<template>
  <div v-if="latestPrice">
      <p >{{ stockDetails["2. Symbol"] }}</p>
      <p> {{ this.latestPrice}} at {{ this.latestTime }}</p>
      <p>
        <form v-on:submit.prevent="buyShares()">
          <label for="sharesQty"> Purchase Amount: </label>
          <input type="number" id="sharesQty" v-model="sharesQty">
          <input class="button" type="submit" value="Add">
        </form>
      </p>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import PortfolioService from "../../services/PortfolioService";

export default {


  name: "search-details",
  data() {
    return {
      stockDetails: {},
      ticker: "",
      query: "",
      stockTimeSeries: {},
      latestPrice: null,
      sharesQty: 0,
      latestTime: null
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
        this.latestPrice = Object.values(this.stockTimeSeries)[0]["4. close"]
        this.latestTime = Object.keys(this.stockTimeSeries)[0]
      };

      request();
    });
  },
      methods: {
        buyShares() {
          const payload = {
            ticker: this.stockDetails["2. Symbol"],
            price: this.latestPrice,
            quantity: this.sharesQty,
            date_and_time: this.latestTime
          };
          
          PortfolioService.postPortfolio(payload)
          .then ((portfolio) => {
            eventBus.$emit('buy-shares', portfolio);
            this.sharesQty = 0

          });

}
      }
}


</script>

<style>

</style>