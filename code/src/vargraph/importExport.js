import saveAs from 'file-saver';
import ExJSon from '@/vargraph/JSonPersistence.js'

export function saveJson(graph, name) {
    var filename = "varggraph_" + graph.data("name") + "-" + name + ".json";
    var jsonfile = new Blob([JSON.stringify(graph.json(), null, 2)], { type: 'application/javascript;charset=utf-8' });
    saveAs(jsonfile, filename)
}

export function loadGraphFromJson(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);

    function onReaderLoad(event) {
        ExJSon.LoadJSon(event.target.result);
    }
    // TODO: Catch Wrong Format and other Errors!
}

export function saveGraphAsPng(graph) {
    // Show built in Labels for export
    graph.style().selector('node').style('label', 'data(name)');
    graph.style().selector('node').style('font-size', '25px');
    graph.style().selector('node').style('font-weight', 'bolder');
    graph.style().update();

    var img = graph.png({ full: true, scale: 1.5 });
    saveAs(img, 'graph.png');

    // Hide Labels again
    graph.style().selector('node').style('label', '');
    graph.style().update();

}


export default { saveJson, loadGraphFromJson, saveGraphAsPng }