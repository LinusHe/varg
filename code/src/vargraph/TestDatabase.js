// class to test save functions in a virtual test database
export default class TestDatabase {
  constructor() {
    // array to save graphs in format BasicData(name, date, graph)
    this.basicDataArray = [];
  }

  getContent() {
    return this.basicDataArray;
  }

  /* firstly handles the case of possible
   * duplicate data names, then pushes the BasicData element
   * on the save array
   */
  save(basicData, overwrite) {
    const index = this.searchExisting(basicData.getGraphName());
    if (index >= 0) {
      if (overwrite) {
        this.basicDataArray[index] = basicData;
        return true;
      } else {
        return false;
      }
    } else {
      this.basicDataArray.push(basicData);
      return true;
    }
  }

  // forces to save basicData over the existing element with the given name
  forceSave(basicData, name) {
    const index = this.searchExisting(name);
    this.basicDataArray[index] = basicData;
  }

  /* looks for duplicate data names in the save array
   *
   * @returns {number} index of the element with a duplicate name, -1 if no duplicate was found
   */
  searchExisting(graphName) {
    for (var i = 0; i < this.basicDataArray.length; i++) {
      if (this.basicDataArray[i].getGraphName() === graphName) {
        return i;
      }
    }
    return -1;
  }

  // returns existing element with given name
  load(graphName) {
    const index = this.searchExisting(graphName);
    return this.basicDataArray[index];
  }

  // logs the content of the save array to the console (testing purposes)
  logContent() {
    for (let element of this.basicDataArray) {
      // TODO: Remove ToString
      // eslint-disable-next-line no-console
      console.log(
        "name: " +
          element.getGraphName() +
          ", nodes: " +
          element.getGraph().toString()
      );
    }
  }
}
