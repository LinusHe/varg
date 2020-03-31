

export function CreateJSon(graphComponent) {
    let cy = graphComponent.$refs["cyRef"].instance;
    // eslint-disable-next-line no-console
    console.log(cy.json())
    return cy.json()
}

export function LoadJSon(content, graphComponent) {
    let cy = graphComponent.$refs["cyRef"].instance;
    // eslint-disable-next-line no-console
    console.log("Loading Graph per JSon")
    //Turns stringified JSon back to JSon format
    content = JSON.parse(content)
    //wipes every element of the current graph
    cy.elements('node').remove()
    cy.elements('edge').remove()
    //builds graph specified by content
    cy.json(content)
    //apply node colors
    cy.nodes().forEach(node => {
        node.style('background-color', '#' + node.data('color'));
    });
}

export default { CreateJSon, LoadJSon }