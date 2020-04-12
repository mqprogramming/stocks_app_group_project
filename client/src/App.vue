<template>
  <div>
    <h2>app goes here</h2>
    <stock-search />
  </div>
</template>

<script>
import StockSearch from "./components/StockSearch"
export default {
  name: 'App' ,
  components: {
    'stock-search': StockSearch
  }

}
</script>

<style>

</style>
