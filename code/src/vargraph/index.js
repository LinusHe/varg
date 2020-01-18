/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import cytoscape from 'cytoscape';
import nodeHtmlLabel from 'cytoscape-node-html-label';
import klay from 'cytoscape-klay';
nodeHtmlLabel(cytoscape);
cytoscape.use(klay);

let cy;

// run(): Startup-Function
export function run() {
  cy = cytoscape({

    container: document.getElementById('cy'), // container to render in

    elements: [ // list of graph elements to start with
      { // node a
        data: { id: -1, name: 'Rohmaterial: Stahl', short: 'RS', color: '2699FB', imgUrl: 'https://de.wiki.forgeofempires.com/images/c/c9/Steel.png' },
        // renderposition: { x: 500, y: 300 }
      },
      { // node b
        data: { id: -2, name: 'Stahlrohre', short: 'SR', color: '00CEC9' },
        // position: { x: 500, y: 300 }
      },
      { // node b
        data: { id: -3, name: 'Schrauben', short: 'SCH', color: 'FF7675',  imgUrl: 'https://www.augenblicke-eingefangen.de/media/image/8a/2a/28/Grainger_Industrial_Supply_5WFA8_1_4_UNC-Foto-Gewinde-Schraube_Senkkopf_AE11968.png' },
        // position: { x: 500, y: 300 }
      },
      { // edge ab 
        //! it's important to wright the weigth as a number and not as a string (for the algorithm)
        data: { id: -10, name: 'Schneiden', source: -1, target: -2, weight1: 2, weight2: 0.3, weight3: 2, weight4: 0.3, label: '' },
      },
      { // edge ac
        data: { id: -11, name: 'Fräsen', source: -1, target: -2, weight1: 1.8, weight2: 1, weight3: 1.8, weight4: 1, label: '' }
      },
      { // edge cb
        data: { id: -12, name: 'Gewinde walzen', source: -3, target: -2, weight1: 2.4, weight2: 0.7, weight3: 2.4, weight4: 0.7, label: '' }
      }
    ],

    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#2699FB',
          "width": 150,
          "height": 150,
          'text-wrap': 'wrap',
        }
      },

      {
        selector: 'edge',
        style: {
          // 'width': 3,
          'label': 'data(label)',
          'line-color': '#2699FB',
          'target-arrow-color': '#2699FB',
          'curve-style': 'bezier',
          'control-point-distance': '80px',
          'control-point-weight': '0.5', // '0': curve towards source node, '1': towards target node.
          'font-size': '14px',
          'color': '#777',
          'source-distance-from-node': '10px',
          'target-distance-from-node': '10px',
          'text-wrap': 'wrap',
          'text-background-color': '#fff',
          'text-background-opacity': 1,
          'text-background-shape': 'round-rectangle',
          'text-background-padding': '10px',
          'text-border-opacity': 1,
          'text-border-color': '#2699FB',
          'text-border-width': '3px',
          'text-events': 'yes',
          'line-height': 1.5
        }
      },
      {
        selector: '.highlighted',
        style: {
          "border-width": 5.5,
          "border-opacity": 0.5,
          "border-color": "#737373",
          'line-color': '#00398b',
          'text-border-color': '#00398b',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'text-outline-color': 'black',
        }


      }
    ],
    layout: {
      name: 'grid',
      // name: 'klay',
      rows: 1,
      padding: 150,
      spacingFactor: 1.8,
      grid: {
        spacing: 150,
        fixedAlignment: 'BALANCED',
      },
      klay: {
        spacing: 150,
        fixedAlignment: 'BALANCED',
      }
    }
  })
  // Sets maximum and minimum of zoom levels. Difference between one and two
  // is rougly one mouse wheel scroll.
  cy.minZoom(0.5);
  cy.maxZoom(2);
  //  Sets up a new datafield with the given value
  //  This is to prevent that usage of cy.minZoom(value) locks up other zoom functionality
  cy.data('minZoom', 0.5);
  cy.data('IDCount', 0);

  // Apply Color for nodes
  cy.nodes().forEach(n => {
    n.style('background-color', '#' + n.data('color'))
  });

  // Generate Edge Labels
  var options = {
    edgeDimensionsIncludeLabels: true,
    'text-event': 'yes'
  };

  cy.edges().forEach(e => {
    e.data('label', generateEdgeLabel(e.id(), e.data('weight1'), e.data('weight2'), e.data('weight3'), e.data('weight4')));
    e.layoutDimensions(options);
  });

  // Generates Node HTML Label
  updateNodeLabel(cy);
}



