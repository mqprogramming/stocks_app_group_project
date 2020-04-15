<template>
  <div>
    <h1>Share Tracker</h1>
    <stock-search />
    <search-details />
    <portfolio-chart class="chart"/>

    <portfolio-total-value/>
    <portfolio-details/>

    <portfolio-grid/>

  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
import SearchDetails from "./components/SearchDetails"
import PortfolioChart from "./components/PortfolioChart"
import PortfolioDetails from "./components/PortfolioDetails"
import PortfolioTotalValue from "./components/PortfolioTotalValue"
import PortfolioGrid from "./components/PortfolioGrid"
export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch,
    'search-details': SearchDetails,
    'portfolio-chart': PortfolioChart,
    'portfolio-details': PortfolioDetails,
    'portfolio-total-value': PortfolioTotalValue,
    'portfolio-grid': PortfolioGrid
  }

}
</script>

<style>
html {
  height: 100%;
  background-color: #284B63;
  color: white;
  font-family: 'Alegreya Sans', sans-serif;
  text-shadow: 2px 2px #1C3144;
}

.button {
  border-radius: 12px;
  margin: 2px;
  box-shadow: 0 4px  #1C3144;
}

.button:hover {
  background-color: lightsteelblue;
  }

.button:active {
  background-color: lightsteelblue;
  box-shadow: 0 5px #1C3144;
  transform: translateY(4px);
}

#share-button {
  box-shadow: 0 4px #101B26;
}

#share-button:active{
  box-shadow: 0 4px #101B26;
}
.chart {
  text-shadow: none;
}
</style>
