/* eslint-disable no-unused-vars */
import cytoscape from 'cytoscape'

let cy;

export function run() {
  cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: [ // list of graph elements to start with
      { group: 'nodes',data: { id: 'n1' }, position: { x: 50, y: 200 } },
      { group: 'nodes',data: { id: 'n2' }, position: { x: 131, y: 226 } },
      { group: 'nodes',data: { id: 'n3' }, position: { x: 128, y: 143 } },
      { group: 'nodes',data: { id: 'n4' }, position: { x: 249, y: 142 } },
      { group: 'nodes',data: { id: 'n5' }, position: { x: 191, y: 62 } },
      { group: 'nodes',data: { id: 'n6' }, position: { x: 66, y: 83 } },
      { group: 'edges',data: { id: 'e0', source: 'n1', target: 'n2', label: 7 } },
      { group: 'edges',data: { id: 'e1', source: 'n2', target: 'n3', label: 10 } },
      { group: 'edges',data: { id: 'e2', source: 'n1', target: 'n6', label: 14 } },
      { group: 'edges',data: { id: 'e3', source: 'n1', target: 'n3', label: 9 } },
      { group: 'edges',data: { id: 'e4', source: 'n2', target: 'n4', label: 15 } },
      { group: 'edges',data: { id: 'e5', source: 'n3', target: 'n4', label: 11 } },
      { group: 'edges',data: { id: 'e6', source: 'n3', target: 'n6', label: 2 } },
      { group: 'edges',data: { id: 'e7', source: 'n6', target: 'n5', label: 9 } },  
      { group: 'edges',data: { id: 'e8', source: 'n5', target: 'n4', label: 6 } },
    ],

    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#69e',
          'label': 'data(id)',
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 1,
          'line-color': '#369',
          'target-arrow-color': '#369',
          'target-arrow-shape': 'triangle',
          'label': 'data(label)',
          'font-size': '14px',
          'color': '#777'
        }
      },
      {
        selector: ':selected',
        style:{
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black',
        'text-outline-color': 'black'

        }
      }
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
  var all = cy.filter('nodes');
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

export function findPath(){
  // wendet A*-Algorithmus an und speichert Ergebnis (ein path als Knoten in Reihenfolge) in aStar  
  var aStar = cy.elements().aStar({root: "#n2", 
  goal: "#n6", weight: function(edge){
  return edge.data('label'); }
  }
)
// markiert die Knoten von aStar (in cy?)
aStar.path.select();

}

export default {run, createNode, toString, findPath}


