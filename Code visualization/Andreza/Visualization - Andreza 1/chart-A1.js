// Create an array of each Generation
let Generation_1 = Object.values(data.Generation_1);
let Generation_2 = Object.values(data.Generation_2);
let Generation_3 = Object.values(data.Generation_3);
let Generation_4 = Object.values(data.Generation_4);
let Generation_5 = Object.values(data.Generation_5);
let Generation_6 = Object.values(data.Generation_6);

// Create an array of Generation labels
let labels = Object.keys(data.Generation_1);

// Display the default plot
function init() {
  let data = [{
    values: Generation_1,
    labels: labels,
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'Generation_1') {
      data = Generation_1;
  }
  else if (dataset == 'Generation_2') {
      data = Generation_2;
  }
  else if (dataset == 'Generation_3') {
      data = Generation_3;
  }
  else if (dataset == 'Generation_4') {
    data = Generation_4;
  }
  else if (dataset == 'Generation_5') {
      data = Generation_5;
  }
  else if (dataset == 'Generation_6') {
    data = Generation_6;
  }
// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();



