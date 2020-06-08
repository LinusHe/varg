/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// This file is part of the cytoscape graph
// The holding component is code\src\components\graph\elements\VarGraph.vue

// Event List: https://js.cytoscape.org/#events
// more info about handling events: https://rcarcasses.github.io/vue-cytoscape/api.html#cytoscape

// Event for new node positions
import cyStore from "@/vargraph/graph/cyStore";
export default {
  positionEvent(event) {
    console.log("Position Event fired: ", event);
    if (event.target.group() == "nodes") {
      let node = event.target;
      this.moveNodesInConflict(this, node);
    }
    this.$store.commit('saveGraph', cyStore.data.cy.json());
  },

  // moveNodesInConflict(node): checks whether a node has conflicts with
  // the other nodes in the graph. If needed, the node will be moved
  moveNodesInConflict(graphComponent, node) {
    // get node positions
    let eventX = node.position().x;
    let eventY = node.position().y;
    // get all nodes
    let nodes = graphComponent.getNodeArr(graphComponent);
    // nodes that are different to moved node
    let otherNodes = nodes.filter(n => n !== node);
    // get radius from node with + some extra space
    let radius = parseInt(node.style().width.replace("px", "")) + 10;
    if (otherNodes.length > 0) {
      for (let i = 0; i < otherNodes.length; i++) {
        let otherX = otherNodes[i].position().x;
        let otherY = otherNodes[i].position().y;
        //if there is an overlap
        if (Math.abs(eventX-otherX)<radius&&Math.abs(eventY-otherY)<radius){
          //figure out in which quadrant the overlap is
          if (((eventX-otherX)<radius)&&((otherY-eventY)<radius)&&((eventX<otherX)&&(eventY>otherY))){
            console.log("case 1: conflcit in the lower left");
            if (Math.abs(eventX-otherX)<Math.abs(eventY-otherY)){
              console.log("case 1.1: node sent down");
              //move the event node
              this.movedown(node, eventX, eventY, otherX, otherY, radius);
            }
            else{
              console.log("case 1.2: node sent left");
              this.moveleft(node, eventX, eventY, otherX, otherY, radius);
            }
          }

          else if (((eventX-otherX)<radius)&&((eventY-otherY)<radius)&&((eventX<otherX)&&(eventY<otherY))){
            console.log("case 2: conflict in the upper left");
            if (Math.abs(eventX-otherX)>Math.abs(eventY-otherY)){
              console.log("case 2.1: node sent left");
              this.moveleft(node, eventX, eventY, otherX, otherY, radius);
            }
            else{
              console.log("case 2.2: node sent up");
              this.moveup(node, eventX, eventY, otherX, otherY, radius);
            }
          }

          else if (((otherX-eventX)<radius)&&((eventY-otherY)<radius)&&((eventX>otherX)&&(eventY>otherY))){
            console.log("case 3: conflict in the lower right");
            if (Math.abs(eventX-otherX)<Math.abs(eventY-otherY)){
              console.log("case 3.1: node sent down");
              this.movedown(node, eventX, eventY, otherX, otherY, radius);
            }
            else{
              console.log("case 3.2: node sent right");
              this.moveright(node, eventX, eventY, otherX, otherY, radius);
            }
          }

          else if (((otherX-eventX)<radius)&&((otherY-eventY)<radius)&&((eventX>otherX)&&(eventY<otherY))){
            console.log("case 4: conflict in the upper right");
            if (Math.abs(eventX-otherX)<Math.abs(eventY-otherY)){
              console.log("case 4.1: node sent up");
              this.moveup(node, eventX, eventY, otherX, otherY, radius);
            }
            else{
              console.log("case 4.2: node sent right");
              this.moveright(node, eventX, eventY, otherX, otherY, radius);
            }
          }
          else{
            console.log("case 5: nodes exactly overlapping")
            this.moveup(node, eventX, eventY, otherX, otherY, radius)
          }
        } 
      }
    }
  },

    movedown(node, eventX, eventY, otherX, otherY, radius) {
      console.log(
        "conflict with node below",
        Math.abs(eventX - otherX)
      )
      node.animate(
        {
          position: {x: eventX , y: otherY + radius},
          easing: "ease"
        },
        {
          duration: 200
        }
      )
    },

    moveup(node, eventX, eventY, otherX, otherY, radius) {
      console.log(
        "conflict with upper node",
        Math.abs(eventX - otherX)
      )
      node.animate(
        {
          position: {x: eventX , y: otherY - radius},
          easing: "ease"
        },
        {
          duration: 200
        }
      )
    },

    moveleft(node, eventX, eventY, otherX, otherY, radius) {
      console.log(
        "conflict with right node",
        Math.abs(eventX - otherX)
      );
      node.animate(
        {
          position: {x: otherX - radius, y: eventY},
          easing: "ease"
        },
        {
          duration: 200
        }
      )
    },

    moveright(node, eventX, eventY, otherX, otherY, radius) {
      console.log(
        "conflict with left node",
        Math.abs(eventX - otherX)
      );
      node.animate(
        {
          position: {x: otherX + radius, y: eventY},
          easing: "ease"
        },
        {
          duration: 200
        }
      )
    }
}
