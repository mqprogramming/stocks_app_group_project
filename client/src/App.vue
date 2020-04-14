<template>
  <div>
    <h2>Share Tracker</h2>
    <stock-search />
    <search-details />
    <portfolio-chart />
    <portfolio-grid/>
  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
import SearchDetails from "./components/SearchDetails"
import PortfolioChart from "./components/PortfolioChart"
import PortfolioDetails from "./components/PortfolioDetails"
import PortfolioGrid from "./components/PortfolioGrid"

export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch,
    'search-details': SearchDetails,
    'portfolio-chart': PortfolioChart,
    'portfolio-details': PortfolioDetails,
    'portfolio-grid': PortfolioGrid
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
