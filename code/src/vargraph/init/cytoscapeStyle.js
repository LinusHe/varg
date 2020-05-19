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
      "control-point-step-size": "170px", // distance between successive bezier edges.
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
  }
];

export default style;
