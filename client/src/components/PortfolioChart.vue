<template>
  <div>
    <h1 id="chart-header">Stock Performance</h1>
    <!-- <button v-on:click="sortPortfolioByDate()">Sort Portfolio By Date</button>
    <button v-on:click="createDatesArray()">Create Dates Array</button>
    <button v-on:click="createChartData()">Initial Chart Data</button>
    <br>
    <button v-on:click="fetchStockDataFor('AAPL')">Fetch Stock Data</button>
    <button v-on:click="valueOnGivenDay('AAPL', '2020-03-20')">Daily Value</button>
    <button v-on:click="portfolioOnGivenDay('2020-04-14')">Portfolio Value On Date</button>
    <button v-on:click="calculateDailyValues('AMZN')">Chart Data for AAPL</button>
    <button v-on:click="fullChartData()">FULL CHART DATA</button>
    <button v-on:click="fetchNewData()">UPDATE CHART DATA</button>
    <button v-on:click="flagAdder()">flags</button> --->

    <highcharts :constructor-type="'stockChart'" :options="chartOptions" class="chart"></highcharts>
  </div>
</template>

<script>
import PortfolioService from "../../services/PortfolioService";
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
        chartData: [],

        stockDetails: {},
        stockTimeSeries: {},

        chartOptions: {
          chart: {
            type: 'line',
            backgroundColor: 'rgba(224,255,255,0.75)',
            borderWidth: 2
          },
          colors: 
            ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
            '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
          // title: {
          //   text: 'Daily Share Value'
          // },
          legend: {
            enabled: false
          },
          xAxis: {
            gridLineColor: 'rgba(100,100,100,0.75)',
            lineColor: 'rgba(100,100,100,0.75)'
          },
          yAxis: {
            title: {
              text: 'Total Value',
              enabled: true
            },
            gridLineColor: 'rgba(100,100,100,0.75)',
            lineColor: 'rgba(100,100,100,0.75)',
            floor: 0,
            labels: {
                formatter: function() {
                    return '$' + (this.value / 1000) + 'k';
                }
            }
          },
          tooltip: {
            crosshairs: [false, true]
          },
          series: [{}]
        }
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      // Fetches portfolio data.
      // setTimeout(demo, 5000);
      fetchData() {
        PortfolioService.getPortfolio()
        .then((data => (this.portfolioDetails = data)));
        setTimeout(this.fullChartData, 3000);
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
          // console.log(this.stockTimeSeries);
          // return "Yo, I'm done";
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

        // console.log(this.portfolioDetails);
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

        // console.log(this.datesArray);

        // const request = async () => {

        //   let query =
        //   "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&outputsize=fullsize&apikey=";
  
        //   const response = await fetch(
        //     `${query}${process.env.VUE_APP_API_KEY}`
        //   );
        //   const json = await response.json();
        //   this.stockDetails = json;
        //   this.stockTimeSeries = json["Time Series (Daily)"];

        //   let oldest_record_date = new Date(this.portfolioDetails[0]['date_and_time']);

        //   Object.keys(this.stockTimeSeries).forEach((date) => {
        //     let new_date = new Date(date);
        //     if (new_date >= oldest_record_date) {
        //       this.datesArray.push(date);
        //     }
        //   })

        //   console.log('dates array', this.datesArray);
        // }

        // request();

      },
      valueOnGivenDay(symbol, date) {
        let result = 0;
        Object.entries(this.stockTimeSeries).forEach(function(daily) {
          if (daily[0] == date) {
            result = daily[1]['4. close'];
          };
        });
        // console.log(daily[1]['4. close']);
        return result;
      },
      portfolioOnGivenDay(date) {
        let unix_date = new Date(date).getTime();
        let filteredPortfolio = [];

        this.portfolioDetails.forEach((record) => {
          if (record.unix_time < unix_date) {
            record.quantity = parseInt(record.quantity);
            filteredPortfolio.push(record);
          }
        });

        let arraysOfQuantities = [];
        let isIncludedAlready = false;

        filteredPortfolio.forEach((filtered) => {
          arraysOfQuantities.forEach((array) => {
            if (array[0] == filtered.ticker) {
              array[1] += filtered.quantity;
              isIncludedAlready = true;
            }
          });
          if (isIncludedAlready == false) {
            arraysOfQuantities.push(
              [filtered.ticker, filtered.quantity]
            )
          } else {
            isIncludedAlready = false;
          };
        });

        // console.log('filtered portfolio', arraysOfQuantities);
        return arraysOfQuantities;

      },
      createChartData() {

        let current_date = this.datesArray[this.datesArray.length - 1];

        let current_portfolio = this.portfolioOnGivenDay(current_date);
        let dataArray = [];

        current_portfolio.forEach((record) => {
            dataArray.push(
              {
                name: record[0],
                data: [],
                id: record[0],
                showInNavigator: true
              }
            )
        });

        this.chartData = dataArray;
        // console.log(this.chartData);
      },
      flagAdder() {
        if (this.portfolioDetails != undefined) {

          let current_date = this.datesArray[this.datesArray.length - 1];
          let current_portfolio = this.portfolioOnGivenDay(current_date);

          current_portfolio.forEach((company) => {
            this.chartData.push(
              {
                type : 'flags',
                data : [],
                onSeries : company[0],
                shape : 'flag'
              }
            )
          })

          this.portfolioDetails.forEach((record) => {

            this.chartData.forEach((object) => {
              if (object.type == "flags" && object.onSeries == record.ticker) {
                object.data.push(
                  {
                    x : (new Date(record.date_and_time).getTime()),      // Point where the flag appears
                    title : record.ticker + ' Buy', // Title of flag displayed on the chart 
                    text : 'Quantity: ' + record.quantity + ", Price: $" + record.price   // Text displayed when the flag are highlighted.
                  }
                )
              }
            })

              // this.chartData.push(
              //   {
              //     type : 'flags',
              //     data : [{
              //         x : (new Date(record.date_and_time).getTime()),      // Point where the flag appears
              //         title : record.quantity, // Title of flag displayed on the chart 
              //         text : 'Some details'   // Text displayed when the flag are highlighted.
              //     }],
              //     onSeries : record.ticker,  // Id of which series it should be placed on. If not defined 
              //                     // the flag series will be put on the X axis
              //     shape : 'flag'  // Defines the shape of the flags.
              //   }
              // )
          })
        };
        console.log('chart data', this.chartData);
      },
      calculateDailyValues(symbol) {

        const request = async () => {

          let query =
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
          symbol +
          "&outputsize=compact&apikey=";
  
          const response = await fetch(
            `${query}${process.env.VUE_APP_API_KEY}`
          );
          const json = await response.json();
          this.stockDetails = json;
          this.stockTimeSeries = json["Time Series (Daily)"];

          this.datesArray.forEach((date) => {
            let stock_value = parseInt(this.valueOnGivenDay(symbol, date));
            // console.log('value: ', stock_value);
            let portfolio_value = this.portfolioOnGivenDay(date);
            // console.log('portfolio on given day', portfolio_value);
            let value = 0;

            portfolio_value.forEach((company) => {
              if (company[0] == symbol) {
                value = (parseInt(stock_value) * company[1]);
                // console.log(`${stock_value} * ${company[1]} = ${value}?`)
              }
            });

            this.chartData.forEach((company) => {
              if (company['name'] == symbol && value != 0) {
                company['data'].push(
                  [new Date(date).getTime(), value]
                );
              };
            });
          });

        }
        request();

        // console.log('daily values', this.chartData);
      },
      fullChartData() {
        this.sortPortfolioByDate();
        this.createDatesArray();
        this.createChartData();

        this.chartData.forEach((company) => {
          this.calculateDailyValues(company.name);
        });

        this.flagAdder();
        this.fetchNewData();

        console.log('daily values', this.chartData);
      },
      fetchNewData: function () {
        this.chartOptions.series = this.chartData;
      }
    },
    components: {
      highcharts: Chart
    }
    // ,
    // watch: {
    //   portfolioDetails: function (old_val, new_val) {
    //     this.fullChartData();
    //   }
    // }
  }
</script>

<style scoped>

</style>