/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
      { // edge ac
        data: { id: 'ac', source: 'a', target: 'c', weight1: 8, weight2: 1, label: '(8,1)' }
      },
      { // edge cb
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
        style: {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'text-outline-color': 'black'

        }

      },
      {
        selector: ':selected',
        style: {
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
  cy.minZoom(1),
    cy.maxZoom(2)

  // Left-Click Listeners:
  cy.on('tap', function (event) {
    var evtTarget = event.target;
    if (evtTarget === cy) {
      console.log('tap on background');
    } else if (evtTarget.isNode()) {
      console.log('tapped Node: ' + evtTarget.id() + ' short: ' + evtTarget.data('short'));
    }
    else {
      console.log('tapped Edge: ' + evtTarget.id() + ' short: ' + evtTarget.data('short'));
    }
  });
}

// toString(): Collects all nodes of the graph and edges in arrays
//             and then outputs their ID in a string.
//             Currently for testing purposes.

export function toString() {
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

export function createNode(newName, newShort, newImgurl, newColor) {
  cy.add({
    data: {
      id: newName,
      short: newShort,
      imgUrl: newImgurl,
      color: newColor
    },
    position: { x: 500, y: 300 }
  });
}

export function createEdge(name, edgeshort, start, end, cost, time, edgeLabel) {
  cy.add({
    data: {
      id: name, 
      short: edgeshort,
      source: start, 
      target: end, 
      weight1: cost, 
      weight2: time, 
      label: edgeLabel
    },
  });
}

/*The method finds the shortest Path between 2 nodes(for now between a and b) with the 
  Dijkstra Algorithm


  */


/*The method finds the shortest Path between 2 nodes(for now between a and b) with the 
  Dijkstra Algorithm
  */
export function findPath(option, start, end) {

  var startNode = "#" + start
  var endNode = "#" + end


  cy.$(':selected').unselect()

  if (option === "optionCosts") {
    var dijkstraCosts = cy.elements().dijkstra(startNode, function (edge) {
      return edge.data('weight1');
    });

    //saves the shortes path to a specific node
    var pathToBCosts = dijkstraCosts.pathTo(cy.$(endNode));

    pathToBCosts.select()
  }

  if (option === "optionTime") {
    var dijkstraTime = cy.elements().dijkstra(startNode, function (edge) {
      return edge.data('weight2');
    });

    var pathToBTime = dijkstraTime.pathTo(cy.$(endNode));
    pathToBTime.select()
  }
}


// SaveMe(): Creates a constant object "content" which 
//           saves all nodes and egdges in two arrays.
//           This object is then returned. By calling this function
//           the current state of the graph can be saved. The object "content"
//           posses a unique toString method that ouputs all nodes and edges.
//           Currently for testing purposes.


export function SaveMe() {
  const content = {
    nodes: cy.elements("node"),
    edges: cy.elements("edge"),

    toString() {
      let Output = 'nodes: '
      for (let i = 0; i < this.nodes.length; i++) {
        Output += this.nodes[i].data('id') + ' '
      }
      Output += ', edges: '
      for (let i = 0; i < this.edges.length; i++) {
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

export function Load(graph) {

  cy.elements('node').remove()
  cy.elements('edge').remove()

  for (let i = 0; i < graph.nodes.length; i++) {
    let node = graph.nodes[i]
    cy.add({
      data: { id: node.data('id') },
      position: { x: node.position('x'), y: node.position('y') }
    });
  }

  for (let i = 0; i < graph.edges.length; i++) {
    let edge = graph.edges[i]
    cy.add({
      data: {
        id: edge.data('id'),
        source: edge.data('source'),
        target: edge.data('target'),
        weight1: edge.data('weigth1'),
        weight2: edge.data('weight2'),
        label: edge.data('label')
      },
    });
  }
}

/*  Method for getting all nodes in the graph


  @return: Array of nodes

  */

export function getNodes() {

  var nodes = cy.nodes()
  var nodesArray = []
  for (let i = 0; i < nodes.length; i++) {
    nodesArray.push(nodes[i].data("id"))
  }

  return nodesArray
}

export default { run, createNode, toString, createEdge, SaveMe, Load, findPath, getNodes }