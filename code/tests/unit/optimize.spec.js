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
        cyto.add({ 
            data: { id: 5, name: 'F' },
        })
        cyto.add({ 
            data: { id: 6, name: 'G' },
        })
        cyto.add({ 
            data: { id: 7, name: 'H' },
        })
        cyto.add({ 
            data: { id: 8, name: 'I' },
        })
        cyto.add({ 
            data: { id: 9, name: 'J' },
        })
        
        cyto.add(
            {
                data: { id: 10, name: 'AC', source: 0, target: 2, cost: 0.1, time: 20, sucost:5 , sutime: 60, lotsize: 10, label: '' }
            });
        cyto.add(
            {
                data: { id: 11, name: 'BC', source: 1, target: 2, cost: 15, time: 0.5, sucost: 100, sutime: 3, lotsize: 10, label: '' }
            });
        cyto.add(
            {
                data: { id: 12, name: 'CD', source: 2, target: 3, cost: 1, time: 1, sucost: 25, sutime: 25, lotsize: 10, label: '' }
            });
        cyto.add(
            {
                data: { id: 13, name: 'DF', source: 3, target: 5, cost: 1, time: 1, sucost: 8, sutime: 8, lotsize: 10, label: '' }
            });
        cyto.add(
            {
                data: { id: 14, name: 'DE', source: 3, target: 4, cost: 0.1, time: 0.1, sucost: 30, sutime: 30, lotsize: 100, label: '' }
            });
        cyto.add(
            {
                data: { id: 15, name: 'CE', source: 2, target: 4, cost: 5, time: 5, sucost: 20, sutime: 20, lotsize: 10, label: '' }
            });
        cyto.add(
            {
                data: { id: 16, name: 'EF', source: 4, target: 5, cost: 1, time: 1, sucost: 3, sutime: 3, lotsize: 10, label: '' }
            });
        cyto.add(
            {
                data: { id: 17, name: 'FG', source: 5, target: 6, cost: 3, time: 1, sucost: 11, sutime: 30, lotsize: 11, label: '' }
            });
        cyto.add(
            {
                data: { id: 18, name: 'GJ', source: 6, target: 9, cost: 1, time: 10, sucost: 13, sutime: 10, lotsize: 11, label: '' }
            });
        cyto.add(
            {
                data: { id: 19, name: 'FH', source: 5, target: 7, cost: 2, time: 0.5, sucost: 5, sutime: 10, lotsize: 8, label: '' }
            });
        cyto.add(
            {
                data: { id: 20, name: 'HI', source: 7, target: 8, cost: 1, time: 5, sucost: 3, sutime: 3, lotsize: 9, label: '' }
            });
        cyto.add(
            {
                data: { id: 21, name: 'IJ', source: 8, target: 9, cost: 1, time: 10, sucost: 7, sutime: 1, lotsize: 8, label: '' }
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

        expect(array).toMatchObject(["BC","CE", "EF", "FH", "HI", "IJ")
    });

    it('should show right Path after cost optimizing in TestGraph(1) with Startnode A and B and Prodquant = 1', () => {
                
        cyStore.data.cy.data("prodQuant", 1);
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationOption", "optionCost")
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

        expect(array).toMatchObject(["AC","CE", "EF", "FH", "HI", "IJ"])
    });

    it('should show right Path after cost optimizing in TestGraph(1) with Startnode A and B and Prodquant = 10', () => {
                
        cyStore.data.cy.data("prodQuant", 1);
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationOption", "optionCost")
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

        expect(array).toMatchObject(["AC","CD", "DF", "FG", "GJ"])
    });

    it('should show right Path after cost optimizing in TestGraph(1) with Startnode A and B and Prodquant = 100', () => {
                
        cyStore.data.cy.data("prodQuant", 1);
        cyStore.data.cy.data("settingsOptimizationStartIDs", ["0", "1"])
        cyStore.data.cy.data("settingsOptimizationOption", "optionCost")
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

        expect(array).toMatchObject(["AC","CD", "DE", "EF", "FH", "HI", "IJ"])
    });

});
