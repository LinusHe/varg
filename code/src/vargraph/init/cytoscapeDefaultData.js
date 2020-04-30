const data = {
  IDCount: 0,
  latestSave: null,

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
  settingsOptimizationStartID: -1,
  settingsOptimizationStartEndID: -1,
  settingsOptimizationNumber: 7,
  settingsOptimizationSelection: 0,
  // Optimizations
  settingsOptimizations: [{}],
  
};

export default data;
