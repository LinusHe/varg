<template>
  <div>
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
            <v-btn v-if="type === 1" class="pl-1 pr-1" text @click="openExportDB()">
              <v-icon class="mr-1">mdi-database-import</v-icon>Hochladen
            </v-btn>
            <v-divider v-if="type === 1" class="ml-4 mr-5" vertical></v-divider>
            <v-text-field v-model="search" clearable flat solo-inverted hide-details label="Suchen"></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                label="Sortieren nach"
              ></v-select>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-btn large depressed color="blue" :value="false">
                  <v-icon>mdi-sort-ascending</v-icon>
                </v-btn>
                <v-btn large depressed color="blue" :value="true">
                  <v-icon>mdi-sort-descending</v-icon>
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <div v-if="!props.items.length" style="min-height: 500px;">
            TODO why is this not showing? (this is supposed to preserve the height of the Database window even when no items are loaded,
            but for some reason this div never shows)
          </div>
          <div v-else class="scrolling-container">
            <!-- <div> -->
            <v-row class="ma-0">
              <v-col
                v-for="item in props.items"
                :key="item.graphname"
                cols="12"
                sm="6"
                md="6"
                lg="6"
              >
                <v-card>
                  <v-card-title
                    class="subheading font-weight-bold"
                    :class="{ 'blue--text': sortBy === 'Graphname' }"
                  >{{ item.graphname }}</v-card-title>
                  <div id="image-render" style="display: none;"></div>
                  <v-img v-if="item.image" v-bind:src="item.image" class="mx-5"></v-img>
                  <v-list v-else dense>
                    <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                      <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                      <v-list-item-content
                        class="align-end"
                        :class="{ 'blue--text': sortBy === key }"
                      >{{ item[key.toLowerCase()] }}</v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-row justify="space-around">
                    <v-col sm="3">
                      <v-btn
                        class="darkmode-ign"
                        color="green darken-1"
                        text
                        @click="loadGraph(item)"
                      >Laden</v-btn>
                    </v-col>
                    <v-col sm="3">
                      <v-btn
                        v-if="item.image"
                        class="darkmode-ign"
                        color="blue"
                        text
                        @click="item.image = null"
                      >Nicht mehr anzeigen</v-btn>
                      <v-btn
                        v-else
                        class="darkmode-ign"
                        color="blue"
                        text
                        @click="loadImage(item)"
                      >Anzeigen</v-btn>
                    </v-col>
                    <v-col sm="3">
                      <v-btn
                        class="darkmode-ign"
                        color="error"
                        text
                        @click="deleteRequest(item)"
                      >Löschen</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </template>

        <template v-slot:footer>
          <v-row class="mt-4 mb-2 mr-8 ml-5" align="center" justify="center">
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

            <span class="mr-2 grey--text">Neu laden</span>
            <v-btn fab dark small color="primary" class="mr-1 darkmode-ign" @click="loadItems()">
              <v-icon>mdi-database-refresh</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Seite
              <b>{{ page }}</b>
              von {{ numberOfPages }}
            </span>
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
    <!-- Rewrite Dialog -->
    <v-dialog v-model="rewriteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Graph importieren</v-card-title>
        <v-card-text>
          Beim Laden wird der derzeitige Graph überschrieben.
          <br />
          <b>Wirklich den Graph {{tempItem.graphname}} aus der Datenbank laden?</b>
          <br />
          <em>Diese Aktion kann nicht rückgängig gemacht werden.</em>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="rewriteGraph()">Graph Laden</v-btn>
          <v-btn color="grey" text @click="rewriteDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Import Dialog -->
    <v-dialog v-model="importDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Graph importieren</v-card-title>
        <v-card-text>
          <b>Soll der Graph '{{tempItem.graphname}}' aus der Datenbank geladen werden?</b>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="importGraph()">Graph Laden</v-btn>
          <v-btn color="grey" text @click="importDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Graph löschen</v-card-title>
        <v-card-text>
          <b>Soll der Graph '{{tempItem.graphname}}' unwiderruflich aus der Datenbank gelöscht werden?</b>
          <br />
          <em>Diese Aktion kann nicht rückgängig gemacht werden.</em>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteGraph()">Graph Löschen</v-btn>
          <v-btn color="grey" text @click="deleteDialog = false">Abbrechen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable standard/computed-property-even-spacing */
