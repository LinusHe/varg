import graph from "@/vargraph/index.js";

export function getZoom (){
    return graph.getCytoGraph().zoom()
}
  
export function getMaxZoom (){
    return graph.getCytoGraph().maxZoom()
}
  
export function getMinZoom (){
    return graph.getCytoGraph().minZoom()
}

export function setZoom (ZoomLevel){
    graph.getCytoGraph().zoom(ZoomLevel)
    graph.getCytoGraph().center()
}

export function setMinZoom(ZoomLevel){
    graph.getCytoGraph().minZoom(ZoomLevel)
}   

export function ZoomOut() {
    //Zooms and centers the graph, all elemnts are showing
    //beause of the padding
    graph.getCytoGraph().fit(0, 150);
    //Checks if Zoomout would crack the given limit
    if (graph.getCytoGraph().zoom() > graph.getCytoGraph.data('minZoom')){
        //Checks if User can still have free room to zoom out further
        if (graph.getCytoGraph().zoom() - 0.5 > graph.getCytoGraph.data('minZoom')){
            //Allows the user to zoom out furthr for example to more elements
            graph.getCytoGraph().minZoom(graph.getCytoGraph().zoom()-0.5)
        }
        //if either ot these conditions fail it just sets the zoom out limit to max
        else graph.getCytoGraph().minZoom(graph.getCytoGraph.data('minZoom'))
    }
    else graph.getCytoGraph().minZoom(graph.getCytoGraph.data('minZoom'))
}

export default {getZoom, getMaxZoom, getMinZoom, setZoom, ZoomOut, setMinZoom}