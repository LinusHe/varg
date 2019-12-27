// class to test save functions in a virtual test database
export default class TestDatabase {

  constructor () {
    // array to save graphs in format BasicData(name, date, graph)
    this.basicDataArray = []
  }

  /* The save function is called after clicking the button
   * "Graph Speichern". It first handles the case of possible
   * duplicate data names, and then pushes the BasicData element
   * on the save array.
   */
  save (basicData) {
    const index = this.searchExisting(basicData.getName())
    if (index >= 0) {
      const input = prompt("Dateiname existiert bereits. 'überschreiben' oder 'kopie' erstellen?")
      if (input === "überschreiben") {
        this.basicDataArray[index] = basicData
      }
      else if (input === "kopie") {
        basicData.setName(basicData.getName() + " (Kopie)")
        this.basicDataArray.push(basicData)
      }
      else {
        alert ("Nicht gespeichert")
      }
    }
    else {
      this.basicDataArray.push(basicData)
    }
  }

  /* looks for duplicate data names in the save array
   *
   * @returns {number} index of the element with a duplicate name, -1 if no duplicate was found
   */
  searchExisting (graphName) {
    for (var i = 0; i < this.basicDataArray.length; i++) {
      if (this.basicDataArray[i].getName() === graphName) {
        return i
      }
    }
    return -1
  }

  // logs the content of the save array to the console (testing purposes)
  logContent () {
    for (let element of this.basicDataArray) {
      // eslint-disable-next-line no-console
      console.log("name: " + element.getName() + ", nodes: " + element.getGraph().toString())
    }
  }
}
