<template>
  <div>
    <h2>App Goes Here</h2>
    <stock-search />
    <search-details />
    <portfolio-chart />
  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
import SearchDetails from "./components/SearchDetails"
import PortfolioChart from "./components/PortfolioChart"

export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch,
    'search-details': SearchDetails,
    'portfolio-chart': PortfolioChart
  }

}
</script>

<style>

</style>