// getCytoGraph(): Returns the CytoGraph
export function getCytoGraph() {
  return cy
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


// createNode(..): Adds a node to the Cytograph with an automatic 
//                 generated (increasing) ID + the properties given
export function createNode(newName, newShort, newImgurl, newColor) {
  let count = cy.data('IDCount')
  count++
  cy.add({
    data: {
      id: parseInt(count),
      name: newName,
      short: newShort,
      imgUrl: newImgurl,
      color: newColor
    },
    style: {
      'background-color': '#' + newColor
    },
    position: { x: 500, y: 300 }
  });
  cy.data('IDCount',count)
}


// createEdge(..): Adds an edge to the Cytograph with an automatic 
//                 generated (increasing) ID + the properties given
export function createEdge(newName, edgeshort, start, end, cost, time, costR, timeR
  ) {
  let count = cy.data('IDCount')

  let newlabel = ''
  newlabel = generateEdgeLabel(parseInt(count), cost, time, costR, timeR);
  cy.add({
    data: {
      id: parseInt(count),
      name: newName,
      short: edgeshort,
      source: start,
      target: end,
      weight1: cost,
      weight2: time,
      weight3: costR,
      weight4: timeR,
      label: newlabel,
    },
  });
  cy.data('IDCount', count);
}


// createEdgeWithID(..): DO NOT USE THIS FUNCTION BY DEFAULT!
//                       It's just for re-creating edges in "updateEdge(..)"
//                       Use the normal createEdge(..) function with increasing IDs
function createEdgeWithID(id, newName, edgeshort, start, end, cost, time, costR, timeR) {
  let originalCount = cy.data('IDCount');
  cy.data('IDCount', id);
  createEdge(newName, edgeshort, start, end, cost, time, costR, timeR);
  cy.data('IDCount', originalCount);
}


// findPath(.. ): The method finds the shortest Path between 2 nodes
//                with the Dijkstra Algorithm
export function findPath(option, start, end) {

  console.log(end)

  var minDistance = 0
  
  cy.elements().removeClass('highlighted')


  
    var endNode = "#" + end
    
    if (option === "optionCosts") {
      console.log("costs")
      var pathToEndCosts
      for(let i = 0; i< start.length; i++){
        let startNode = "#" + start[i]
        var dijkstraCosts = cy.elements().dijkstra(startNode, function (edge) {
          return edge.data('weight1')+ edge.data('weight3');
          });
        if(i === 0){
          //saves the shortest distance to a sspecific node(in this case endNode)
          minDistance = dijkstraCosts.distanceTo(cy.$(endNode))
          //saves the shortes path to a specific node
          pathToEndCosts = dijkstraCosts.pathTo(cy.$(endNode))
        }
        else if(minDistance > dijkstraCosts.distanceTo(cy.$(endNode))){
          minDistance =dijkstraCosts.distanceTo(cy.$(endNode))
          pathToEndCosts = dijkstraCosts.pathTo(cy.$(endNode))
        } 

        
       }
       pathToEndCosts.addClass('highlighted')
    
    }
  
    if (option === "optionTime") {
      console.log("time")
    
      var pathToEndTime
      for(let i = 0; i< start.length; i++){
        let startNode = "#" + start[i]
        var dijkstraTime = cy.elements().dijkstra(startNode, function (edge) {
          return edge.data('weight2')+ edge.data('weight4');
          });
        if(i === 0){
          minDistance = dijkstraTime.distanceTo(cy.$(endNode))
          pathToEndTime = dijkstraTime.pathTo(cy.$(endNode))
        }
        else if(minDistance > dijkstraTime.distanceTo(cy.$(endNode))){
          minDistance = dijkstraTime.distanceTo(cy.$(endNode))
          pathToEndTime = dijkstraTime.pathTo(cy.$(endNode))
        } 
      }
       pathToEndTime.addClass('highlighted')
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
export function SaveMe() {
  const content = {
    nodes: cy.elements("node"),
    edges: cy.elements("edge"),
    minZoom: cy.data('minZoom'),

    toString() {
      let Output = ' '
      for (let i = 0; i < this.nodes.length; i++) {
        Output += this.nodes[i].data('name') + ', position: x:' + this.nodes[i].position('x') + ', y: ' + this.nodes[i].position('y') + ' '
      }
      Output += ', edges: '
      for (let i = 0; i < this.edges.length; i++) {
        Output += this.edges[i].data('name') + ' '
      }
      return Output
    },

    freezeEverything()  {
      for(let i=0; i<this.nodes.length;i++){
        Object.freeze(this.nodes[i])
      }
      for(let i=0; i<this.edges.length;i++){
        Object.freeze(this.edges[i])
      }
    }
  };
  content.freezeEverything()
  Object.freeze(content)
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
      data: {
        id: node.data('id'),
        name: node.data('name')
      },
      position: { x: node.position('x'), y: node.position('y') }
    });
  }
  for (let i = 0; i < graph.edges.length; i++) {
    let edge = graph.edges[i]
    cy.add({
      data: {
        id: edge.data('id'),
        name: edge.data('name'),
        source: edge.data('source'),
        target: edge.data('target'),
        weight1: edge.data('weigth1'),
        weight2: edge.data('weight2'),
        weight3: edge.data('weigth3'),
        weight4: edge.data('weight4'),
        label: edge.data('label')
      },
    });
  }
}


