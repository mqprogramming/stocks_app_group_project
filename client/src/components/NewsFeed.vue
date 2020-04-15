<template>
  
</template>

<script>
export default {
    name: 'news-feed',
    data() {
        return{
            query: "",
            symbol: 'ibm'
        }
    },
    mounted() {
      thisQuery =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=i" +
        this.symbol +
        "&api-key=";
      const request = async () => {
        const response = await fetch( `${this.query}${process.env.nyt_api_key}`);
        const json = await response.json();
        console.log(json);
        
      }
    }
}
</script>

<style>

</style>