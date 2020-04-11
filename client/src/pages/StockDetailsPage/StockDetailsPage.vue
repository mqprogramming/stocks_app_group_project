<template>
   
  <div id="stockDetailsPage">
    <div><a href="index.html">Home Page</a></div>
    <h1>Portofolio Details</h1>
    <h3>Select a stock from the dropdown Portofolio to see further information</h3>

    <p>(Portofolio Stock Dropdown:on Change)</p>
    <!-- example for vue:drop down : https://github.com/codeclan/e38_classnotes/blob/master/week_07/day_3/4_multi_components_lab/multi_components_lab_extensions_solution/src/components/CountryFilterForm.vue -->
    <form v-on:submit.prevent>
      <!-- select on change  -->
      <select v-on:change="handleSelectStock">
        <option>Stock option from portofolio</option>
      </select>
      <button v-on:click="handleStockSell" type="submit" class=""> Sell Stock</button> 
    </form>
    <div class="stock-chart">
    <stock-graph id="line-chart"></stock-graph>
    </div>

       <stock-details-display></stock-details-display>

       

    </div>
  
</template>

<script>
import StockDetailsGraph from "./components/StockDetailsChart";
import StockDetailsDisplay from "./components/StockDetailsDisplay";

export default {
  name: "StockDetailsPage",
  components: {
    "stock-graph": StockDetailsGraph,
    "stock-details-display": StockDetailsDisplay
  }
};
</script>

<style>
#stockDetailsPage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
