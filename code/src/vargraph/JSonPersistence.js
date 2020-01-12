import graph from "@/vargraph/index.js";

export function CreateJSon (){
    // eslint-disable-next-line no-console
    console.log(graph.GetCytoGraph().json())
    return graph.GetCytoGraph().json()
}

export function LoadJSon (content){
    // eslint-disable-next-line no-console
    console.log("Loading Graph per JSon")
    //Turns stringified JSon back to JSon format
    content = JSON.parse(content)
    //wipes every element of the current graph
    graph.GetCytoGraph().elements('node').remove()
    graph.GetCytoGraph().elements('edge').remove()
    //builds graph specified by content
    graph.GetCytoGraph().json(content)
}

export default {CreateJSon, LoadJSon}