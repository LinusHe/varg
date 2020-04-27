<template>
  <div class="rightclick-menu">
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list class="rcmenu">
        <v-subheader v-show="visibleTitle">{{ menuTitle }}</v-subheader>
        <v-list-item v-for="(item, index) in items" :key="index" @click="clickedItem(item.id)">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider v-if="node"></v-divider>
        <v-list-item v-if="node" @click="clickedItem('n10')">
          <v-list-item-icon>
            <v-icon>mdi-arrow-expand-right</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Neue Verknüpfung von hier</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="node" @click="clickedItem('n11')">
          <v-list-item-icon>
            <v-icon>mdi-arrow-collapse-right</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Neue Verknüpfung nach hier</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable standard/computed-property-even-spacing */
let dialogComponent;

export default {
  name: "RightClickControls",
  mounted: function() {
    dialogComponent = this.$parent.$parent.$parent.$parent.$parent.$refs["dialogs"];
  },
  data() {
    return {
      showMenu: false,
      node: false,
      x: 0,
      y: 0,
      nodeName: "",
      visibleTitle: false,
      menuTitle: "",
      items: [],
      targetID: "",
      clickX: null,
      clickY: null
    };
  },
  methods: {
    getGraph() {
      return this.$parent.$parent.$refs["vargraph"];
    },
    setClickPos(x, y) {
      this.clickX = x;
      this.clickY = y;
    },
    backgroundMenu() {
      this.visibleTitle = false;
      this.node = false;
      this.items = [
        { id: "b1", title: "Neuer Zustand", icon: "mdi-plus-circle-outline" },
        { id: "b2", title: "Neue Verknüpfung", icon: "mdi-link-variant-plus" }
      ];
    },
    nodeMenu(node) {
      this.visibleTitle = true;
      this.node = true;
      this.nodeName = node.data("name");
      this.menuTitle = "Zustand: " + node.data("name");
      this.items = [
        { id: "n1", title: "Bearbeiten", icon: "mdi-pencil" },
        { id: "n2", title: "Löschen", icon: "mdi-delete" }
      ];
    },
    edgeMenu(edge) {
      this.visibleTitle = true;
      this.node = false;
      this.menuTitle = "Verbindung: " + edge.data("name");
      this.items = [
        { id: "e1", title: "Bearbeiten", icon: "mdi-pencil" },
        { id: "e2", title: "Löschen", icon: "mdi-delete" }
      ];
    },
    openMenu(e, target) {
      if (target === this.getGraph().getCytoGraph(this.getGraph())) {
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
        this.$parent.$parent.$refs.detailControls.openNodeDetails(
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .getElementById(this.targetID)
        );
      } else if (clickId == "n2") {
        // Delete Node
        this.$parent.$parent.$refs.detailControls.loadNodeData(
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .getElementById(this.targetID)
        );
        this.$parent.$parent.$refs.detailControls.openNodeDeleteMenu(
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .getElementById(this.targetID)
        );
      } else if (clickId == "n10") {
        this.$parent.$parent.$refs.createControls.setStart(this.nodeName);
        this.$parent.$parent.$refs.createControls.openEdgeGui();
      } else if (clickId == "n11") {
        this.$parent.$parent.$refs.createControls.setEnd(this.nodeName);
        this.$parent.$parent.$refs.createControls.openEdgeGui();
      } else if (clickId == "e1") {
        // Edit Edge
        this.$parent.$parent.$refs.detailControls.openEdgeDetails(
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .getElementById(this.targetID)
        );
      } else if (clickId == "e2") {
        // Delete Edge
        this.$parent.$parent.$refs.detailControls.loadEdgeData(
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .getElementById(this.targetID)
        );
        this.$parent.$parent.$refs.detailControls.openEdgeDeleteMenu(
          this.getGraph()
            .getCytoGraph(this.getGraph())
            .getElementById(this.targetID)
        );
      } else if (clickId == "b1") {
        // Create Node
        this.$parent.$parent.$refs.createControls.openNodeGui();
        this.$parent.$parent.$refs.createControls.setNodePos(
          this.clickX,
          this.clickY
        );
      } else if (clickId == "b2") {
        // Create Edge
        this.$parent.$parent.$refs.createControls.openEdgeGui();
      }
    }
  }
};
</script>
