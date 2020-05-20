ALTER USER 'varg' IDENTIFIED WITH mysql_native_password BY 'VarG2020';
FLUSH PRIVILEGES;

CREATE TABLE userreg (
    userid VARCHAR(20),
    auth VARCHAR(20),
    PRIMARY KEY (userid)
);

INSERT INTO userreg VALUES ('jhohlfel', 'admin');
INSERT INTO userreg VALUES ('eheldt', 'admin');

CREATE TABLE cytographs (
    fileId INT NOT NULL,
    fileName VARCHAR(25),
    userName VARCHAR(10),
    graphObject JSON,
    PRIMARY KEY (fileId)
);

# TODO remove unused params from metadata (in cy.data as well)
INSERT INTO cytographs (fileId, fileName, userName, graphObject) VALUES (-233086227,'sampleGraph1', 'eheldt','
  {
    "elements": {
      "nodes": [
        {
          "data": {
            "id": "0",
            "name": "a",
            "short": "A",
            "color": "2699FB"
          },
          "position": {
            "x": 499,
            "y": 523
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        },
        {
          "data": {
            "id": "1",
            "name": "b",
            "short": "B",
            "color": "FD79A8"
          },
          "position": {
            "x": 1083,
            "y": 103
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        },
        {
          "data": {
            "id": "3",
            "name": "c",
            "short": "C",
            "color": "FDCB6E"
          },
          "position": {
            "x": 1758,
            "y": 335
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        }
      ],
      "edges": [
        {
          "data": {
            "id": "2",
            "short": "AB",
            "name": "ab",
            "source": "0",
            "target": "1",
            "cost": 5,
            "time": 1,
            "sucost": 2,
            "sutime": 10,
            "label": "ab\\nKosten: 5 $ | Zeit: 1 Sekunden\\nRuestkosten: 2 $ | Ruestzeit: 10 Sekunden"
          },
          "position": {
            "x": 0,
            "y": 0
          },
          "group": "edges",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": true,
          "classes": ""
        },
        {
          "data": {
            "id": "4",
            "short": "BC",
            "name": "bc",
            "source": "1",
            "target": "3",
            "cost": 1,
            "time": 1,
            "sucost": 1,
            "sutime": 1,
            "label": "bc\\nKosten: 1 € | Zeit: 1 Sekunden\\nRüstkosten: 1 € | Rüstzeit: 1 Sekunden"
          },
          "position": {
            "x": 0,
            "y": 0
          },
          "group": "edges",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": true,
          "classes": ""
        }
      ]
    },
    "style": [
      {
        "selector": "node",
        "style": {
          "background-color": "rgb(38,153,251)",
          "width": "150px",
          "height": "150px",
          "text-wrap": "wrap"
        }
      },
      {
        "selector": "edge",
        "style": {
          "label": "data(label)",
          "line-color": "rgb(38,153,251)",
          "target-arrow-color": "rgb(38,153,251)",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          "control-point-step-size": "150px",
          "font-size": "14px",
          "color": "rgb(119,119,119)",
          "source-distance-from-node": "10px",
          "target-distance-from-node": "10px",
          "text-wrap": "wrap",
          "text-background-color": "rgb(255,255,255)",
          "text-background-opacity": "1",
          "text-background-shape": "round-rectangle",
          "text-background-padding": "10px",
          "text-border-opacity": "1",
          "text-border-color": "rgb(38,153,251)",
          "text-border-width": "3px",
          "text-events": "yes",
          "line-height": "1.5"
        }
      },
      {
        "selector": ".highlighted",
        "style": {
          "border-width": "5.5px",
          "border-opacity": "1",
          "border-color": "rgb(255,118,117)",
          "line-color": "rgb(255,118,117)",
          "text-border-color": "rgb(255,118,117)",
          "target-arrow-color": "rgb(255,118,117)",
          "source-arrow-color": "rgb(0,0,0)",
          "text-outline-color": "rgb(0,0,0)"
        }
      },
      {
        "selector": ":selected",
        "style": {
          "border-width": "5.5px",
          "border-opacity": "0.5",
          "border-color": "rgb(115,115,115)",
          "line-color": "rgb(0,57,139)",
          "text-border-color": "rgb(0,57,139)",
          "target-arrow-color": "rgb(0,57,139)",
          "source-arrow-color": "rgb(0,0,0)",
          "text-outline-color": "rgb(0,0,0)"
        }
      }
    ],
    "data": {
      "IDCount": 5,
      "latestSave": null,
      "user": "eheldt",
      "filename": "DefaultFileName",
      "prodName": "testprodukt",
      "prodQuant": "12345",
      "settingsUnitCostItems": [
        "cent",
        "€",
        "$",
        "£"
      ],
      "settingsUnitCostSelection": "€",
      "settingsUnitTimeItems": [
        "Millisekunden",
        "Sekunden",
        "Minuten",
        "Stunden",
        "Tage"
      ],
      "settingsUnitTimeSelection": "Sekunden",
      "settingsEdgeShowShortOnly": false,
      "settingsEdgeShowCost": true,
      "settingsEdgeShowTime": true,
      "settingsEdgeShowSuCost": true,
      "settingsEdgeShowSuTime": true,
      "settingsEdgeTitleItems": [
        "Name",
        "Kürzel"
      ],
      "settingsEdgeTitleSelection": "Name",
      "minZoom": 0.5
    },
    "zoomingEnabled": true,
    "userZoomingEnabled": true,
    "zoom": 1,
    "minZoom": 0.5,
    "maxZoom": 2,
    "panningEnabled": true,
    "userPanningEnabled": true,
    "pan": {
      "x": -296,
      "y": -4
    },
    "boxSelectionEnabled": true,
    "renderer": {
      "name": "canvas"
    }
  }
');
INSERT INTO cytographs (fileId, fileName, userName, graphObject) VALUES (-233086226,'sampleGraph2', 'jhohlfel','
  {
    "elements": {
      "nodes": [
        {
          "data": {
            "id": "0",
            "name": "a",
            "short": "A",
            "color": "2699FB"
          },
          "position": {
            "x": 499,
            "y": 523
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        },
        {
          "data": {
            "id": "1",
            "name": "b",
            "short": "B",
            "color": "FD79A8"
          },
          "position": {
            "x": 1083,
            "y": 103
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        },
        {
          "data": {
            "id": "3",
            "name": "c",
            "short": "C",
            "color": "FDCB6E"
          },
          "position": {
            "x": 1758,
            "y": 335
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        }
      ],
      "edges": [
        {
          "data": {
            "id": "2",
            "short": "AB",
            "name": "ab",
            "source": "0",
            "target": "1",
            "cost": 5,
            "time": 1,
            "sucost": 2,
            "sutime": 10,
            "label": "ab\\nKosten: 5 € | Zeit: 1 Sekunden\\nRüstkosten: 2 € | Rüstzeit: 10 Sekunden"
          },
          "position": {
            "x": 0,
            "y": 0
          },
          "group": "edges",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": true,
          "classes": ""
        },
        {
          "data": {
            "id": "4",
            "short": "BC",
            "name": "bc",
            "source": "1",
            "target": "3",
            "cost": 1,
            "time": 1,
            "sucost": 1,
            "sutime": 1,
            "label": "bc\\nKosten: 1 € | Zeit: 1 Sekunden\\nRüstkosten: 1 € | Rüstzeit: 1 Sekunden"
          },
          "position": {
            "x": 0,
            "y": 0
          },
          "group": "edges",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": true,
          "classes": ""
        }
      ]
    },
    "style": [
      {
        "selector": "node",
        "style": {
          "background-color": "rgb(38,153,251)",
          "width": "150px",
          "height": "150px",
          "text-wrap": "wrap"
        }
      },
      {
        "selector": "edge",
        "style": {
          "label": "data(label)",
          "line-color": "rgb(38,153,251)",
          "target-arrow-color": "rgb(38,153,251)",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          "control-point-step-size": "150px",
          "font-size": "14px",
          "color": "rgb(119,119,119)",
          "source-distance-from-node": "10px",
          "target-distance-from-node": "10px",
          "text-wrap": "wrap",
          "text-background-color": "rgb(255,255,255)",
          "text-background-opacity": "1",
          "text-background-shape": "round-rectangle",
          "text-background-padding": "10px",
          "text-border-opacity": "1",
          "text-border-color": "rgb(38,153,251)",
          "text-border-width": "3px",
          "text-events": "yes",
          "line-height": "1.5"
        }
      },
      {
        "selector": ".highlighted",
        "style": {
          "border-width": "5.5px",
          "border-opacity": "1",
          "border-color": "rgb(255,118,117)",
          "line-color": "rgb(255,118,117)",
          "text-border-color": "rgb(255,118,117)",
          "target-arrow-color": "rgb(255,118,117)",
          "source-arrow-color": "rgb(0,0,0)",
          "text-outline-color": "rgb(0,0,0)"
        }
      },
      {
        "selector": ":selected",
        "style": {
          "border-width": "5.5px",
          "border-opacity": "0.5",
          "border-color": "rgb(115,115,115)",
          "line-color": "rgb(0,57,139)",
          "text-border-color": "rgb(0,57,139)",
          "target-arrow-color": "rgb(0,57,139)",
          "source-arrow-color": "rgb(0,0,0)",
          "text-outline-color": "rgb(0,0,0)"
        }
      }
    ],
    "data": {
      "IDCount": 5,
      "latestSave": null,
      "user": "eheldt",
      "filename": "DefaultFileName",
      "prodName": "testprodukt",
      "prodQuant": "12345",
      "settingsUnitCostItems": [
        "cent",
        "€",
        "$",
        "£"
      ],
      "settingsUnitCostSelection": "€",
      "settingsUnitTimeItems": [
        "Millisekunden",
        "Sekunden",
        "Minuten",
        "Stunden",
        "Tage"
      ],
      "settingsUnitTimeSelection": "Sekunden",
      "settingsEdgeShowShortOnly": false,
      "settingsEdgeShowCost": true,
      "settingsEdgeShowTime": true,
      "settingsEdgeShowSuCost": true,
      "settingsEdgeShowSuTime": true,
      "settingsEdgeTitleItems": [
        "Name",
        "Kürzel"
      ],
      "settingsEdgeTitleSelection": "Name",
      "minZoom": 0.5
    },
    "zoomingEnabled": true,
    "userZoomingEnabled": true,
    "zoom": 1,
    "minZoom": 0.5,
    "maxZoom": 2,
    "panningEnabled": true,
    "userPanningEnabled": true,
    "pan": {
      "x": -296,
      "y": -4
    },
    "boxSelectionEnabled": true,
    "renderer": {
      "name": "canvas"
    }
  }
');
INSERT INTO cytographs (fileId, fileName, userName, graphObject) VALUES (-233086225,'sampleGraph3', 'eheldt','
  {
    "elements": {
      "nodes": [
        {
          "data": {
            "id": "0",
            "name": "a",
            "short": "A",
            "color": "2699FB"
          },
          "position": {
            "x": 499,
            "y": 523
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        },
        {
          "data": {
            "id": "1",
            "name": "b",
            "short": "B",
            "color": "FD79A8"
          },
          "position": {
            "x": 1083,
            "y": 103
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        },
        {
          "data": {
            "id": "3",
            "name": "c",
            "short": "C",
            "color": "FDCB6E"
          },
          "position": {
            "x": 1758,
            "y": 335
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": false,
          "classes": ""
        }
      ],
      "edges": [
        {
          "data": {
            "id": "2",
            "short": "AB",
            "name": "ab",
            "source": "0",
            "target": "1",
            "cost": 5,
            "time": 1,
            "sucost": 2,
            "sutime": 10,
            "label": "ab\\nKosten: 5 € | Zeit: 1 Sekunden\\nRüstkosten: 2 € | Rüstzeit: 10 Sekunden"
          },
          "position": {
            "x": 0,
            "y": 0
          },
          "group": "edges",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": true,
          "classes": ""
        },
        {
          "data": {
            "id": "4",
            "short": "BC",
            "name": "bc",
            "source": "1",
            "target": "3",
            "cost": 1,
            "time": 1,
            "sucost": 1,
            "sutime": 1,
            "label": "bc\\nKosten: 1 € | Zeit: 1 Sekunden\\nRüstkosten: 1 € | Rüstzeit: 1 Sekunden"
          },
          "position": {
            "x": 0,
            "y": 0
          },
          "group": "edges",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          "pannable": true,
          "classes": ""
        }
      ]
    },
    "style": [
      {
        "selector": "node",
        "style": {
          "background-color": "rgb(38,153,251)",
          "width": "150px",
          "height": "150px",
          "text-wrap": "wrap"
        }
      },
      {
        "selector": "edge",
        "style": {
          "label": "data(label)",
          "line-color": "rgb(38,153,251)",
          "target-arrow-color": "rgb(38,153,251)",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
          "control-point-step-size": "150px",
          "font-size": "14px",
          "color": "rgb(119,119,119)",
          "source-distance-from-node": "10px",
          "target-distance-from-node": "10px",
          "text-wrap": "wrap",
          "text-background-color": "rgb(255,255,255)",
          "text-background-opacity": "1",
          "text-background-shape": "round-rectangle",
          "text-background-padding": "10px",
          "text-border-opacity": "1",
          "text-border-color": "rgb(38,153,251)",
          "text-border-width": "3px",
          "text-events": "yes",
          "line-height": "1.5"
        }
      },
      {
        "selector": ".highlighted",
        "style": {
          "border-width": "5.5px",
          "border-opacity": "1",
          "border-color": "rgb(255,118,117)",
          "line-color": "rgb(255,118,117)",
          "text-border-color": "rgb(255,118,117)",
          "target-arrow-color": "rgb(255,118,117)",
          "source-arrow-color": "rgb(0,0,0)",
          "text-outline-color": "rgb(0,0,0)"
        }
      },
      {
        "selector": ":selected",
        "style": {
          "border-width": "5.5px",
          "border-opacity": "0.5",
          "border-color": "rgb(115,115,115)",
          "line-color": "rgb(0,57,139)",
          "text-border-color": "rgb(0,57,139)",
          "target-arrow-color": "rgb(0,57,139)",
          "source-arrow-color": "rgb(0,0,0)",
          "text-outline-color": "rgb(0,0,0)"
        }
      }
    ],
    "data": {
      "IDCount": 5,
      "latestSave": null,
      "user": "eheldt",
      "filename": "DefaultFileName",
      "prodName": "testprodukt",
      "prodQuant": "12345",
      "settingsUnitCostItems": [
        "cent",
        "€",
        "$",
        "£"
      ],
      "settingsUnitCostSelection": "€",
      "settingsUnitTimeItems": [
        "Millisekunden",
        "Sekunden",
        "Minuten",
        "Stunden",
        "Tage"
      ],
      "settingsUnitTimeSelection": "Sekunden",
      "settingsEdgeShowShortOnly": false,
      "settingsEdgeShowCost": true,
      "settingsEdgeShowTime": true,
      "settingsEdgeShowSuCost": true,
      "settingsEdgeShowSuTime": true,
      "settingsEdgeTitleItems": [
        "Name",
        "Kürzel"
      ],
      "settingsEdgeTitleSelection": "Name",
      "minZoom": 0.5
    },
    "zoomingEnabled": true,
    "userZoomingEnabled": true,
    "zoom": 1,
    "minZoom": 0.5,
    "maxZoom": 2,
    "panningEnabled": true,
    "userPanningEnabled": true,
    "pan": {
      "x": -296,
      "y": -4
    },
    "boxSelectionEnabled": true,
    "renderer": {
      "name": "canvas"
    }
  }
');
