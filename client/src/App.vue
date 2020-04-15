<template>
  <div>
    <div class="page-header">
      <h1 id="page-title">ShareWatch</h1>
      <p id="page-sub-heading">At ShareWatch, we help you make your dream future a reality. You captilalist pig.</p>
    </div>
    <stock-search class="stock-search"/>
    <search-details />
    <portfolio-chart class="chart"/>
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
  /* background-color: #284B63; */
  background: url("assets/BackgroundImage1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: white;
  font-family: 'Alegreya Sans', sans-serif;
  text-shadow: 2px 2px #1C3144;
}

.button {
  border-radius: 12px;
  margin: 2px;
  box-shadow: 0 4px  #224080;
}

.button:hover {
  background-color: lightsteelblue;
  }

.button:active {
  background-color: lightsteelblue;
  box-shadow: 0 5px #224080;
  transform: translateY(4px);
}

#share-button {
  box-shadow: 0 4px #224080;
}

#share-button:active{
  box-shadow: 0 4px #224080;
}

.page-header {
  height: 300px;
  margin: 10px;
  text-align: center;
  font-size: 50px;
  
}

#page-sub-heading{
  font-size: 25px;
}

.stock-search{
  text-align: center;
  margin: 10px;
}

#symbol{
  margin: 5px;
}

.search-details {
  /* display: flex;
  flex-direction: column; */
  margin: auto;
  border-style: solid;
  border-color: aliceblue;
  background-color: rgba(52,100,200,0.7);
  width: 200px;
  text-align: center;
}

.chart {
  box-shadow: none;
  text-shadow: none;
}
</style>
