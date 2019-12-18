<template>
  <div id="cy">
  </div>
</template>

<script>
import graph from '../vargraph'
export default {
  name: 'VarGraph',
  mounted: function(){
    graph.run()
  }
}
</script>
