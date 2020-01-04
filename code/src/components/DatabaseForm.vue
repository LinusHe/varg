<template>
 <div class="database">
        <v-row>
        <v-col sm="1" />
          <v-col align="left" id="First">
     <!-- <img class="rectangle" src="../assets/img/g.png" @click="selected(0)"/>
      <img  class="rectangle"  src="../assets/img/g.png" @click="selected(1)" style="left:280px"/>
      <img  class="rectangle"  src="../assets/img/g.png" @click="selected(2)" style="left:430px"/>
      <img  class="rectangle"  src="../assets/img/g.png" @click="selected(3)" style="left:580px"/>
      <img  class="rectangle"  src="../assets/img/g.png" @click="selected(4)" style="top:260px"/>
      <img  class="rectangle"  src="../assets/img/g.png" @click="selected(5)" style="top:260px; left:280px"/>
      <img  class="rectangle"  src="../assets/img/g.png" @click="selected(6)" style="top:260px; left:430px"/>-->

    </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
   name: 'datenbank',
  methods:{
    selected:function(id){
      alert(id + " selsected!");
    }
  }
}
</script>
