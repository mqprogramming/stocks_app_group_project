<template>
  <div>
    <h1>Chart</h1>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'


  export default {
    name: 'portfolio-chart',
    data(){
      return {
        chartOptions: {
          series: [{
            data: [1,2,3,4,5] // sample data
          }]
        }
      }
    },
    components: {
      highcharts: Chart 
    }
  }
</script>

<style scoped>

</style>