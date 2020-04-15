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
<<<<<<< HEAD
=======
import { eventBus } from '@/main.js'
import PortfolioService from '../../services/PortfolioService'
>>>>>>> develop

export default {
  name: 'portfolio-details',
  props: ['stock'],
  methods: {
<<<<<<< HEAD
    fetchData() {
      fetch("http://localhost:3000/api/shares_portfolio")
        .then(response => response.json())
        .then(portfolio => (this.portfolio = portfolio));
=======
    deletePortfolio(id){
      PortfolioService.deletePortfolio(id)
      .then(() => eventBus.$emit('portfolio-deleted', id))
>>>>>>> develop
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