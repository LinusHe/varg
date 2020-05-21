/* eslint-disable no-console */
import cyStore from "@/vargraph/graph/cyStore";
import router from "@/router/index.js";

export function CreateJSon(graphComponent) {
  let cy = graphComponent.getCytoGraph();
  console.log(cy.json());
  return cy.json();
}

export function LoadJSon(content, graphComponent, dialog) {
  //Turns stringified JSon back to JSon format
  try{
    content = JSON.parse(content);
  }
  catch(err){
    dialog.dialogError("Datei-Fehler: <b>JSON-Format erforderlich<b>");
    return false;
  }
  console.log("Json: ", content);
  if (router.currentRoute.path == "/home/menu") {
    cyStore.data.importedJson = content;
    router.push({ name: "graph" });
  } else {
    let cy = graphComponent.getCytoGraph();
    console.log("Loading Graph per JSon");
    //wipes every element of the current graph
    cy.elements("node").remove();
    cy.elements("edge").remove();
    //builds graph specified by content
    cy.json(content);
    //apply node colors
    graphComponent.getNodeArr(graphComponent).forEach(node => {
      node.style("background-color", "#" + node.data("color"));
      node.addClass("nodelabel");
    });
  }  
}

export default { CreateJSon, LoadJSon };
