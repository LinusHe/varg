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
        data: { id: 'ab', source: 'a', target: 'b', weight1: 10, weight2: 10, label: '(10,10)' }
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
  // Sets maximum and minimum of zoom levels. Difference between one and two
  // is rougly one mouse wheel scroll.
  cy.minZoom(0.5),
  cy.maxZoom(2),
  //  Sets up a new datafield called minZoom with the value 
  cy.data('minZoom', 0.5)
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

/*The method finds the shortest Path between 2 nodes(for now between a and b) with the 
  Dijkstra Algorithm


  */ 


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


/* SaveMe(): 
  Creates a constant object "content" which 
  saves all nodes and egdges in two arrays.
  This object is then returned. By calling this function
  the current state of the graph can be saved. The object "content"
  posses a unique toString method that ouputs all nodes and edges.
  Currently for testing purposes.
*/ 

export function SaveMe(){
  const content={
    nodes: cy.elements("node"),
    edges: cy.elements("edge"),

    toString() {
      let Output ='nodes: '
        for (let i=0; i<this.nodes.length;i++){
          Output += this.nodes[i].data('id') + ' '
        }
        Output += ', edges: '
        for (let i=0; i<this.edges.length;i++){
          Output += this.edges[i].data('id') + ' '
        }
      return Output
    }
  }
  
  return content;
}

//  Load(graph): Intended is a function which allows the current 
//               graph that is displayed in the container to be overwritten 
//               by another graph (which would probably be saved in the database).
//               This would allow the user to switch between different graphs without
//               losing progress.
//               Currently Load(graph) gets the "content" object of 
//               SaveMe() and then reconstructs the graph using that object by adding every element
//               (nodes first, edges second) and defining every data value by referencing the graph that is written
//               in the database.

export function Load(graph){

  cy.elements('node').remove()
  cy.elements('edge').remove()

  for (let i=0; i<graph.nodes.length;i++){
    let node=graph.nodes[i]
    cy.add({
      data: {id: node.data('id')},
      position: {x: node.position('x'),y: node.position('y')}
    });
  }

  for (let i=0; i<graph.edges.length;i++){
    let edge=graph.edges[i]
    cy.add({
      data: {id: edge.data('id'), 
      source: edge.data('source'), 
      target: edge.data('target'), 
      weight1: edge.data('weigth1'),
      weight2: edge.data('weight2'),
      label: edge.data('label')
    },
    });
  }
}

export function createEdge(name, start, end, cost, time, edgeLabel) {
  cy.add({
    data: {id: name, source: start, target: end, weight1: cost, weight2: time, label: edgeLabel},
    });
}

/*  Method for getting all nodes in the graph


  @return: Array of the ids of the nodes

  */

export function getNodes(){
  
  var nodes = cy.nodes()
  var nodesArray =[]
  for(let i = 0; i< nodes.length; i++){
    nodesArray.push(nodes[i].data("id"))
  }
  
  return nodesArray
}

export function getNodeArr(){
  return cy.nodes()
}

export function getNodePosSum(input){
  let nodeArr = cy.nodes()
  if (input === 'x'){
    let posx = 0;
    for (let i=0; i< nodeArr.length; i++){
      posx += nodeArr[i].position('x')
    }
    return posx
  }
  else if (input === 'y'){
    let posy = 0;
    for (let i=0; i< nodeArr.length; i++){
      posy += nodeArr[i].position('y')
    }
    return posy
  }
  else return null
}

/*
  NodeToPointVector(pointx, pointy, node):

  Computes the distance of a node to a point by
  generating a vector out of the given point and
  the nodes position values and then computes it's 
  length with the formula l = sqrt(a^2 + b^2) which
  it then returns.

*/

export function NodeToPointVector(pointx, pointy, node){
  let one= node.position('x') - pointx
  let two= node.position('y') - pointy
  let sum= Math.pow(one,2) + Math.pow(two,2)
  return Math.sqrt(sum)
}

export function getZoom (){
  return cy.zoom()
}

export function MaxZoom (){
  return cy.maxZoom()
}

export function setMaxZoom(ZoomLevel){
  cy.maxZoom(ZoomLevel)
}

export function MinZoom (){
  return cy.minZoom()
}

/**
 * setMinZoom(ZoomLevel):
 * 
 * It takes the given ZoomLevel
 * and checks wether or not is smaller then the 
 * limit that is defined in cy.data. If it is greather
 * than the limit, it will set the MinZoom as the ZoomLevel.
 * It will be impossible for the user to ever zoom
 * past the given limit, which, if implemented well, would
 * make it so, that the zoom range makes it easy to see
 * the graph at all times.
 * 
 * @param {*} ZoomLevel 
*/

export function setMinZoom(ZoomLevel){
  // eslint-disable-next-line no-console
  console.log(ZoomLevel+' '+cy.data('minZoom'))
  if (ZoomLevel < cy.data('minZoom')) {
    // eslint-disable-next-line no-console
    console.log('Max Zoomout reached.')
  }
  else cy.minZoom(ZoomLevel)
}

export function setZoom (ZoomLevel) {
  cy.zoom(ZoomLevel)
}

export default {
  run,
  createNode,
  toString, 
  createEdge, 
  SaveMe, 
  Load, 
  findPath, 
  getNodes,
  getNodeArr,
  getNodePosSum,
  NodeToPointVector,
  getZoom,
  setZoom,
  MaxZoom,
  setMaxZoom,
  MinZoom,
  setMinZoom
}