<template>

  <div id="app">
    <div><a href="searchPage.html">Search Page</a></div>
    <div><a href="stockDetailsPage.html">Your Stock Details Page</a></div>
    
    <h1>Title</h1>

    <div class="container">
      
      

     <div>
    <portofolio-graph id="pie-chart"></portofolio-graph>
     </div>

       
  
  
</div>

    
  </div>


</template>

<script>
import MainGraph from './components/MainChart';

export default {
	
	components: {
		'portofolio-graph': MainGraph
	}
};


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
