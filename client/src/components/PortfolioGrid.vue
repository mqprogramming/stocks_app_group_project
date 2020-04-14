<template>
  <div class="details">
    <h1>Portfolio</h1>
    <!-- <h2>All the details!</h2> -->
    <!-- <ul> -->
      <portfolio-details class="shares" v-for="stock in portfolio" :key="stock._id" :stock="stock"/>
    <!-- </ul> -->
       <!-- <li>Ticker: {{ stock.ticker }}</li> -->
        <!--  <li>Name: {{ stock.name }}</li>
        <li> Price: {{ stock.price }}</li>
        <li>Quantity: {{ stock.quantity }}</li>
        <li> Date: {{ stock.date_and_time }}</li>
        <li> <button v-on:click="handleSell(stock._id)">Sell</button> </li> -->
      <!-- </ul>  -->
      
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

    eventBus.$on('buy-shares', (stock) => {
      this.portfolio.push(stock)
    })

    eventBus.$on('portfolio-deleted', (id) => {
      let index = this.portfolio.findIndex(stock => stock._id === id)
      this.portfolio.splice(index, 1)
    })
},

components: {
      'portfolio-details': PortfolioDetails
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
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
} */

.details {
  display: flex;
}

.header {
  flex: 1;
  width: 100%;
}

.shares {
  flex: 2;
  margin: 5px;
  border-style: solid;
  border-color: aliceblue;
  background-color: #1C3144;
  width: 200px;
  text-align: center;
  
}
</style>