// updateNode(..): Updates a node by ID with the given arguments
export function updateNode(id, newName, newShort, newImgurl, newColor) {
  let node = cy.getElementById(id);
  node.data('name', newName);
  node.data('short', newShort);
  node.data('imgUrl', newImgurl);
  node.data('color', newColor);
  node.style('background-color', '#' + newColor);
}


// updateNode(..): Updates an Edge by ID with the given arguments
export function updateEdge(id, newName, newShort, newSource, newTarget, newCost, newTime, newCostR, newTimeR) {
  let edge = cy.getElementById(id);
  let label = generateEdgeLabel(id, newCost, newTime, newCostR, newTimeR);
  // Generate New Edge, if source or target are changing
  if (edge.data('source') != newSource || edge.data('target') != newTarget) {
    edge.remove();
    createEdgeWithID(id, newName, newShort, newSource, newTarget, newCost, newTime, newCostR, newTimeR)
  }
  edge.data('name', newName);
  edge.data('short', newShort);
  edge.data('source', newSource);
  edge.data('target', newTarget);
  edge.data('weight1', newCost);
  edge.data('weight2', newTime);
  edge.data('weight3', newCostR);
  edge.data('weight4', newTimeR);
  edge.data('label', label);
}


function updateNodeLabel(cy) {
  cy.nodeHtmlLabel(
    [
      {
        query: 'node', // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: 'findme', // any classes will be as attribute of <div> container for every title
        tpl: function (data) {
          if (data.imgUrl != null && data.imgUrl != "") {
            // Template für Knoten mit Bild
            return '<div style="color: #ffffff; text-align: center; max-height: 140px ">' +
              '<div style="max-height: 70px; max-width: 70px; margin: auto; margin-bottom: 10px; overflow: hidden;"><img style="max-height: 100%; max-width: 100%" src=\'' + data.imgUrl + '\'></div>' +
              '<hr style="border: 0.5px solid #fff;width: 100px;margin: auto; margin-bottom: 5px;">' +
              '<div style="max-width: 100px; max-height: 50px;word-wrap: break-word;overflow-wrap: break-word;overflow: hidden; margin: auto;">' + data.name + '</div>' +
              '</div>';
          }
          else {
            // Kein Bild gesetzt:
            return '<div style="color: #ffffff; text-align: center; margin: auto">' +
              '<span style="font-size: 55px;position: relative;bottom: 5px; ">' + data.short + '</span>' +
              '<hr style="border: 0.5px solid #fff;width: 100px;position: relative;bottom: 5px;margin: auto;">' +
              '<div style="max-width: 100px; max-height: 50px;word-wrap: break-word;overflow-wrap: break-word;overflow: hidden; margin: auto;">' + data.name + '</div>' +
              '</div>';
          }
        }
      }
    ]
  );
}


// removeEdge(id): Edge with 'id' will be removed from Graph
export function removeEdge(id) {
  let edge = cy.getElementById(id);
  edge.remove();
}


// removeNode(id): Node with 'id' and all involved edges will be removed
export function removeNode(id) {
  let node = cy.getElementById(id);
  let edgesArray = getEdgesByNode(id);
  // removes all involved edges
  edgesArray.forEach(edge => edge.remove())
  // removes the node
  node.remove();
}


// getEdgesByNode(id): Returns all edges, where a specific node is 
//                     involved (as source or target)
export function getEdgesByNode(id) {
  let edgesArray = [];
  let allEdges = cy.edges();
  allEdges.forEach(element => {
    if (element.data('source') == id || element.data('target') == id) {
      edgesArray.push(element);
    }
  });
  return edgesArray;
}


// generateEdgeLabel(..): Creates and Returns the Edge-Label based on the Weights
function generateEdgeLabel(id, newCost, newTime, newCostR, newTimeR) {
  var e = cy.getElementById(id);
  return e.data('name') + '\nKosten: ' + newCost + '€ | Zeit: ' + newTime + 's' + '\nRüstkosten: ' + newCostR + '€ | Rüstzeit: ' + newTimeR + 's';
}


// getNodeID(): Returns an Array with all Node IDs of the Graph
export function getNodeID() {
  var nodes = cy.nodes()
  var nodesArray = []
  for (let i = 0; i < nodes.length; i++) {
    nodesArray.push(nodes[i].data("id"))
  }
  return nodesArray
}


// getNodeID(): Returns an Array with all Node Names of the Graph
export function getNodeName() {
  var nodes = cy.nodes()
  var nodesArray = []
  for (let i = 0; i < nodes.length; i++) {
    nodesArray.push(nodes[i].data("name"))
  }
  return nodesArray
}


// getNodeID(): Returns an Array with all Node Objects of the Graph
export function getNodeArr() {
  return cy.nodes()
}

export function GetCytoGraph(){
  return cy
}

export default {
  run,
  createNode,
  toString,
  createEdge,
  findPath,
  getNodeName,
  getNodeID,
  getNodeArr,
  updateNode,
  updateEdge,
  removeEdge,
  removeNode,
  getEdgesByNode,
  getCytoGraph
}
