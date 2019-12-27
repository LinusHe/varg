/* eslint-disable */
export default class TestDatabase {
    constructor () {
        this.basicDataArray = []
        console.log ("Konstruktor aufgerufen")
    }
    save (basicData) {
        console.log("TestDatabase.save aufgerufen")
        var index = this.searchExisting(basicData.getName)
        if (index >= 0) {
            var input = prompt("Dateiname existiert bereits. 'überschreiben' oder 'kopie' erstellen?")
            if (input === "überschreiben") {
                this.basicDataArray[index] = basicData
            }
            else if (input === "kopie") {
                basicData.setName = basicData.getName + " (Kopie)"
                this.basicDataArray.push(basicData)
            }
        }
        else {
            this.basicDataArray.push(basicData)
        }
    }
    searchExisting (graphName) {
        for (var i = 0; i < this.basicDataArray.length; i++) {
            if (basicDataArray[i].getName === graphName) {
                return i
            }
        }
        return -1
    }
}