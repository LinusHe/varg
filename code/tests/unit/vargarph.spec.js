/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import cytoscape from 'cytoscape';

  describe('Optimitated path for graph', function(){
    
    var cy;

    beforeEach(function(done){
      cytoscape({
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
        },
    
        ready: function(){
          cy = this;
  
  
          done();
        },

      });
    });


    function findpath(option, start, end){


      var minDistance = 0
      
      cy.elements().removeClass('highlighted')
    
    
      
        var endNode = "#" + end
        
        if (option === "optionCosts") {
          
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
           
           let array = []
           for(let i = 0; i< pathToEndCosts.length; i++){
              array.push(pathToEndCosts[i].data("name"))
           }
           return array
        }
      
        if (option === "optionTime") {
        
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
           let array = []
           for(let i = 0; i< pathToEndTime.length; i++){
              array.push(pathToEndTime[i].data("name"))
           }
           return array
      
      }
    }

    it('should expect the least time from Rohmaterial to Schrauben', function(){
     expect(findpath("optionCosts", ["-1"], "-3")).toMatchObject(["Rohmaterial: Stahl", "Fräsen", "Stahlrohre", "Gewinde walzen", "Schrauben"])
    });

    it('should expect the least costs path from Rohmaterial to Schrauben', function(){
      expect(findpath("optionTime", ["-1"], "-3")).toMatchObject(["Rohmaterial: Stahl", "Schneiden", "Stahlrohre", "Gewinde walzen", "Schrauben"])
    });

    it('should expect the least time and costs path from a new node(Edelstahl) to Schrauben', function(){
      cy.add(
          { // node Edelstahl
              data: { id: 0 , name: 'Edelstahl' },
          })
      cy.add(
          { // edge Härten
              data: { id: 1, name: 'Härten', source: 0, target: -2, weight1: 0.1, weight2: 0.1, weight3: 0.2, weight4: 0.1, label: '' }
          });
  
    expect(findpath("optionTime", ["-1","0"], "-3")).toMatchObject(["Edelstahl", "Härten", "Stahlrohre", "Gewinde walzen", "Schrauben"])
    expect(findpath("optionCosts", ["-1","0"], "-3")).toMatchObject(["Edelstahl", "Härten", "Stahlrohre", "Gewinde walzen", "Schrauben"])
  });


    it('should use the path with negative wait', function(){
       
        cy.add(
            { // node Edelstahl
                data: { id: 2 , name: 'Aluminium' },
         })
        cy.add(
            { // edge Härten
                data: { id: 3, name: 'Biegen', source: 2, target: -2, weight1: -1, weight2: -1, weight3: -1, weight4: -1, label: '' }
        });

            expect(findpath("optionTime", ["-1","2"], "-3")).toMatchObject(["Aluminium", "Biegen", "Stahlrohre", "Gewinde walzen", "Schrauben"])
        })
    

  });


