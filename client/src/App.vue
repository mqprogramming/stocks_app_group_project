<template>
  <div>
    <h2>Share Tracker</h2>
    <stock-search />
    <search-details />
    <portfolio-chart />
    <portfolio-details/>
  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
import SearchDetails from "./components/SearchDetails"
import PortfolioChart from "./components/PortfolioChart"
import PortfolioDetails from "./components/PortfolioDetails"

export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch,
    'search-details': SearchDetails,
    'portfolio-chart': PortfolioChart,
    'portfolio-details': PortfolioDetails
  }

}
</script>

<style>
html {
  height: 100%;
  background-color: #284B63;
  color: white;
}
</style>
