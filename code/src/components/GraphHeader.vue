<template>
  <div class="header-graph-container">
    <div id="headertext_out">
      <div id="headertext_in">
      <p align="left"  id="produkt">Produkt: <span>{{prodName}}</span></p>
      <p align="left" id="anzahl">Anzahl: <span>{{prodQuant}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main.js"

export default {
  name: 'GraphHeader',
  data() {
    return {
      prodName: "",
      prodQuant: 0
    }
  },
  created() {
    eventBus.$on("updateHeader", (newProdName, newProdQuant) => {
      this.prodName = newProdName
      this.prodQuant = newProdQuant
    })
  }
}
</script>