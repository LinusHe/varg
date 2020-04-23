/* eslint-disable no-console */
// class to test save functions in a virtual test database
export default class TestDatabase {
  constructor() {
    // array to save cytographs
    this.cytographArray = [];
  }

  getContent() {
    return this.cytographArray;
  }

  /* firstly handles the case of possible
   * duplicate data names, then pushes the cytograph element
   * on the save array
   */
  save(cytograph, overwrite) {
    const index = this.searchExisting(cytograph.data.filename);
    if (index >= 0) {
      if (overwrite) {
        this.cytographArray[index] = cytograph;
        return true;
      } else {
        return false;
      }
    } 
    else {
      this.cytographArray.push(cytograph);
      return true;
    }
  }

  /* (currently not used) forces to save cytograph over the existing element with the given name
  forceSave(cytograph, name) {
    const index = this.searchExisting(name);
    this.cytographArray[index] = cytograph;
  }*/

  /* looks for duplicate data names in the save array
   *
   * @returns {number} index of the element with a duplicate name, -1 if no duplicate was found
   */
  searchExisting(graphName) {
    for (var i = 0; i < this.cytographArray.length; i++) {
      if ((this.cytographArray[i]).data.filename === graphName) {
        return i;
      }
    }
    return -1;
  }

  // returns existing element with given name
  load(graphName) {
    const index = this.searchExisting(graphName);
    return this.cytographArray[index];
  }

  // logs the content of the save array to the console (testing purposes)
  logContent() {
    for (let element of this.cytographArray) {
      // TODO: Remove ToString
      // eslint-disable-next-line no-console
      console.log(
        element
      );
    }
  }
}
