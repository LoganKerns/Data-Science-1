// Set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 35, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
var svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg
            .append("text")
            .attr(
                "transform",
                "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
            )
            .style("text-anchor", "middle")
            .style("fill", "white") // Set X axis label color to white
            .text("Latitude (Degrees)");

        // Add Y axis label
        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - height / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("fill", "white") // Set Y axis label color to white
            .text("Elevation (Feet)");


// Create scales
var x = d3.scaleLinear().domain([-60, 60]).range([0, width]);
var y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);

// Define the zoom behavior
var zoom = d3.zoom()
    .scaleExtent([1, 10]) // This controls the zoom range
    .on("zoom", zoomed);

// Apply the zoom behavior to the svg
svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .call(zoom);

// Function to handle zoom
function zoomed(event) {
    // Create new scale ojects based on the event
    var new_xScale = event.transform.rescaleX(x);
    var new_yScale = event.transform.rescaleY(y);

    // Update the axis with these new scales
    xAxis.call(d3.axisBottom(new_xScale));
    yAxis.call(d3.axisLeft(new_yScale));

    // Update the scatter plot with new scales
    svg.selectAll("circle")
        .attr('cx', function(d) { return new_xScale(parseFloat(d.lat)) })
        .attr('cy', function(d) { return new_yScale(parseFloat(d.elevation)) });
}

// Add X and Y axes
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("fill", "white");

var yAxis = svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("fill", "white");

// Read the data
d3.csv("https://raw.githubusercontent.com/LoganKerns/Data-Science-1/main/CodeTemplates/JS/worldcities.csv", function(data) {
    // Add dots
    svg.append("g")
        .selectAll("dot")
        .data(data.filter(function (d, i) { return i < 101; }))
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(parseFloat(d.lat)); })
        .attr("cy", function (d) { return y(parseFloat(d.elevation)); })
        .attr("r", 3)
        .style("fill", "rgb(45, 165, 195)");
});

// Function to show date and time
function showDateTime() {
    setInterval(function() {
        var currentDateTime = new Date().toLocaleString();
        document.getElementById('datetime').innerHTML = currentDateTime;
    }, 1000);
}

// Fade-in effect function
function fadeIn(element, duration) {
    var opacity = 0;
    var interval = 50;
    var increment = interval / duration;

    var fading = setInterval(function() {
        opacity += increment;
        if (opacity >= 1) {
            opacity = 1;
            clearInterval(fading);
        }
        element.style.opacity = opacity;
    }, interval);
}

// Call the fade-in function and the date-time function when the window loads
window.onload = function() {
    fadeIn(document.body, 2000);
    showDateTime();
};
