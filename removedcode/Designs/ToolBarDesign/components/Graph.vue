<template>
  <v-app id="inspire">
    <NavigationDrawer ref="navigationDrawer" />

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      flat
      color="white"
    >
      <v-app-bar-nav-icon class="ml-1" @click.stop="toggleDrawer()"/>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">varg :: Variantengraph-Editor</span>
      </v-toolbar-title>
      <!--      <v-text-field-->
      <!--        flat-->
      <!--        solo-inverted-->
      <!--        hide-details-->
      <!--        prepend-inner-icon="mdi-magnify"-->
      <!--        label="Search"-->
      <!--        class="hidden-sm-and-down"-->
      <!--      />-->
      <v-card flat light>
        <GraphHeader ref="graphHeader"/>
      </v-card>
      <v-spacer/>
      <v-btn icon>
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height dotted-background"
      >

        <VarGraph ref="vargraph"/>

        <v-row
          align="center"
          justify="center"
        >


          <!-- Controls:  -->
          <CreateControls ref="createControls"/>
          <DetailControls ref="detailControls"/>
          <ZoomControls ref="zoomControls"/>

          <!-- Menus:  -->
          <NewGraphMenu ref="newGraphMenu"/>
          <SaveMenu ref="saveMenu"/>
          <DownloadMenu ref="downloadMenu"/>
          <RightClickMenu ref="rightClickMenu"/>
          <SettingsMenu ref="settingsMenu"/>

        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import VarGraph from "./elements/VarGraph"
  import NavigationDrawer from "./elements/NavigationDrawer";
  import GraphHeader from "./elements/GraphHeader";
  import CreateControls from "./controls/CreateControls";
  import DetailControls from "./controls/DetailControls";
  import ZoomControls from "./controls/ZoomControls";
  import NewGraphMenu from "./menus/NewGraphMenu";
  import SaveMenu from "./menus/SaveMenu";
  import DownloadMenu from "./menus/DownloadMenu";
  import RightClickMenu from "./menus/RightClickMenu";
  import SettingsMenu from "./menus/SettingsMenu";

  export default {
    name: "NodeControls",
    components: {
      VarGraph,
      NavigationDrawer,
      GraphHeader,
      CreateControls,
      DetailControls,
      NewGraphMenu,
      SaveMenu,
      DownloadMenu,
      RightClickMenu,
      ZoomControls,
      SettingsMenu
    },
    props: {
      source: String,
    },
    methods: {
      toggleDrawer() {
        this.$refs.navigationDrawer.toggleDrawer();
      }
    }
  }
</script>
