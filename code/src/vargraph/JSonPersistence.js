import graph from "@/vargraph/index.js";

export function CreateJSon (){
    // eslint-disable-next-line no-console
    console.log(graph.getCytoGraph().json())
    return graph.getCytoGraph().json()
}

export function LoadJSon (content){
    // eslint-disable-next-line no-console
    console.log("Loading Graph per JSon")
    //Turns stringified JSon back to JSon format
    content = JSON.parse(content)
    //wipes every element of the current graph
    graph.getCytoGraph().elements('node').remove()
    graph.getCytoGraph().elements('edge').remove()
    //builds graph specified by content
    graph.getCytoGraph().json(content)
}

export default {CreateJSon, LoadJSon}