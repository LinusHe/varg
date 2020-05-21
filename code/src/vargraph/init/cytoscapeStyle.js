const style = [
  // the stylesheet for the graph
  {
    selector: "node",
    style: {
      "background-color": "#2699FB",
      width: 150,
      height: 150,
      "text-wrap": "wrap"
    }
  },

  {
    selector: "edge",
    style: {
      // 'width': 3,
      label: "data(label)",
      "line-color": "#2699FB",
      "target-arrow-color": "#2699FB",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      // 'control-point-distance': '80px', // replaced with 'control-point-step-size'
      "control-point-step-size": "190px", // distance between successive bezier edges.
      // 'control-point-weight': '0.5', // '0': curve towards source node, '1': towards target node. 0.5 is default!
      "font-size": "14px",
      color: "#777",
      "source-distance-from-node": "10px", // remove or set to 0 for connected edges
      "target-distance-from-node": "10px", // remove or set to 0 for connected edges
      "text-wrap": "wrap",
      "text-background-color": "#fff",
      "text-background-opacity": 1,
      "text-background-shape": "round-rectangle",
      "text-background-padding": "10px",
      "text-border-opacity": 1,
      "text-border-color": "#2699FB",
      "text-border-width": "3px",
      "text-events": "yes",
      "line-height": 1.5
    }
  },
  {
    selector: ".highlighted",
    style: {
      "border-width": 5.5,
      "border-opacity": 1,
      "border-color": "#FF7675",
      "line-color": "#FF7675",
      "text-border-color": "#FF7675",
      "target-arrow-color": "#FF7675",
      "source-arrow-color": "black",
      "text-outline-color": "black"
    }
  },
  {
    selector: ".quick-edge",
    style: {
      "line-style": "dashed"
    }
  },
  {
    selector: ".eh-preview",
    style: {
      "line-style": "dashed"
    }
  },
  {
    selector: ":selected",
    style: {
      "border-width": 5.5,
      "border-opacity": 0.5,
      "border-color": "#737373",
      "line-color": "#00398b",
      "text-border-color": "#00398b",
      "target-arrow-color": "#00398b",
      "source-arrow-color": "black",
      "text-outline-color": "black"
    }
  },
  // Edge Handle Classes
  {
    selector: ".eh-handle",
    style: {
      "background-color": "#ffffff",
      "border-width": 2,
      "border-color": "#aaaaaa",
      "background-image":
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjYgMTMuNEExIDEgMCAwIDEgOS4yIDE0LjhBNC44IDQuOCAwIDAgMSA5LjIgNy44TDEyLjcgNC4yQTUuMSA1LjEgMCAwIDEgMTkuOCA0LjJBNS4xIDUuMSAwIDAgMSAxOS44IDExLjNMMTguMyAxMi44QTYuNCA2LjQgMCAwIDAgMTcuOSAxMC40TDE4LjQgOS45QTMuMiAzLjIgMCAwIDAgMTguNCA1LjZBMy4yIDMuMiAwIDAgMCAxNC4xIDUuNkwxMC42IDkuMkEyLjkgMi45IDAgMCAwIDEwLjYgMTMuNE0yMyAxOFYyMEgyMFYyM0gxOFYyMEgxNVYxOEgxOFYxNUgyMFYxOE0xNi4yIDEzLjdBNC44IDQuOCAwIDAgMCAxNC44IDkuMkExIDEgMCAwIDAgMTMuNCAxMC42QTIuOSAyLjkgMCAwIDEgMTMuNCAxNC44TDkuOSAxOC40QTMuMiAzLjIgMCAwIDEgNS42IDE4LjRBMy4yIDMuMiAwIDAgMSA1LjYgMTQuMUw2LjEgMTMuN0E3LjMgNy4zIDAgMCAxIDUuNyAxMS4yTDQuMiAxMi43QTUuMSA1LjEgMCAwIDAgNC4yIDE5LjhBNS4xIDUuMSAwIDAgMCAxMS4zIDE5LjhMMTMuMSAxOEE2IDYgMCAwIDEgMTYuMiAxMy43WiIgLz48L3N2Zz4=",
      width: 50,
      height: 50,
      label: ""
    }
  },
  {
    selector: ".eh-ghost-edge",
    style: {
      "line-color": "#797979",
      "target-arrow-color": "#797979",
      "line-style": "dashed"
    }
  }
];

export default style;
