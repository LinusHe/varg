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

// toString(): Collects all nodes of the graph and edges in arrays
//             and then outputs their ID in a string.
//             Currently for testing purposes.

export function toString(){
  let output = ''
  let nodeArr = this.nodes
  let edgeArr = this.edges
  for (let element of nodeArr) {
    output += element.data('id') + ' '
  }
  for (let element of edgeArr) {
    output += element.data('id') + ' '
  }
  return output
}

export function createNode(name) {
  cy.add({
      data: { id: name },
      position: {x: 500, y: 300}
    });
}

// SaveMe(): Creates a constant object "content" which 
//           saves all nodes and egdges in two arrays.
//           This object is then returned. By calling this function
//           the current state of the graph can be saved. The object "content"
//           posses a unique toString method that ouputs all nodes and edges.
//           Currently for testing purposes.


export function SaveMe(){
  const content={
    nodes: cy.elements("node"),
    edges: cy.elements("edge"),

    toString() {
      let Output =''
        for (let i=0; i<this.nodes.length;i++){
          Output += this.nodes[i].data('id') + ' '
        }
        for (let i=0; i<this.edges.length;i++){
          Output += this.edges[i].data('id') + ' '
        }
      return Output
    }
  }
  
  return content;
}

//  Load(graph): Doesn't work right now!
//               Intended is a function which allows the current 
//               graph that is displayed in the container to be overwritten 
//               by another graph (which would probably be saved in the database).
//               This would allow the user to switch between different graphs without
//               losing progress.
//               Currently Load(graph) gets the "elements" object of 
//               SaveMe() and then reconstructs the graph using that object by adding every element
//               (nodes first, edges second).

export function Load(graph){
  cy = cytoscape({
    container: document.getElementById('cy'),

    elements: [ // list of graph elements to start with
        {
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

  for (let element of graph.nodes){
    cy.add({
      data: {id: element.data('id')},
      position: {x: element.position('x'), y: element.position('y')}
    });
  }

  for (let element of graph.edges){
    cy.add({
      data: {id: element.data('id'), source: element.data('source'), target: element.data('target')}
    })
  }
}
export function createEdge(name, start, end) {
  cy.add({
      data: {id: name, source: start, target: end},
    });
}

export function getNodes(){
  return cy.nodes();
}

export default {run, createNode, toString, createEdge, getNodes, SaveMe, Load}
