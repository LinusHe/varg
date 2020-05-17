import saveAs from "file-saver";
import ExJSon from "../JSonPersistence";

export function saveGraphAsJson(graph, name) {
  var filename = name + ".json";
  var jsonfile = new Blob([JSON.stringify(graph.json(), null, 2)], {
    type: "application/javascript;charset=utf-8"
  });
  saveAs(jsonfile, filename);
}

export function loadGraphFromJson(event, graphComponent) {
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);

  function onReaderLoad(event) {
    ExJSon.LoadJSon(event.target.result, graphComponent);
  }
  // TODO: Catch Wrong Format and other Errors!
}

export function saveGraphAsPng(graph, name) {
  var filename = "varggraph_" + graph.data("name") + "-" + name + ".png";
  // Adjust Graph Styling
  changeStyleForExport(graph);
  // Generate Img and save it
  var img = graph.png({ full: true, scale: 1.5 });
  saveAs(img, filename);
  // Reset Graph Styling
  resetStyle(graph);
}

export function saveGraphAsJpg(graph, name) {
  var filename = "varggraph_" + graph.data("name") + "-" + name + ".jpg";
  // Adjust Graph Styling
  changeStyleForExport(graph);
  // Generate Img and save it
  var img = graph.jpg({ full: true, scale: 1.5 });
  saveAs(img, filename);
  // Reset Graph Styling
  resetStyle(graph);
}

function changeStyleForExport(graph) {
  // Show built in Labels for export
  graph
    .style()
    .selector("node")
    .style("label", "data(name)");
  graph
    .style()
    .selector("node")
    .style("font-size", "25px");
  graph
    .style()
    .selector("node")
    .style("font-weight", "bolder");
  graph.style().update();
}

function resetStyle(graph) {
  // Hide Labels again
  graph
    .style()
    .selector("node")
    .style("label", "");
  graph.style().update();
}

export default {
  saveGraphAsJson,
  loadGraphFromJson,
  saveGraphAsPng,
  saveGraphAsJpg
};
