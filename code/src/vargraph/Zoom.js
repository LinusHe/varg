import graph from "@/vargraph/index.js";

export function getZoom (){
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
   this.setZoom({
       level : ZoomLevel,
       position : {x: posx, y: posy},
       renderedposition : {x: posx, y: posy}
   })
}

export default {getZoom, getMaxZoom, getMinZoom, setZoom, ZoomOut}