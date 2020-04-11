<template>

 <div>
    <h2>share.name</h2>

    <div class="share-info">
      <p>Close: </p>
      <p>Date: </p>
      <p>Change percent:  </p>
      <p>Open:</p>
      <p>High</p>
      <p>Volume</p>
      
    </div>

      <div class="button">
      <form id="add-shares" v-on:submit.prevent="handleAddShares">
      		
      	<label for="add">Shares:</label>
      	<input min="0.0" step="1.0" type="number" required v-model="add" placeholder="Enter number "/>
      	
          <input type="submit" value="Add Shares" id="add"/>

      </form>

 </div>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


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
