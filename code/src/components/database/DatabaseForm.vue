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
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
          ></v-text-field>
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
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
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

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'name',
        keys: [
          'Stückzahl',
          'Startzustand',
          'Endzustand',
          'Kantenanzahl',
          'Knotenanzahl',
          'Autor',
        ],
        items: [
          {
            name: 'Beispiel1',
            stückzahl: '45',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'16',
            knotenanzahl:'12',
            autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel2',
            stückzahl: '24',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'5',
            knotenanzahl:'6',
             autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel3',
            stückzahl: '9',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'1',
            knotenanzahl:'2',
             autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel4',
            stückzahl: '574',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'75',
            knotenanzahl:'56',
             autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel5',
            stückzahl: '1000',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'7',
            knotenanzahl:'5',
             autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel6',
            stückzahl: '7527',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'757',
            knotenanzahl:'254',
             autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel7',
            stückzahl: '2772',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'8',
            knotenanzahl:'6',
             autor:'Prof. Mustermann',
          },
          {
            name: 'Beispiel8',
            stückzahl: '75',
            startzustand: 'Roheisen',
            endzustand: 'Stahlbolzen',
            kantenanzahl:'3',
            knotenanzahl:'4',
             autor:'Prof. Mustermann',
          },
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== `Name`)
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
  }
</script>