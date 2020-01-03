<template>
  <div class="detail-controls">
    <!-- Re-Activate Button -->
    <v-card class="activate-button" v-show="!show">
      <v-btn @click="show= !show" class="ma-2" text icon color="primary">
        <v-icon>mdi-triangle</v-icon>
      </v-btn>
    </v-card>

    <!-- Detail Controls -->
    <v-slide-x-reverse-transition>
      <v-card class="detail-card" v-show="show" transition="scroll-y-transition">
        <v-btn class="btn-close ma-2" @click="show= !show" text icon color="primary">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <p class="prodname mt-4 ml-4 mr-12">{{name}}</p>
        <v-row>
          <v-col sm="12">
            <v-text-field
              class="mt-2"
              id="name"
              label="Bezeichnung"
              v-model="name"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="3">
            <v-text-field id="short" label="Kürzel" v-model="short" outlined hide-details></v-text-field>
          </v-col>
          <v-col sm="9">
            <v-text-field id="imgpath" label="Icon/Bild" v-model="imgpath" outlined hide-details></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12">
            <div class="radio-container">
              <v-radio-group v-model="color" row>
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
  </div>
</template>

<script>
export default {
  name: "DetailControls",
  data() {
    return {
      show: false,
      name: "Stahlrohre",
      short: "ST",
      imgpath: "uploads/funztNochNicht.png",
      color: "blue"
    };
  }
};
</script>