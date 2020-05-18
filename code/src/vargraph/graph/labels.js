/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for the graph labels (edges + nodes)

export default {
  // generateEdgeLabel(..): Creates and Returns the Edge-Label based on the Weights
  generateEdgeLabel(graphComponent, newName, newShort, newcost, newtime, newsucost, newsutime, newlotsize) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();
    let label = "";

    // Show only Short Label
    if (cy.data("settingsEdgeShowShortOnly")) {
      label = newShort;
    } else {
      // Title
      if (cy.data("settingsEdgeTitleSelection") === "Name") label = newName;
      else label = newShort;

      // Cost / Time Data
      if (cy.data("settingsEdgeShowCost") || cy.data("settingsEdgeShowTime")) label += "\n";
      if (cy.data("settingsEdgeShowCost")) label += "Kosten: " + newcost + " " + cy.data("settingsUnitCostSelection");
      if (cy.data("settingsEdgeShowCost") && cy.data("settingsEdgeShowTime")) label += " | ";
      if (cy.data("settingsEdgeShowTime")) label += "Zeit: " + newtime + " " + cy.data("settingsUnitTimeSelection");

      // SuCost / SuTime Data, Lotsize Data
      if (cy.data("settingsEdgeShowLotSize")) label += "\n";
      if (cy.data("settingsEdgeShowLotSize")) label += "Losgröße: " + newlotsize + " " + "Stück";
      if (cy.data("settingsEdgeShowSuCost") || cy.data("settingsEdgeShowSuTime")) label += "\n";
      if (cy.data("settingsEdgeShowSuCost")) label += "Rüstkosten: " + newsucost + " " + cy.data("settingsUnitCostSelection");
      if (cy.data("settingsEdgeShowSuCost") && cy.data("settingsEdgeShowSuTime")) label += " | ";
      if (cy.data("settingsEdgeShowSuTime")) label += "Rüstzeit: " + newsutime + " " + cy.data("settingsUnitTimeSelection");
    }


    return label;

    //old function:
    // return (
    //   newName +
    //   "\nKosten: " +
    //   newcost +
    //   "€ | Zeit: " +
    //   newtime +
    //   "s" +
    //   "\nRüstkosten: " +
    //   newsucost +
    //   "€ | Rüstzeit: " +
    //   newsutime +
    //   "s"
    // );
  },

  updateEdgeLabel(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    let allEdges = cy.edges();
    allEdges.forEach(edge => {
      let newlabel = this.generateEdgeLabel(
        graphComponent,
        edge.data("name"),
        edge.data("short"),
        edge.data("cost"),
        edge.data("time"),
        edge.data("sucost"),
        edge.data("sutime"),
        edge.data("lotsize")
      );
      edge.data("label", newlabel);
    });

  },

  updateNodeLabel(graphComponent) {
    // get cytoscape instance
    let cy = graphComponent.getCytoGraph();

    cy.nodeHtmlLabel([
      {
        query: "node", // cytoscape query selector
        halign: "center", // title vertical position. Can be 'left',''center, 'right'
        valign: "center", // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: "center", // title vertical position. Can be 'left',''center, 'right'
        valignBox: "center", // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: "findme", // any classes will be as attribute of <div> container for every title
        tpl: function (data) {
          if (data.imgUrl != null && data.imgUrl != "") {
            // Template for Image-Node
            return (
              '<div style="color: #ffffff; text-align: center; max-height: 140px ">' +
              '<div style="max-height: 70px; max-width: 70px; margin: auto; margin-bottom: 10px; overflow: hidden;"><img style="max-height: 100%; max-width: 100%" src=\'' +
              data.imgUrl +
              "'></div>" +
              '<hr style="border: 0.5px solid #fff;width: 100px;margin: auto; margin-bottom: 5px;">' +
              '<div style="max-width: 100px; max-height: 50px;word-wrap: break-word;overflow-wrap: break-word;overflow: hidden; margin: auto;">' +
              data.name +
              "</div>" +
              "</div>"
            );
          } else {
            // If no Image was set
            return (
              '<div style="color: #ffffff; text-align: center; margin: auto">' +
              '<span style="font-size: 55px;position: relative;bottom: 5px; ">' +
              data.short +
              "</span>" +
              '<hr style="border: 0.5px solid #fff;width: 100px;position: relative;bottom: 5px;margin: auto;">' +
              '<div style="max-width: 100px; max-height: 50px;word-wrap: break-word;overflow-wrap: break-word;overflow: hidden; margin: auto;">' +
              data.name +
              "</div>" +
              "</div>"
            );
          }
        }
      }
    ]);
  }
};
