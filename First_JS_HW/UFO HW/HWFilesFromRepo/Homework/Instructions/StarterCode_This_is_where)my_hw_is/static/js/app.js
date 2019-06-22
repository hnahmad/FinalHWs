// from data.js
var tableData = data;

console.log(tableData);

// YOUR CODE HERE!

//We are putting in a table to where the HMTL already has a table placeholder.  
//The column headers are also provided in the starter code
// So we need to add the data into the body
// Start by selecting the table body

var ufotable = d3.select("tbody");

// We want to add a row to table for each item in tableData

data.forEach(function(ufosighting) {

var NewRow = ufotable.append("tr");

// Then we want to add cells to the rows and put the data in those cells

Object.entries(ufosighting).forEach(function([key,value]) {
    //console.log(key,value);

    var NewCell = NewRow.append("td");
    NewCell.text(value);
})



});

// Now building event listener

// First, need to identify target

var target = d3.select("button");


// Then create handler

target.on("click",function() {
d3.event.preventDefault(); 
console.log("Filter Button was Clicked");


// need a variable for that captures the input info after click

var enteredDate = d3.select("#datetime");
var enteredDate2 = enteredDate.property("value");
// Why not just .value???  thought we did it that way in class
console.log(enteredDate2);

// now need conditional to select data we want

function SelectData(henry) {

   return henry.datetime == enteredDate2;
}

var SelectedData = tableData.filter(SelectData);
console.log(SelectedData);

// after the above code didn't work no matter how i seemed alter it, a simply browser refresh got it done.. uggh;
// i hope it works when you read it

//var SelectedData = tableData.filter(record => record.datetime === enteredDate2);
//console.log(SelectedData);


// Need to remove existing data in order to put Select Data in

d3.select("tbody").selectAll("tr").remove();

SelectedData.forEach(function(ufosighting) {

    var NewRow2 = ufotable.append("tr");

    Object.entries(ufosighting).forEach(function([key,value]) {
        //console.log(key,value);
    
        var NewCell2 = NewRow2.append("td");
        NewCell2.text(value);
    })




    
})



})


