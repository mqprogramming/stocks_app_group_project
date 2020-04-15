<template>
  <div v-if="latestPrice">
      <p >{{ stockDetails["2. Symbol"] }}</p>
      <p> {{ this.latestPrice}} at {{ this.latestTime }}</p>
      <p>
        <form v-on:submit.prevent="buyShares">
          <label for="sharesQty"> How many shares</label>
          <input type="number" id="sharesQty" v-model="sharesQty">
          <input type="submit" value="buy">
        </form>
      </p>
   <!-- <form v-on:submit.prevent="buyShares">
  <ul v-for="(stockTime, index) in this.stockTimeSeries" :key="index" :stockTime="stockTime">
        <li> {{ stockTime["4. close"] }}, {{index}}
            
        <label for="sharesQty"> How many shares</label>
        <input type="number" id="sharesQty" v-model="sharesQty">
        <input type="submit" value="buy">
      

        </li>
 </ul>
 </form> -->
        <!-- <li>{{ this.stockTimeSeries["4. close"] }}</li> -->

      <!-- </ul> --> 
   
        
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
        
        console.log(json["Meta Data"]);
      };

      request();
    });
  },
      methods: {
        buyShares () {
          const payload = {
            ticker: this.stockDetails["2. Symbol"],
            price: this.latestPrice,
            quantity: this.sharesQty,
            date_and_time: this.latestTime
          };
          console.log(payload);
          
            eventBus.$emit('buy-shares', payload);
            

}
      }
}


</script>

<style>

</style>