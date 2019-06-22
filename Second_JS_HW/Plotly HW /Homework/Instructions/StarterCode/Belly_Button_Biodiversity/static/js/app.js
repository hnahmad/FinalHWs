function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

//  I DON'T UNDERSTAND THIS INSTRUCTION; WHERE DATA IS IS ALSO UNCLEAR

// how see data?  how put URL in browser when building?  Need to run app.py or no?


var MetaData = `/metadata/<sample>`;

d3.json(MetaData).then(function(response) {

  var SampleData = d3.select("#sample-metadata");
  SampleData.html("");

  var data = Object.entries(response);

  data.forEach(function(item){

SampleData.append("div").text(item);

  });


  
}

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
)}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

var url = `/samples/<sample>`; 
d3.json(url).then(function(response){
  var toptenvalues = response.sample_values.slice(0,10);
  var toptenlabels = response.otu_ids.slice(0,10);
  var top10hovertext = response.otu_labels.slice(0,10);

   // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

  var trace = {
    "values": toptenvalues,
    "labels": toptenlabels,
    "hovertext": top10hovertext,
    "type": "pie"
  };

  var data = [trace];
  var layout = {title: "PieChart"}

  Plotly.newPlot('pie',data,layout);

  var xvalues = response.otu_ids;
  var yvalues = response.sample_values;
  var markersize = yvalues;
  var markercolors = xvalues;
  var textvalues = response.otu_labels;

  var trace2 = {

    mode: 'markers',
    x: xvalues,
    y: yvalues,
    text: textvalues,
    marker: {color: markercolors, colorscale: 'Rainbow', size: markersize}
  };

  var data2 = [trace2];
  var layout2 = {
    showlegend: false,
    height: 600,
    width: 1200,
  };

  Plotly.newPlot('bubble',data2,layout2)



})


    // @TODO: Build a Bubble Chart using the sample data

 
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
