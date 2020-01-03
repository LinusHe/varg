export default class BasicData {
    constructor(name, date, graph)
    {
        this.name=name;
        this.date=date;
        this.graph=graph;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
    getGraph() {
        return this.graph;
    }
    setGraph(newGraph) {
        this.graph = newGraph;
    }
}