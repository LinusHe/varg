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
      { // node b
        data: { id: 'c' }
      },
      { // edge ab 
        //! it's important to wright the weigth as a number and not as a string (for the algorithm)
        data: { id: 'ab', source: 'a', target: 'b', weight1: 10, weight2: 10, label: "(10,10)" }
      },
      {
        data: { id: 'ac', source: 'a', target: 'c', weight1: 8, weight2: 1, label: '(8,1)' }
      },
      { 
        data: { id: 'cb', source: 'c', target: 'b', weight1: 9, weight2: 1, label: '(9,1)' }
      }




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
          'color': '#777',
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
  // Sets maximum and minimum of zoom levels.
  cy.minZoom(1),
  cy.maxZoom(2)
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

/*  Method for getting all nodes in the graph


  @return: Array of nodes

  */

export function getNodes(){
  
  var nodes = cy.nodes()
  var nodesArray =[]
  for(let i = 0; i< nodes.length; i++){
    nodesArray.push(nodes[i].data("id"))
  }
  
  return nodesArray
}

/*The method finds the shortest Path between 2 nodes(for now between a and b) with the 
  Dijkstra Algorithm
  */ 
 export function findPath(option, start, end){

  var startNode = "#" + start
  var endNode = "#" + end
 
 
  cy.$(':selected').unselect()

  if(option ==="optionCosts"){
    var dijkstraCosts = cy.elements().dijkstra(startNode, function(edge){
      return edge.data('weight1');
      });

  //saves the shortes path to a specific node
  var pathToBCosts = dijkstraCosts.pathTo( cy.$(endNode) );

  pathToBCosts.select()
  }

  if(option ==="optionTime"){
    var dijkstraTime = cy.elements().dijkstra(startNode, function(edge){
    return edge.data('weight2');
  });
  
  var pathToBTime = dijkstraTime.pathTo( cy.$(endNode) );
  pathToBTime.select()
  }
}

export default {run, createNode, toString, findPath, getNodes}


