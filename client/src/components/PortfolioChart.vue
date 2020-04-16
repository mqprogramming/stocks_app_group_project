<template>
  <div>
    <h1 id="chart-header">Stock Performance</h1>
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
        };

        request();
      },
      // Sorts array of objects by key.
      sortingFunction(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
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

      },
      // Returns stock value on a given day
      valueOnGivenDay(symbol, date) {
        let result = 0;
        Object.entries(this.stockTimeSeries).forEach(function(daily) {
          if (daily[0] == date) {
            result = daily[1]['4. close'];
          };
        });
        return result;
      },
      // Compiles and shows portfolio totals on a given day
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

        return arraysOfQuantities;

      },
      // Creates initial chart data for companies in portfolio
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
      },
      // Adds flags at times when stock is bought
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
          })
        };
        console.log('chart data', this.chartData);
      },
      // Produces data array for a given company
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
            let portfolio_value = this.portfolioOnGivenDay(date);
            let value = 0;

            portfolio_value.forEach((company) => {
              if (company[0] == symbol) {
                value = (parseInt(stock_value) * company[1]);
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

      },
      // Generates and inserts the full set of chart data
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
  }
</script>

<style scoped>

</style>