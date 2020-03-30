/* eslint-disable no-console */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// This file contains methods for the graph labels (edges + nodes)

export default {
  // generateEdgeLabel(..): Creates and Returns the Edge-Label based on the Weights
  generateEdgeLabel(newName, newcost, newtime, newsucost, newsutime) {
    return (
      newName +
      "\nKosten: " +
      newcost +
      "€ | Zeit: " +
      newtime +
      "s" +
      "\nRüstkosten: " +
      newsucost +
      "€ | Rüstzeit: " +
      newsutime +
      "s"
    );
  },

  updateNodeLabel() {
    // get cytoscape instance
    let cy = this.$refs["cyRef"].instance;

    cy.nodeHtmlLabel([
      {
        query: "node", // cytoscape query selector
        halign: "center", // title vertical position. Can be 'left',''center, 'right'
        valign: "center", // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: "center", // title vertical position. Can be 'left',''center, 'right'
        valignBox: "center", // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: "findme", // any classes will be as attribute of <div> container for every title
        tpl: function(data) {
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
