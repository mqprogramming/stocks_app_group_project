<template>
  <div>
    <h1>Portfolio</h1>
    <!-- <h2>All the details!</h2> -->
    <!-- <ul> -->
      <div class="details">
        <portfolio-details class="shares" v-for="stock in portfolio" :key="stock._id" :stock="stock"/>
      </div>
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
  background-color: rgba(52,100,200,0.5);
  width: 200px;
  text-align: center;
  
}
</style>
