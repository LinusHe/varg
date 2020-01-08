<template>
  <div class="rightclick-menu">
    <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list>
        <v-subheader v-show="visibleTitle">{{ menuTitle }}</v-subheader>
        <v-list-item v-for="(item, index) in items" :key="index" @click="showMenu = false">
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
      items: [{ title: "Node Menu 1" }, { title: "Node Menu 2" }]
    };
  },
  methods: {
    backgroundMenu() {
      this.visibleTitle = false;
      this.items = [
        { title: "Background Menu 1" },
        { title: "Background Menu 2" }
      ];
    },
    nodeMenu(node) {
      this.visibleTitle = true;
      this.menuTitle = "Zustand: " + node.data("name");
      this.items = [{ title: "Node Menu 1" }, { title: "Node Menu 2" }];
    },
    edgeMenu(edge) {
      this.visibleTitle = true;
      this.menuTitle = "Verbindung: " + edge.data("name");
      this.items = [{ title: "Edge Menu 1" }, { title: "Edge Menu 2" }];
    },
    openMenu(e, target) {
      if (target === graph.getCytoGraph()) {
        this.backgroundMenu();
      } else if (target.group() == "nodes") {
        this.nodeMenu(target);
      } else if (target.group() == "edges") {
        this.edgeMenu(target);
      }
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    }
  }
};
</script>