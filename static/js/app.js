function DrawBargraph(sampleId)
{
    console.log(`Calling DrawBargraph(${sampleId})`);

    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray =samples.filter(s => s.id == sampleId);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    yticks = otu_ids.slice(0, 10).map(otId => `OTU ${otId}`).reverse();
    
    var barData = {
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        type: "bar",
        text: otu_labels.slice(0, 10).reverse(),
        orientation: "h"
    };
         barArray = [barData];
     
     var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30, l: 150}
    };

        Plotly.newPlot("bar", barArray,barLayout);
        
    });
     
}
    
function DrawBubblechart(sampleId)
{
    console.log(`Calling DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then((data) => {
       var samples = data.samples;
       var resultArray =samples.filter(s => s.id == sampleId);
       var result = resultArray[0];
   // var samples = data.samples.filter(s => s.id.toString() === id)[0];
   var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    
    var bubble  = {
        x: result.otu_ids,
        y: result.sample_values,
        mode: "markers",
        marker: {
            size: result.sample_values,
            color: result.otu_ids
        },
        text: samples.otu_labels
    };
    

    // set the layout for the bubble plot
    var bubble_layout = {
        xaxis:{title: "OTU ID"},
        height: 700,
        width: 1100
    };

    // creating data variable 
    var bubble_data = [bubble];

    // create the bubble plot
    Plotly.newPlot("bubble", bubble_data, bubble_layout);
});
}
    
function ShowMetadata(sampleId)
{
    console.log(`Calling MetaData(${sampleId})`);
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray [0];

        var PANEL = d3.select("#sample-metadata");

        PANEL.html ("");
        Object.entries(result).forEach(([key, value]) => {
            var textToShow = (` ${key}: `) + value 
            PANEL. append("h6").text(textToShow);
        });

    });


}
//function DrawGauge(sampleId)
//{
  //  console.log(`Calling DrawGauge(${sampleId})`);  
//}
function optionChanged(newSampleId)
{
   console.log(`user selected ${newSampleId}`);  

   DrawBubblechart(newSampleId);
   DrawBargraph(newSampleId);
   //DrawGauge(newSampleId);
   ShowMetadata(newSampleId);

}

function InitDashboard()
{
    console.log("Initializing Dashboard");
    var selector = d3.select("#selDataset");


    d3.json("samples.json").then((data) => {
       
       console.log(data);
        
       var sampleNames = data.names;
       
       sampleNames.forEach((sampleId) => {
           selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
       });
       
       var sampleId = sampleNames [0];
       DrawBargraph(sampleId);
       DrawBubblechart(sampleId);
      // DrawGauge(sampleId);
       ShowMetadata(sampleId);
            
    });

    }

 InitDashboard();  