import cytoscape from "cytoscape";
import axios from "axios";
import ExJSon from "@/vargraph/JSonPersistence.js";
import FileManager from "@/vargraph/importExport/FileManager.js";

let dialogComponent;

export default {
  mounted() {
    // dialogComponent has to be called differently based on if the DB GUI was opened from HomeMenu or GraphHeader
    try {
      dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
        .$parent.$parent.$parent.$refs.dialogs; // opened from GraphHeader
    } catch (e) {
      dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$parent
        .$refs.dialogs; // opened from HomeMenu
    }
  },
  data() {
    return {
      type: -1,
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "",
      tempItem: {
        graphname: "not selected..."
      },
      keys: [
        "Graphname",
        "Produktname",
        "Stückzahl",
        // the following values are possible metadata to show and sort by, but are not being saved in the graph.json yet
        //"Startzustand",
        //"Endprodukt",
        //"Bearbeitungsschritte",
        //"Teile",
        "Autor"
      ],
      items: [],
      rewriteDialog: false,
      importDialog: false,
      deleteDialog: false
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Graphname`);
    }
  },
  methods: {
    //for bug-fix of wrong page number
    onChangePage() {
      //Seemingly deleting the graph on page 2 led to a value of zero with ceil?
      let val = Math.ceil(this.items.length / this.itemsPerPage);
      if (val < 1) val = 1;
      this.page = val;
    },
    // get the current cytoscape graph instance
    getGraph() {
      return this.$parent.$parent.$parent.$parent.$parent.$parent.$refs
        .vargraph;
    },
    // sets the type of the Database GUI based on where it's called from
    setType(t) {
      // t = 0: window (called from HomeMenu)
      // t = 1: menu (called from GraphHeader)
      this.type = t;
    },
    // requesting metadata from all graphs of a given user to list in the DB GUI
    loadItems() {
      this.items = []; // emptying the graph-items array so we can simply push incoming data to the end of it
      axios // axios.get HTTP request to our webserver API (see docker/node.js/api.js)
        .get("http://192.168.99.101:1110/VarG/graph/meta", {
          params: {
            user: this.$store.state.user.name // appending login session data for DB access control
          }
        })
        // if request was succesfull and we got a response, we will then process the response here
        .then(response => {
          // looping through the response array and pushing the different data of each entry on the graph-items array
          for (let i = 0; i < response.data.length; i++) {
            const el = response.data[i];
            const md = JSON.parse(el.metadata);
            this.items.push({
              graphname: el.fileName,
              produktname: md.prodName,
              stückzahl: md.prodQuant,
              // as mentioned above, these metadata are not being saved to graph.json yet
              //'startzustand': md.start,
              //'endprodukt': md.end,
              //'bearbeitungsschritte': md.IDCount,
              //'teile': md.IDCount,
              autor: el.userName,
              image: null
            });
          }
        })
        // if anything went wrong while sending the request or processing the response, we will catch it and print an error message here
        .catch(error => {
          dialogComponent.dialogError("Laden der Datenbank fehlgeschlagen");
        });
    },
    // opening the export menu with the database tab open
    openExportDB() {
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.exportMenu.setActiveTab(
        1
      );
      this.$parent.$parent.$parent.$parent.$parent.$parent.$refs.exportMenu.setdialog(
        true
      );
    },
    // requesting a specific graph with the given filename to load into the current cytoscape instance
    loadGraph(item) {
      if (this.type === 1) {
        // execution of the axios request is slightly different based on if we are in the DB menu (here) or window (else)
        this.tempItem = item;
        this.rewriteDialog = true;
      } else if (this.type === 0) {
        // we are in the DB window (opened from HomeMenu)
        this.tempItem = item;
        this.importDialog = true;
      }
    },
    rewriteGraph() {
      let item = this.tempItem;
      const url = "http://192.168.99.101:1110/VarG/graph/" + item.graphname;
      axios
        .get(url, {
          params: {
            user: this.$store.state.user.name
          }
        })
        .then(response => {
          ExJSon.LoadJSon(
            response.data[0].graphObject,
            this.getGraph(),
            dialogComponent
          ); // calling the LoadJSon function in JSonPersistence.js to overwrite the current cytoscape instance with the received graph
          this.$parent.$parent.$parent.$parent.closeDialog(); // closing the DB menu
          dialogComponent.dialogSuccess(
            "Graph erfolgreich aus Datenbank geladen"
          );
        })
        .catch(error => {
          dialogComponent.dialogError("Laden des Graphen fehlgeschlagen");
        });
    },
    importGraph() {
      let item = this.tempItem;
      const url = "http://192.168.99.101:1110/VarG/graph/" + item.graphname;
      axios
        .get(url, {
          params: {
            user: this.$store.state.user.name
          }
        })
        .then(response => {
          ExJSon.LoadJSon(response.data[0].graphObject, null, dialogComponent); // here we pass 'null' as the cytoscape instance because we aren't in the main graph window which means there's nothing loaded yet
          dialogComponent.dialogSuccess(
            "Graph erfolgreich aus Datenbank geladen"
          );
        })
        .catch(error => {
          dialogComponent.dialogError("Laden des Graphen fehlgeschlagen");
        });
    },
    // similar to loadGraph with the difference being that we don't load the received graph into our cytoscape instance
    // but instead convert it to an image and show it in the DB GUI
    loadImage(item) {
      const url = "http://192.168.99.101:1110/VarG/graph/" + item.graphname;
      axios
        .get(url, {
          params: {
            user: this.$store.state.user.name
          }
        })
        .then(response => {
          let graph = JSON.parse(response.data[0].graphObject);
          let cy = cytoscape({
            container: document.getElementById("image-render")
          }); // creating a new cytoscape object that renders in an invisible div container
          cy.json(graph); // loading the received graph data into the new cytoscape object
          FileManager.changeStyleForExport(cy); // using FileManager.js to adjust some values for image conversion
          // two things happen in the following if condition:
          // 1. cytoscape converts the graph to a png image and assigns it to the image value of the given graph-item (from the graph-items array)
          // 2. it is then being checked if that image value equals 'data:,' which means the graph is empty (no nodes and edges) and thus the image is also empty
          if ((item.image = cy.png({ full: true, scale: 1.5 })) === "data:,") {
            item.image = null; // if the image is empty Vue will throw an error when attempting to show it, so it is instantly being reset to 'null'
            throw "Empty image"; // and a custom error is being thrown so we can show a more precise error message below
          }
        })
        .catch(error => {
          if (error === "Empty image") {
            dialogComponent.dialogError(
              "Laden des Bildes fehlgeschlagen: <b>Leerer Graph</b>"
            );
          } else {
            dialogComponent.dialogError("Laden des Bildes fehlgeschlagen");
          }
        });
    },
    // requesting to delete the graph from the DB
    deleteRequest(item) {
      this.tempItem = item;
      this.deleteDialog = true;
    },
    deleteGraph() {
      let item = this.tempItem;
      const url = "http://192.168.99.101:1110/VarG/graph/" + item.graphname;
      axios // axios.delete request
        .delete(url, {
          params: {
            user: this.$store.state.user.name
          }
        })
        .then(response => {
          this.loadItems(); // refreshing the graph-items array to remove the deleted graph from the list
          dialogComponent.dialogSuccess(
            "Graph erfolgreich von Datenbank gelöscht"
          );
          this.onChangePage(); // checking if the current shown page in the GUI needs to be updated
        })
        .catch(error => {
          dialogComponent.dialogError("Löschen fehlgeschlagen");
        });
      this.deleteDialog = false;
    },
    // algorithms to handle page changes in the GUI
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    backBtn(number) {}
  }
};
</script>