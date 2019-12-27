// Klasse zum Testen von Speicherfunktionen in einer virtuellen Datenbank
export default class TestDatabase {

  constructor () {
    // Array zum Speichern von Graphen
    // im Format BasicData(Name, Datum, Graph)
    this.basicDataArray = []
  }

  /* save(basicData) wird nach einem Klick auf den Button
   * "Graph Speichern" mit dem davor in Controls.vue erstellten
   * BasicData-Element aufgerufen
   */
  save (basicData) {
    let index = this.searchExisting(basicData.getName())
    if (index >= 0) {
      var input = prompt("Dateiname existiert bereits. 'überschreiben' oder 'kopie' erstellen?")
      if (input === "überschreiben") {
        this.basicDataArray[index] = basicData
      }
      else if (input === "kopie") {
        basicData.setName(basicData.getName() + " (Kopie)")
        this.basicDataArray.push(basicData)
      }
    }
    else {
      this.basicDataArray.push(basicData)
    }
  }

  /* sucht nach bereits existierendem Dateinamen bzw.
   * Graphnamen im Speicher-Array
   *
   * @returns {number} index des gefundenen Elements wenn Element mit gleichem Namen gefunden, -1 sonst
   */
  searchExisting (graphName) {
    for (var i = 0; i < this.basicDataArray.length; i++) {
      if (this.basicDataArray[i].getName() === graphName) {
        return i
      }
    }
    return -1
  }
  logContent () {
    for (let element of this.basicDataArray) {
      // eslint-disable-next-line no-console
      console.log("name: " + element.getName() + ", nodes: " + element.getGraph().toString())
    }
  }
}
