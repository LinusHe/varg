/* eslint-disable no-console */
import cyStore from "@/vargraph/graph/cyStore";
import router from "@/router/index.js";
import style from "@/vargraph/init/cytoscapeStyle.js";
import {store} from "../store/store.js";
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
  if (router.currentRoute.path == "/home/menu" || router.currentRoute.path == "/home/database") {
    cyStore.data.importedJson = content;
    router.push({ name: "graph" });
  } else {
    let cy = graphComponent.getCytoGraph();
    console.log("Loading Graph per JSon");
    //Removing old data
    let info=graphComponent.$parent.$parent.$refs["graphInfo"];
    info.optimized=false;
    store.commit("setCyProdName", content.data.prodName);   //After Graph-Load save the loaded name in Store
    store.commit("setCyProdQuant", content.data.prodQuant); //After Graph-Load save the loaded Quant in Store
    info.prodName = content.data.prodName;       //Set the Name in Graphinfo
    info.prodQuant = content.data.prodQuant;    //Set the Quant in Graphinfo
    //wipes every element of the current graph
    cy.elements("node").remove();
    cy.elements("edge").remove();
    //builds graph specified by content
    cy.json(content);
    store.commit("saveGraph", content); // save new Graph in Store
    //apply node colors
    graphComponent.getNodeArr(graphComponent).forEach(node => {
      node.style("background-color", "#" + node.data("color"));
      node.addClass("nodelabel");
    });

    // apply cytoscape styling
    cy.style(style);
  }
}

export default { CreateJSon, LoadJSon };
