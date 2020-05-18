/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import optimizations from "@/vargraph/graph/optimizations";
import cytoscape from 'cytoscape'
import cyStore from "../../src/vargraph/graph/cyStore";


describe('Optimizing tests', () => {


    
    let cyto = cytoscape({})
    
    beforeEach(() => {

        cyto.add({ 
            data: { id: 0, name: 'A' },
        })
        cyto.add({ 
            data: { id: 1, name: 'B' },
        })
        cyto.add({ 
            data: { id: 2, name: 'C' },
        })
        cyto.add({ 
            data: { id: 3, name: 'D' },
        })
        cyto.add({ 
            data: { id: 4, name: 'E' },
        })
        
        cyto.add(
            { // edge Härten
                data: { id: 5, name: 'V', source: 0, target: 2, cost: 1, time: 3, sucost:2 , sutime: 1, lotsize: 1, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 6, name: 'W', source: 2, target: 3, cost: 0.1, time: 0.3, sucost: 1.3, sutime: 7, lotsize: 1, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 7, name: 'X', source: 3, target: 4, cost: 0.1, time: 1, sucost: 0.4, sutime: 2, lotsize: 1, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 8, name: 'Y', source: 2, target: 4, cost: 2, time: 1, sucost: 3, sutime: 1, lotsize: 1, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 9, name: 'Z', source: 1, target: 2, cost: 0.1, time: 4, sucost: 3, sutime: 1, lotsize: 1, label: '' }
            });
        cyStore.data.cy = cyto

    });
    
    it('should show right Path after time optimizing in TestGraph(1) with Startnode A and B and Prodquant = 1', () => {
        
        
        cyStore.data.cy.data("prodQuant", 1);
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationOption", "optionTime")
        cyStore.data.cy.data("settingsOptimizationEndID", 4)
        cyStore.data.cy.data("settingsOptimizationNumber" ,1)
        
        let array = []
        optimizations.optimizing()
        
        let collection = cyStore.data.cy.elements()
        for(let i = 0; i < collection.length; i++){
            if(collection[i].hasClass('highlighted') == true){
                array.push(collection[i].data('name'))
            }

        }

        expect(array).toMatchObject(["V","Y"])
        

        
    });
    it('should show right Path after cost optimizing in Testgraph(1) with Startnode A and B and Prodquant = 1', () => {
        
        cyStore.data.cy.data("prodQuant", 1);
        cyStore.data.cy.data("settingsOptimizationOption", "optionCost")
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationEndID", 4)
        cyStore.data.cy.data("settingsOptimizationNumber" ,1)
        
        let array = []
        optimizations.optimizing()
        
        let collection = cyStore.data.cy.elements()
        for(let i = 0; i < collection.length; i++){
            if(collection[i].hasClass('highlighted') == true){
                array.push(collection[i].data('name'))
            }

        }

        expect(array).toMatchObject(["V","W", "X"])


        
    });

    it('should show right Path after cost optimizing in Testgraph(1) with Startnode A and B and Prodquant = 218', () => {
        cyStore.data.cy.data("prodQuant", 218);
        cyStore.data.cy.data("settingsOptimizationOption", "optionCost")
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationEndID", 4)
        cyStore.data.cy.data("settingsOptimizationNumber" ,1)
        
        let array = []
        optimizations.optimizing()
        
        let collection = cyStore.data.cy.elements()
        for(let i = 0; i < collection.length; i++){
            if(collection[i].hasClass('highlighted') == true){
                array.push(collection[i].data('name'))
            }

        }
    

        expect(array).toMatchObject(["W", "X", "Z"])

        
    });

    it('should show right Path after cost optimizing with different lotsizes in Testgraph(1) with Startnode A and B and Prodquant = 100', () => {
        cyStore.data.cy.data("prodQuant", 100);
        cyStore.data.cy.data("settingsOptimizationOption", "optionCost")
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationEndID", 4)
        cyStore.data.cy.data("settingsOptimizationNumber" ,1)
        
        cyStore.data.cy.edges('[ name = "Y" ]').data("lotsize", 100) 

        let array = []
        optimizations.optimizing()
        
        let collection = cyStore.data.cy.elements()
        for(let i = 0; i < collection.length; i++){
            if(collection[i].hasClass('highlighted') == true){
                array.push(collection[i].data('name'))
            }

        }
      

        expect(array).toMatchObject(["Y", "Z"])

        
    });

});
