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

export function SaveMe(){
  const elements={
    nodes: cy.elements("node"),
    edges: cy.elements("edge"),

    toString () {
      let Output ='';
      for (let i=0; i<elements.nodes.length;i++){
        Output += elements.nodes[i].data('id') +" ";
      }
      let String2=''
      if (Array.isArray(elements.edges)){
        for (let i=0; i<elements.edges.length;i++){
          String2 += elements.edges[i].data('id') +" ";
        }
      }
      else String2 = elements.edges.data('id');
      return Output + ' ' + String2
    }
  }
  
  return elements;
}

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


export default {run, createNode, toString, SaveMe, Load}
