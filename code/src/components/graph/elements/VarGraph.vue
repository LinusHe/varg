<template>
  <div id="cy">
    <cytoscape
      ref="cyRef"
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
      v-on:mousedown="blankClick"
      v-on:cxttapstart="rightClick"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:mousedown="elementClick($event, def.data.id)"
      />
    </cytoscape>
  </div>
</template>

<script>
/* eslint-disable no-console */
import config from "@/vargraph/init/config.js";
import elements from "@/vargraph/init/exampleElements.js";

// import methods
import init from "@/vargraph/init/init"
import clickEvents from "@/vargraph/events/clicks"
// activate methods
const methods = Object.assign({}, init, clickEvents);

export default {
  name: "VarGraph",
  data() {
    return {
      config,
      elements
    };
  },
  methods
};
</script>
