<template>

  
  <div id="searchPage">
    <div><a href="index.html">Home Page</a></div>

    <h2>This should be the Search Page</h2>

      <form v-on:submit.prevent="handleSubmit">
    <p>Search for a share</p>
  <select v-on:change="handleRetrieveStock">
        <option>Stock option from API</option>
      </select>
      <button v-on:click="handleRetrieveStock" type="submit" class=""> See details</button>
      </form>
     <div>
     <search-stock-details-display></search-stock-details-display>

     </div>
     </div>

</template>
 

<script>
import SearchShareDetails from "./components/SearchShareDetails";


export default {
  name: 'searchPage',
  components: {
    // "stock-graph": StockDetailsGraph,
    "search-stock-details-display": SearchShareDetails
  }
};
</script>

<style>
#searchPage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
