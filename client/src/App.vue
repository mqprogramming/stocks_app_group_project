<template>
  <div>
    <h2>app goes here</h2>
    <stock-search />
    <search-details />
  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
import SearchDetails from "./components/SearchDetails"
export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch,
    'search-details': SearchDetails
  }

}
</script>

<style>

</style>
