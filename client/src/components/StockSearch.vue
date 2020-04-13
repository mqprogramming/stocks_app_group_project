<template>
  <div>
      <form v-on:submit.prevent="handleSubmit">

      <label for="symbol">Enter the Stock Ticker Name: </label>
      <input type="text" id="symbol" name="symbol" v-model="symbol" />

      <input type="submit" name="submit" value="Search" />
      </form>

  </div>
</template>

<script>
import { eventBus } from "@/main";
export default {
    name: 'stock-search',
    data() {
        return {
            symbol: "",
            
        }
    },
    methods: {
        handleSubmit () {
            eventBus.$emit('search-submit', this.symbol);
            this.symbol = "";
        }
    }

}
</script>

<style>

</style>