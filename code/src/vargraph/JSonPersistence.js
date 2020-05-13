/* eslint-disable no-console */
import cyStore from "@/vargraph/graph/cyStore";
import router from "@/router/index.js";

export function CreateJSon(graphComponent) {
  let cy = graphComponent.getCytoGraph();
  console.log(cy.json());
  return cy.json();
}

export function LoadJSon(content, graphComponent) {
  //Turns stringified JSon back to JSon format
  try {
    content = JSON.parse(content);
    console.log("Json: ", content);
    if (graphComponent == null) {
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
      cy.nodes().forEach(node => {
      node.style("background-color", "#" + node.data("color"));
      });
    }
  }  
  //should catch wrong JSon syntax, doesn't catch bad cytoscape syntax
  catch (err){
    throw new Error("Json failed to parse");
  }
}

export default { CreateJSon, LoadJSon };
