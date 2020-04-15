/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import optimizations from "@/vargraph/graph/optimizations";
import cytoscape from 'cytoscape'
import cyStore from "../../src/vargraph/graph/cyStore";


describe('Optimizing tests', () => {


    
    let cyto = cytoscape({})
    
    beforeEach(() => {

        cyto.add({ // node Edelstahl
            data: { id: 0, name: 'A' },
        })
        cyto.add({ // node Edelstahl
            data: { id: 1, name: 'B' },
        })
        cyto.add({ // node Edelstahl
            data: { id: 2, name: 'C' },
        })
        cyto.add({ // node Edelstahl
            data: { id: 3, name: 'D' },
        })
        cyto.add({ // node Edelstahl
            data: { id: 4, name: 'E' },
        })
        
        cyto.add(
            { // edge Härten
                data: { id: 5, name: 'V', source: 0, target: 2, cost: 1, time: 3, sucost:2 , sutime: 1, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 6, name: 'W', source: 2, target: 3, cost: 0.1, time: 0.3, sucost: 1.3, sutime: 7, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 7, name: 'X', source: 3, target: 4, cost: 0.1, time: 1, sucost: 0.4, sutime: 2, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 8, name: 'Y', source: 2, target: 4, cost: 2, time: 1, sucost: 3, sutime: 1, label: '' }
            });
        cyto.add(
            { // edge Härten
                data: { id: 9, name: 'Z', source: 1, target: 2, cost: 0.1, time: 4, sucost: 0.3, sutime: 1, label: '' }
            });
        cyStore.data.cy = cyto
        cyto.data("prodQuant", 1);
    });
    
    it('should show right Path after time optimizing', () => {
        
        let array = []
        optimizations.findPath(null, 'optionCosts' , ["0","1"], "4")
        let collection = cyStore.data.cy.elements()
        for(let i = 0; i < collection.length; i++){
            if(collection[i].hasClass('highlighted') == true){
                array.push(collection[i].data('name'))
            }

        }

        expect(array).toMatchObject(['B','C','D','E','W','X','Z'])
        

        
    });
    it('should show right Path after cost optimizing', () => {
        
        let array = []
        optimizations.findPath(null, 'optionTime' , ["0","1"], "4")
        let collection = cyStore.data.cy.elements()
        for(let i = 0; i < collection.length; i++){
            if(collection[i].hasClass('highlighted') == true){
                array.push(collection[i].data('name'))
            }

        }
        expect(array).toMatchObject(['A','C','E','V','Y'])
        //nur zum test
        

        
    });
});
