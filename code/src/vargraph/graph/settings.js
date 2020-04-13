/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for graph settings

// IMPORTANT: to introduce new settings:
// 1) add data & template to the settingsMenu component
// 2) import them in the settingsMenu component getter function
// 3) export them in the settingsMenu component setter function
// 4) set default values in vargraph/init/CytoscapeDefaultData.js
// 4) if necessary ad update to applySettings function here

export default {
  // applySettings(...): update manually components with new settings
  applySettings(graphComponent) {
    // update edge labels
    graphComponent.updateEdgeLabel(graphComponent);
  }
};
