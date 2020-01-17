<template>
  <div class="rightclick-menu">
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list>
        <v-subheader v-show="visibleTitle">{{ menuTitle }}</v-subheader>
        <v-list-item v-for="(item, index) in items" :key="index" @click="clickedItem(item.id)">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import graph from "@/vargraph/index.js";
export default {
  name: "RightClickControls",
  data() {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      visibleTitle: false,
      menuTitle: "",
      items: [],
      targetID: ""
    };
  },
  methods: {
    backgroundMenu() {
      this.visibleTitle = false;
      this.items = [
        { id: "b1", title: "Neuer Zustand", icon: "mdi-plus-circle-outline" },
        { id: "b2", title: "Neue Verknüpfung", icon: "mdi-link-variant-plus" }
      ];
    },
    nodeMenu(node) {
      this.visibleTitle = true;
      this.menuTitle = "Zustand: " + node.data("name");
      this.items = [
        { id: "n1", title: "Bearbeiten", icon: "mdi-pencil" },
        { id: "n2", title: "Löschen", icon: "mdi-delete" }
      ];
    },
    edgeMenu(edge) {
      this.visibleTitle = true;
      this.menuTitle = "Verbindung: " + edge.data("name");
      this.items = [
        { id: "e1", title: "Bearbeiten", icon: "mdi-pencil" },
        { id: "e2", title: "Löschen", icon: "mdi-delete" }
      ];
    },
    openMenu(e, target) {
      if (target === graph.getCytoGraph()) {
        this.backgroundMenu();
      } else if (target.group() == "nodes") {
        this.targetID = target.data("id");
        this.nodeMenu(target);
      } else if (target.group() == "edges") {
        this.targetID = target.id();
        this.edgeMenu(target);
      }
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    clickedItem(clickId) {
      if (clickId == "n1") {
        // Edit Node
        this.$parent.$refs.detailConrols.openNodeDetails(
          graph.getCytoGraph().getElementById(this.targetID)
        );
      } else if (clickId == "n2") {
        // Delete Node
        this.$parent.$refs.detailConrols.loadNodeData(
          graph.getCytoGraph().getElementById(this.targetID)
        );
        this.$parent.$refs.detailConrols.openNodeDeleteMenu(
          graph.getCytoGraph().getElementById(this.targetID)
        );
      } else if (clickId == "e1") {
        // Edit Edge
        this.$parent.$refs.detailConrols.openEdgeDetails(
          graph.getCytoGraph().getElementById(this.targetID)
        );
      } else if (clickId == "e2") {
        // Delete Edge
        this.$parent.$refs.detailConrols.loadEdgeData(
          graph.getCytoGraph().getElementById(this.targetID)
        );
        this.$parent.$refs.detailConrols.openEdgeDeleteMenu(
          graph.getCytoGraph().getElementById(this.targetID)
        );
      } else if (clickId == "b1") {
        // Create Node
        this.$parent.$refs.createConrols.openNodeGui();
      } else if (clickId == "b2") {
        // Create Edge
        this.$parent.$refs.createConrols.openEdgeGui();
      }
    }
  }
};
</script>