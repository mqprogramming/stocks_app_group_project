<template>
  <div>
    <h1>Chart</h1>
    <button v-on:click="sortPortfolioByDate()">Sort Portfolio By Date</button>
    <button v-on:click="createDatesArray()">Create Dates Array</button>
    <button v-on:click="fetchStockDataFor('AAPL')">Fetch Stock Data</button>
    <button v-on:click="valueOnGivenDay('AAPL', '2020-19-03')">Daily Value</button>
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
        portfolioDetails: [],
        datesArray: [],
        stockDetails: [],
        stockTimeSeries: [],

        chartOptions: {
          title: {
            text: 'Test Title'
          },
          series:
            [
              {
                // Test Data
                name: 'APPLE',
                data: [
                  [new Date('2015-08-01').getTime(), 25],
                  [new Date('2015-08-02').getTime(), 27],              
                  [new Date('2015-08-03').getTime(), 29],              
                  [new Date('2015-08-05').getTime(), 21],
                  [new Date('2015-09-01').getTime(), 25],
                  [new Date('2015-10-02').getTime(), 27],              
                  [new Date('2018-04-08 13:25:00').getTime(), 29]
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
    mounted() {
      this.fetchData();
    },
    methods: {
      // Fetches portfolio data.
      fetchData() {
        fetch("http://localhost:3000/api/shares-portfolio")
          .then(response => response.json())
          .then(data => (this.portfolioDetails = data));
      },
      fetchStockDataFor(symbol) {
        let query =
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
        symbol +
        "&outputsize=compact&apikey=";

        const request = async () => {
          const response = await fetch(
            `${query}${process.env.VUE_APP_API_KEY}`
          );
          const json = await response.json();
          this.stockDetails = json;
          this.stockTimeSeries = json["Time Series (Daily)"];
        };

        request();
      },
      // Sorts array of objects by key.
      sortingFunction(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }

          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      },
      // Sorts portfolio objects by date & time.
      sortPortfolioByDate() {
        this.portfolioDetails.forEach((record) => {
          let unix_time = new Date(record['date_and_time']).getTime();
          record['unix_time'] = unix_time;
        });
        this.portfolioDetails.sort(this.sortingFunction('unix_time'));

        console.log(this.portfolioDetails);
      },
      // Creates an array of dates from oldest portfolio record to current day.
      createDatesArray() {
        function appendLeadingZeroes(n){
          if(n <= 9){
            return "0" + n;
          }
          return n
        };

        function formatDate(date){
          return date.getFullYear() + "-" + appendLeadingZeroes(date.getMonth() + 1) + "-" + appendLeadingZeroes(date.getDate());
        };

        let current_datetime = new Date();
        let formatted_date = formatDate(current_datetime);
        let last_pushed_date = this.portfolioDetails[0]['date_and_time'];
        this.datesArray.push(last_pushed_date);

        while (new Date(formatted_date).getTime() > new Date(last_pushed_date).getTime()) {
          let last_pushed_date_unix = new Date(last_pushed_date).getTime();
          let to_push_date_unix = last_pushed_date_unix + 86400000; // plus one day in ms
          let to_push_date = formatDate(new Date(to_push_date_unix));
          this.datesArray.push(to_push_date);
          last_pushed_date = to_push_date;
        };

        console.log(this.datesArray);
      },
      valueOnGivenDay(symbol, date) {
        this.stockTimeSeries.forEach((daily) => {
          if (Object.keys(daily)[0] == date) {
            return daily['4. close']
          }
        })
      }
    },
    components: {
      highcharts: Chart
    }
  }
</script>

<style scoped>

</style>