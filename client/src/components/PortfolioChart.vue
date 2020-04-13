<template>
  <div>
    <h1>Chart</h1>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
 
stockInit(Highcharts)

  export default {
    name: 'portfolio-chart',
    data(){
      return {
        chartOptions: {
          title: {
            text: 'Test Title'
          },
          series:
            [
              {
                name: 'APPLE',
                data: [
                  [new Date('2015-08-01').getTime(), 25],
                  [new Date('2015-08-02').getTime(), 27],              
                  [new Date('2015-08-03').getTime(), 29],              
                  [new Date('2015-08-05').getTime(), 21],
                  [new Date('2015-09-01').getTime(), 25],
                  [new Date('2015-10-02').getTime(), 27],              
                  [new Date('2015-11-03').getTime(), 29]
                ]
              },
              {
                name: 'MICROSOFT',
                data: [
                  [new Date('2015-08-01').getTime(), 21],
                  [new Date('2015-08-02').getTime(), 22],              
                  [new Date('2015-08-03').getTime(), 31],              
                  [new Date('2015-08-05').getTime(), 23],
                  [new Date('2015-09-01').getTime(), 26],
                  [new Date('2015-10-02').getTime(), 28],              
                  [new Date('2015-11-03').getTime(), 19]
                ]
              },
              {
                name: 'TOTAL',
                data: [
                  [new Date('2015-08-01').getTime(), 70],
                  [new Date('2015-08-02').getTime(), 65],              
                  [new Date('2015-08-03').getTime(), 68],              
                  [new Date('2015-08-05').getTime(), 71],
                  [new Date('2015-09-01').getTime(), 72],
                  [new Date('2015-10-02').getTime(), 63],              
                  [new Date('2015-11-03').getTime(), 59]
                ]
              }
            ]
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