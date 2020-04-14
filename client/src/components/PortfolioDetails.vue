<template>
  <div class="details">
    <h1>Portfolio details</h1>
    <h2>All the details!</h2>
      <ul v-for="stock in portfolio" v-bind:key="stock._id">
        <li>Ticker: {{ stock.ticker }}</li>
        <li>Name: {{ stock.name }}</li>
        <li> Price: {{ stock.price }}</li>
        <li>Quantity: {{ stock.quantity }}</li>
        <li> Date: {{ stock.date_and_time }}</li></ul>
  </div>
</template>

<script>
export default {
  name: "portfolio-details",
  data() {
    return {
      portfolio: ""
    };
  },
  methods: {
    fetchData() {
      fetch("http://localhost:3000/api/shares-portfolio")
        .then(response => response.json())
        .then(portfolio => (this.portfolio = portfolio));
    }
  },
  mounted() {
    this.fetchData();
  }
};
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
