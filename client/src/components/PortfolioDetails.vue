<template>
  <div>
    <h3>{{ stock.ticker}}</h3>
    <p> Price: {{ stock.price }}</p>
    <p>Quantity: {{ stock.quantity }}</p>
    <p> Date: {{ stock.date_and_time }}</p>
    <p> <button v-on:click="handleSell(stock._id)">Sell</button> </p>
  
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import PortfolioService from '@/services/PortfolioService.js'

export default {
  name: 'portfolio-details',
  props: ['game'],
  methods: {
    deletePortfolio(){
      PortfolioService.deletePortfolio(this.portfolio._id)
      .then(() => eventBus.$emit('portfolio-deleted', this.portfolio._id))
    }
  }

}
</script>

<style>

</style>