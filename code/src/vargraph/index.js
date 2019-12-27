/* eslint-disable no-unused-vars */
import cytoscape from 'cytoscape'

let cy;

export function run() {
  cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: [ // list of graph elements to start with
      { // node a
        data: { id: 'a' }
      },
      { // node b
        data: { id: 'b' }
      },
      { // edge ab
        data: { id: 'ab', source: 'a', target: 'b' }
      }
    ],

    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
      // eslint-disable-next-line indent
    ],

    layout: {
      name: 'grid',
      rows: 1
    }

  })
}

// toString(): Collects all nodes of the graph in the array "all"
//             and then outputs their ID in a string.
//             Currently for testing purposes.

export function toString(){
  var output = '';
  var all = cy.elements("node");
  for (var i = 0; i < all.length; i++) {
    output += all[i].data('id') + ' ';
  }
  return output;
}

export function createNode(name) {
  cy.add({
      data: { id: name },
      position: {x: 500, y: 300}
    });
}

export function SaveMe(){
  let elements={
    nodes: this.savedCyInstance.elements().nodes().jsons(),
    edges: this.savedCyInstance.elements().edges().jsons()
  }
  alert(elements.nodes + " " +elements.edges);
}


export default {run, createNode, toString, SaveMe}
