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
    graph.getCytoGraph().fit(0, 150);
    graph.getCytoGraph().minZoom(graph.getCytoGraph().zoom())
}

export default {getZoom, getMaxZoom, getMinZoom, setZoom, ZoomOut, setMinZoom}