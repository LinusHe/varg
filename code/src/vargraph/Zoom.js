import graph from "@/vargraph/index.js";

export function getZoom (){
<<<<<<< HEAD
    return graph.getZoom()
}
  
export function getMaxZoom (){
    return graph.MaxZoom()
}
  
export function getMinZoom (){
    return graph.MinZoom()
}

export function setZoom (ZoomLevel){
    graph.setZoom(ZoomLevel)
}

export function setMinZoom(ZoomLevel){
    graph.setMinZoom(ZoomLevel)
}


//ZoomOut():    

export function ZoomOut() {
   let MaxVektor = 0;
   let nodeArr=graph.getNodeArr()
   let posx=graph.getNodePosSum('x')
   let posy=graph.getNodePosSum('y')
   posx= posx / nodeArr.length
   posy= posy / nodeArr.length
   for(let i=0;i<nodeArr.length;i++){
       let vector = graph.NodeToPointVector(posx, posy, nodeArr[i])
       if (vector > MaxVektor){
           MaxVektor=vector
       }
   }
   let ZoomLevel = 2 - (MaxVektor/400)
   this.setMinZoom(ZoomLevel)
   this.setZoom({
       level : ZoomLevel,
       position : {x: posx, y: posy},
       renderedposition : {x: posx, y: posy}
   })
}

export default {getZoom, getMaxZoom, getMinZoom, setZoom, ZoomOut, setMinZoom}
=======
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
    //Zooms and centers the graph, all elements are showing
    //beause of the padding
    graph.getCytoGraph().fit(0, 150);
    //Checks if Zoomout would crack the given limit
    if (graph.getCytoGraph().zoom() > graph.getCytoGraph().data('minZoom')){
        //Checks if User can still have free room to zoom out further
        if (graph.getCytoGraph().zoom() - 0.5 > graph.getCytoGraph().data('minZoom')){
            //Allows the user to zoom out furthr for example to more elements
            graph.getCytoGraph().minZoom(graph.getCytoGraph().zoom()-0.5)
        }
        //if either ot these conditions fail it just sets the zoom out limit to max
        else graph.getCytoGraph().minZoom(graph.getCytoGraph().data('minZoom'))
    }
    else graph.getCytoGraph().minZoom(graph.getCytoGraph().data('minZoom'))
}

export default { getZoom, getMaxZoom, getMinZoom, setZoom, ZoomOut, setMinZoom }
>>>>>>> LoginBranch
