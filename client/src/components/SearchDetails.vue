<template>
  <div>

  </div>
</template>

<script>
export default {
    name: 'search-details',
    data() {
        return {
            stockDetails: []
        }
    },

    mounted() {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.VUE_APP_API_KEY}`)
        .then(res => res.json)
        .then(stockData => this.stockDetails = stockData )
    }

}
</script>

<style>

</style>