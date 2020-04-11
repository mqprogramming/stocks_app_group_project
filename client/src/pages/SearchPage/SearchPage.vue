<template>
  <div id="searchPage">

    <h2>This should be the Search Page</h2>

      <form v-on:submit.prevent="handleSubmit">
    <p>Search for a share</p>
  <select v-on:change="handleRetrieveStock">
        <option>Stock option from API</option>
      </select>
      <button v-on:click="handleRetrieveStock" type="submit" class=""> See details</button>
      </form>
    </div>
    

</template>
  </div>
</template>

<script>


export default {
  name: 'searchPage',
}
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
