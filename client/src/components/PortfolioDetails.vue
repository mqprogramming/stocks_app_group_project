<template>
  <div>
    <h3>{{ stock.ticker}}</h3>
    <p> Price: {{ stock.price }}</p>
    <p> Quantity: {{ stock.quantity }}</p>
    <p> Date: {{ stock.date_and_time }}</p>
    <p> <button class="button" id="share-button" type="button" v-on:click="deletePortfolio(stock._id)">Delete</button> </p>
  
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import PortfolioService from '../../services/PortfolioService'

export default {
  name: 'portfolio-details',
  props: ['stock'],
  methods: {
    deletePortfolio(id){
      PortfolioService.deletePortfolio(id)
      .then(() => eventBus.$emit('portfolio-deleted', id))
      eventBus.$emit('update-total-sell');
    }
  }
  

}
</script>

<style>

</style>