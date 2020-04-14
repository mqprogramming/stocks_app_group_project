<template>
  <div>
    <h2>App Goes Here</h2>
    <stock-search />
    <search-details />
    <portfolio-chart />
    <portfolio-total-value/>
    <portfolio-details/>
  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
import SearchDetails from "./components/SearchDetails"
import PortfolioChart from "./components/PortfolioChart"
import PortfolioDetails from "./components/PortfolioDetails"
import PortfolioTotalValue from "./components/PortfolioTotalValue"
export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch,
    'search-details': SearchDetails,
    'portfolio-chart': PortfolioChart,
    'portfolio-details': PortfolioDetails,
    'portfolio-total-value': PortfolioTotalValue
  }

}
</script>

<style>
html {
  height: 100%;
  background-color: #284B63;
}
</style>
