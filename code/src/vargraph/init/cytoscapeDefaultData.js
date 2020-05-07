const data = {
  IDCount: 0,
  latestSave: null,
  user: "DefaultUser",

  // Graph name and quantity
  filename: "DefaultFileName",
  prodName: "DefaultProductName",
  prodQuant: 1,

  // default Settings
  // - Unit Settings
  settingsUnitCostItems: ["cent", "€", "$", "£"],
  settingsUnitCostSelection: "€",
  settingsUnitTimeItems: [
    "Millisekunden",
    "Sekunden",
    "Minuten",
    "Stunden",
    "Tage"
  ],
  settingsUnitTimeSelection: "Sekunden",
  // - Edge Settings
  settingsEdgeShowShortOnly: false,
  settingsEdgeShowCost: true,
  settingsEdgeShowTime: true,
  settingsEdgeShowSuCost: true,
  settingsEdgeShowSuTime: true,
  settingsEdgeTitleItems: ["Name", "Kürzel"],
  settingsEdgeTitleSelection: "Name",
  // - Optimization Settings
  settingsOptimizationOption: "optionTime",
  settingsOptimizationOptionItems: ["Zeit", "Kosten"],
  settingsOptimizationStartNames: [],
  settingsOptimizationStartEndName: [],
  settingsOptimizationNumber: 1,
  settingsOptimizationSelection: 0,
  settingsOptimizationStartIDs: [],
  settingsOptimizationEndID: -1,
  // Optimizations
  settingsOptimizations: [{}]
};

export default data;
