<template>
  <div class="detail-controls">
    <!-- ONLY FOR TESTING! @TODO -->
    <v-card style="position: absolute; top: -100px; right: 50px" max-width="400">
      <v-card-title>Test!</v-card-title>
      <v-card-text>
        <p>Später sollen die Funktionalität der Buttons an den Cytoscape Graphen angebunden werden</p>
        <v-btn @click="nodeprop = true; edgeprop = false">klick auf knoten</v-btn>
        <v-btn @click="nodeprop = false; edgeprop = true">klick auf kante</v-btn>
      </v-card-text>
    </v-card>

    <!-- Re-Activate Button -->
    <!-- <v-card class="activate-button" v-show="reopen">
      <v-btn @click="show= !show" class="ma-2" text icon color="primary">
        <v-icon>mdi-triangle</v-icon>
      </v-btn>
    </v-card>-->

    <!-- Detail-Zustand Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-click-outside="nodeprop" v-show="nodeprop" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="nodeprop= false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Zustandseigenschaften</p>
        <p class="prodname ml-3 mr-12 mb-0">{{nodename}}</p>

        <!-- Name Selection -->
        <v-row>
          <v-col sm="12">
            <v-text-field
              class="mt-2"
              id="nodename"
              label="Bezeichnung"
              v-model="nodename"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Shortcut & Icon Upload -->
        <v-row>
          <v-col sm="3">
            <v-text-field id="nodeshort" label="Kürzel" v-model="nodeshort" outlined hide-details></v-text-field>
          </v-col>
          <v-col sm="9">
            <v-text-field
              id="nodeimgpath"
              label="Icon/Bild"
              v-model="nodeimgpath"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Color Selection -->
        <v-row>
          <v-col sm="12">
            <div class="radio-container">
              <label for="nodecolor" class="color-label v-label v-label--active theme--light">Farbe</label>
              <v-radio-group v-model="nodecolor" id="nodecolor" row>
                <v-radio class="color-radio-blue" color="blue" value="blue"></v-radio>
                <v-radio class="color-radio-green" color="green" value="green"></v-radio>
                <v-radio class="color-radio-purple" color="purple" value="purple"></v-radio>
                <v-radio class="color-radio-pink" color="pink" value="pink"></v-radio>
                <v-radio class="color-radio-red" color="red" value="red"></v-radio>
                <v-radio class="color-radio-orange" color="orange" value="orange"></v-radio>
                <v-radio class="color-radio-yellow" color="yellow" value="yellow"></v-radio>
                <v-radio class="color-radio-lightyellow" color="lightyellow" value="lightyellow"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-slide-x-reverse-transition>

    <!-- Detail-Verbindung Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="edgeprop" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="edgeprop= false" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <!-- Headline -->
        <p class="ml-3 mb-0 font-weight-light font-italic">Verbindungseigenschaften</p>
        <p class="prodname ml-3 mr-12 mb-0">{{edgename}}</p>

        <!-- Name Selection -->
        <v-row>
          <v-col sm="9">
            <v-text-field
              class="mt-2"
              id="edgename"
              label="Bezeichnung"
              v-model="edgename"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="3">
            <v-text-field
              class="mt-2"
              id="edgeshort"
              label="Kürzel"
              v-model="edgeshort"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        
        <!-- Start und Endzustand -->
        <v-row>
          <v-col sm=12>
          <v-select v-model="startSelect" :items="items" outlined label="Startzustand" hide-details></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm=12>
          <v-select v-model="endSelect" :items="items" label="Endzustand" outlined hide-details></v-select>
          </v-col>
        </v-row>

        <!-- Time & Costs  -->
        <v-row>
          <v-col sm="6">
            <v-text-field
              id="edgetime"
              label="Kosten / Stück"
              suffix="€"
              v-model="edgetime"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6">
            <v-text-field
              id="edgecosts"
              label="Zeit / Stück"
              suffix="Sek."
              v-model="edgecosts"
              outlined
              hint="Einheit ist in den Einstellungen wählbar"
            ></v-text-field>
          </v-col>
        </v-row>

      </v-card>
    </v-slide-x-reverse-transition>
  </div>
</template>

<script>
export default {
  name: "DetailControls",
  data() {
    return {
      nodeprop: false,
      nodename: "Stahlrohre",
      nodeshort: "ST",
      nodeimgpath: "uploads/funztNochNicht.png",
      nodecolor: "blue",
      edgeprop: false,
      edgename: "Maschinelles Walzen",
      edgeshort: "MWA",
      items: ["Stahlrohre", "Gewahlzter Stahl"],
      startSelect: "Stahlrohre",
      endSelect: "Gewahlzter Stahl",
    };
  }
};
</script>