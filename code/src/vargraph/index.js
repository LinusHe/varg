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
        data: { id: 'ab', source: 'a', target: 'b', weight1:'0', weight2: '0' }
      },
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
          'target-arrow-shape': 'triangle',
          'label': 'data(weight1)'
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

//toString(): Collects all nodes of the graph in the Array All 
//            and then outputs their ID in a string.
//            Currently for testing purposes.

export function toString(){
  var Output ='';
  var All = cy.filter('nodes');
  for (var i=0;i<All.length;i++){
    Output = Output + " " + All[i].data('id');
  }
  return Output;
}

export function createNode(name) {
  cy.add({
      data: { id: name },
      position: {x: 500, y: 300}
    });
}

export function createEdge(name, start, end, cost, time) {
  cy.add({
      data: {id: name, source: start, target: end, weight1: cost, weight2: time},
    });
}

export default {run, createNode, toString, createEdge}


