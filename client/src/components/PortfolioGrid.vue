<template>
  <div class="details">
    <h1>Portfolio</h1>
    <!-- <h2>All the details!</h2> -->
      <portfolio-details v-for="stock in portfolio" v-bind:key="stock._id"/>
        <!-- <li>Ticker: {{ stock.ticker }}</li>
        <li>Name: {{ stock.name }}</li>
        <li> Price: {{ stock.price }}</li>
        <li>Quantity: {{ stock.quantity }}</li>
        <li> Date: {{ stock.date_and_time }}</li>
        <li> <button v-on:click="handleSell(stock._id)">Sell</button> </li>
      </ul> -->
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
import PortfolioService from "../../services/PortfolioService";
import PortfolioDetails from './PortfolioDetails'

export default {
  name: "portfolio-grid",
  data() {
    return {
      portfolio: []
    };
  },
  methods: {
    fetchData() {
       PortfolioService.getPortfolio().then(
        (portfolio => (this.portfolio = portfolio)
      ))
    }
    // handleSell(id) {
    //   console.log(id);
      
    //   PortfolioService.deletePortfolio(id).then ((reponce) => {
    //     let index = this.portfolio.findIndex(shares => shares._id == id)
    //   this.portfolio.splice(index, 1)
    //   })
    // }
    },

  mounted() {
    this.fetchData()

    eventBus.$on('buy-shares', (shares) => {this.portfolio.push(shares)
    })

    eventBus.$on('portfolio-deleted', (id) => {
      let index = this.portfolio.findIndex(shares => shares._id == id)
    this.portfolio.splice(index, 1)
    })

    // eventBus.$on('delete-shares', (id) => {
      
    // })

    
},

components: {
      'portfolio-details': PortfolioDetails
    }

    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
