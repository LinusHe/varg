const elements = [
  // list of graph elements to start with
  {
    // node a
    data: {
      id: -1,
      name: "Rohmaterial: Stahl",
      short: "RS",
      color: "2699FB",
      imgUrl: "https://de.wiki.forgeofempires.com/images/c/c9/Steel.png"
    },
    position: { x: 200, y: 300 }
  },
  {
    // node b
    data: { id: -2, name: "Stahlrohre", short: "SR", color: "00CEC9" },
    position: { x: 700, y: 300 }
  },
  {
    // node b
    data: {
      id: -3,
      name: "Schrauben",
      short: "SCH",
      color: "FF7675",
      imgUrl:
        "https://www.augenblicke-eingefangen.de/media/image/8a/2a/28/Grainger_Industrial_Supply_5WFA8_1_4_UNC-Foto-Gewinde-Schraube_Senkkopf_AE11968.png"
    },
    position: { x: 1200, y: 300 }
  },
  {
    // edge ab
    //! it's important to wright the weigth as a number and not as a string (for the algorithm)
    data: {
      id: -10,
      name: "Schneiden",
      source: -1,
      target: -2,
      cost: 2,
      time: 0.3,
      sucost: 15,
      sutime: 45,
      label: ""
    }
  },
  {
    // edge ab
    data: {
      id: -11,
      name: "Fräsen",
      source: -1,
      target: -2,
      cost: 1.8,
      time: 1,
      sucost: 20,
      sutime: 15,
      label: ""
    }
  },
  {
    // edge bc
    data: {
      id: -12,
      name: "Gewinde walzen",
      source: -2,
      target: -3,
      cost: 2.4,
      time: 2.7,
      sucost: 10,
      sutime: 10,
      label: ""
    }
  },
  {
    // edge bc2
    data: {
      id: -14,
      name: "Gewinde schneiden",
      source: -2,
      target: -3,
      cost: 2.1,
      time: 1.8,
      sucost: 10,
      sutime: 15,
      label: "Gewinde schneiden"
    }
  },
  {
    // edge bc3
    data: {
      id: -15,
      name: "Gewinde irgw",
      source: -2,
      target: -3,
      cost: 2.1,
      time: 0.8,
      sucost: 25,
      sutime: 30,
      label: "Gewinde irgw"
    }
  },
  {
    // edge bc4
    data: {
      id: -16,
      name: "Gewinde 4",
      source: -2,
      target: -3,
      cost: 2.1,
      time: 0.9,
      sucost: 30,
      sutime: 25,
      label: "Gewinde 4"
    }
  }
];

export default elements;
