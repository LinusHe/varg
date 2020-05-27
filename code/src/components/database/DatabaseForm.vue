<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1 darkmode-ign">
          <v-btn @click="axiosSave()">Hochladen</v-btn>
          <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Search"></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <div class="scrolling-container">
          <!-- <div> -->
          <v-row class="ma-0">
            <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="6" lg="6">
              <v-card>
                <v-card-title class="subheading font-weight-bold">{{ item.name }}<v-btn @click="loadGraph(item)">Laden</v-btn><v-btn @click="deleteGraph(item)">Löschen</v-btn></v-card-title>
                  <v-img
                    src="https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/UML-state-diagram-tutorial/FeaturedImage.png"
                  ></v-img>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                    <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                    <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === key }"
                    >{{ item[key.toLowerCase()] }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </template>

      <template v-slot:footer>
        <v-row class="mt-4 mb-2  mr-8  ml-5" align="center" justify="center">
          <span class="grey--text">Graphen pro Seite</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2 darkmode-ign" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">Seite <b>{{ page }}</b> von {{ numberOfPages }}</span>
          <v-btn fab dark small color="primary" class="mr-1 darkmode-ign" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark small color="primary" class="ml-1 darkmode-ign" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
/* eslint-disable standard/computed-property-even-spacing */
import axios from 'axios';
import ExJSon from "@/vargraph/JSonPersistence.js";

let dialogComponent;

export default {
  mounted () {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: [
        "Stückzahl",
        "Startzustand",
        "Endprodukt",
        "Bearbeitungsschritte",
        "Teile",
        "Autor"
      ],
      items: [
        {
          name: "Beispiel1",
          stückzahl: "45",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "16",
          teile: "12",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel2",
          stückzahl: "24",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "5",
          teile: "6",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel3",
          stückzahl: "9",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "1",
          teile: "2",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel4",
          stückzahl: "574",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "75",
          teile: "56",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel5",
          stückzahl: "1000",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "7",
          teile: "5",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel6",
          stückzahl: "7527",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "757",
          teile: "254",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel7",
          stückzahl: "2772",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "8",
          teile: "6",
          autor: "Prof. Mustermann"
        },
        {
          name: "Beispiel8",
          stückzahl: "75",
          startzustand: "Roheisen",
          endprodukt: "Stahlbolzen",
          bearbeitungsschritte: "3",
          teile: "4",
          autor: "Prof. Mustermann"
        }
      ]
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    }
  },
  methods: {
    //for bug-fix of wrong page number
    onChangePage(){
      //Seemingly deleting the graph on page 2 led to a value of zero with ceil?
      let val =Math.ceil(this.items.length/this.itemsPerPage);
      if(val < 1) val=1;
      this.page=val;
    },
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$refs["vargraph"];
    },
    loadItems() {
      this.items = [];
      axios
        .get('http://192.168.99.101:1110/VarG/graph/meta', {
          params: {
            user:'eheldt'
          }
        })
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            const el = response.data[i];
            const md = JSON.parse(el.metadata);
            this.items.push({
              'name': el.fileName,
              'stückzahl': md.prodQuant,
              'startzustand': md.start,
              'endprodukt': md.end,
              'bearbeitungsschritte': md.IDCount,
              'teile': md.IDCount,
              'autor': el.userName,
              'fileId': el.fileId
            });
            /* TODO somehow load preview image like this (not here but after "Show Image" button press on specific graph)
            let loadedGraph = cy.json(el);
            this.pngData = loadedGraph.png();*/
          }
        })
    },
    // TODO rename methods properly
    axiosSave() {
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.exportMenu.setActiveTab(1);
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.exportMenu.setdialog(true);
    },
    loadGraph(item) {
      if(confirm('Beim Laden wird der derzeitige Graph überschrieben. Wirklich den Graph "'+item.name+'" aus der Datenbank laden?')) {
        const url = 'http://192.168.99.101:1110/VarG/graph/' + item.fileId;
        axios
          .get(url, {
            params: {
              user: 'eheldt'
            }
          })
          .then(response => {
            ExJSon.LoadJSon(response.data[0].graphObject, this.getGraph());
            this.$parent.$parent.$parent.$parent.closeDialog();
            dialogComponent.dialogSuccess('Graph erfolgreich aus Datenbank geladen');
          })
          .catch(error => {
            dialogComponent.dialogError('Laden fehlgeschlagen');
          });
      }
    },
    deleteGraph (item) {
      if(confirm('Wirklich den Graph "'+item.name+'" unwiderruflich aus der Datenbank löschen?')) {
        const url = 'http://192.168.99.101:1110/VarG/graph/' + item.fileId;
        axios
          .delete(url, {
            params: {
              user: 'eheldt'
            }
          })
          .then(response => {
            this.loadItems();
            dialogComponent.dialogSuccess('Graph erfolgreich von Datenbank gelöscht');
            this.onChangePage();
          })
          .catch(error => {
            dialogComponent.dialogError('Löschen fehlgeschlagen');
          });
      }
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    backBtn(number) {
      
    }
  }
};
</script>