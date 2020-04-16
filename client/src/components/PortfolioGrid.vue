<template>
  <div>
    <h1>Portfolio</h1>
      <div class="details">
        <portfolio-details class="shares" v-for="stock in portfolio" :key="stock._id" :stock="stock"/>
      </div>
      
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

.details {
  display: flex;
  flex-flow: row wrap;
}

.header {
  flex: 1;
  width: 100%;
}

.shares {
  margin: 5px;
  border-style: solid;
  border-color: aliceblue;
  background-color: rgba(52,100,200,0.5);
  width: 15em;
  text-align: center;
  
}
</style>
