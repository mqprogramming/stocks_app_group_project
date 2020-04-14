<template>
  <div>
    <h3>{{ stock.ticker}}</h3>
    <p> Price: {{ stock.price }}</p>
    <p> Quantity: {{ stock.quantity }}</p>
    <p> Date: {{ stock.date_and_time }}</p>
    <p> <button type="button" v-on:click="deletePortfolio(stock._id)">Sell</button> </p>
  
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
      PortfolioService.deletePortfolio(this.portfolio._id)
      .then(() => eventBus.$emit('portfolio-deleted', this.portfolio._id))
    }
    // handleSell(id) {
    //   console.log(id);
      
    //   PortfolioService.deletePortfolio(id).then ((reponce) => {
    //     let index = this.portfolio.findIndex(shares => shares._id == id)
    //   this.portfolio.splice(index, 1)
    //   })
    // }
  //   handleSell(id) {

  //   deletePortfolio(){
  //     PortfolioService.deletePortfolio(this.portfolio._id)
  //     .then(() => eventBus.$emit('portfolio-deleted', this.portfolio._id))
  //   }
  // }
  }
  

}
</script>

<style>

</style>