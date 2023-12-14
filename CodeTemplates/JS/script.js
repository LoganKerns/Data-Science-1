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

// Data for the x-axis and y-axis
const dataX = [
    35.6897, -6.175, 28.61, 23.13, 19.0761, 14.5958, 31.1667, -23.55,
    37.56, 19.4333, 30.0444, 40.6943, 23.7639, 39.904, 22.5675, 13.7525,
    22.535, 55.7558, -34.5997, 6.455, 41.0136, 24.86, 12.9789, 10.7756,
    34.6939, 30.66, 35.6892, -4.325, -22.9111, 13.0825, 34.2667, 31.5497,
    29.55, 34.1141, 38.8671, 51.5072, 48.8567, 35.1041, 23.0475, 17.385,
    39.1467, -12.06, 30.5872, 32.9987, 30.25, 23.0292, 35.1833, 25.0375,
    34.261, -8.8383, 33.625, 25.8292, 3.1478, 35.2333, 24.9139, 41.8375,
    32.0608, 35.4, 21.0283, 18.5203, 32.8986, 23.03, -26.2044, 4.7111,
    -6.8161, 41.8025, 15.5006, 34.4259, 38.3037, 22.3, 27.2418, 21.1967,
    33.3936, 26.8968, 24.6333, 32.9773, -33.4372, 37.0659, 22.335,
    27.3019, 28.4419, 27.705, 21.1702, -7.2458, 30.45, 21.6618, 30.7991,
    32.1264, 40.4169, 33.3153, 25.5102, 23.5533, 1.3, 25.4358, 36.45,
    38.9, 22.6293, 29.0397, 36.1167
];

const dataY = [
    131, 26, 984, 69, 46, 52, 13, 2493, 125, 7349, 75, 33, 105, 143, 30, 5,
    13, 512, 82, 135, 131, 33, 3018, 62, 31, 1612, 4144, 790, 7, 22, 1329, 712,
    801, 305, 82, 36, 115, 244, 26, 1778, 16, 444, 121, 430, 62, 52, 75, 679,
    114, 20, 151, 69, 72, 168, 69, 526, 66, 141, 40, 1837, 102, 174, 5751, 8612,
    228, 180, 1250, 164, 42, 190, 712, 69, 10, 243, 1969, 292, 1870, 249, 95,
    4826, 263, 2838, 43, 16, 82, 95, 1115, 372, 2156, 112, 6145, 26, 37, 322,
    115, 95, 3556, 115, 21
];

// Combine the data into a single dataset
const dataset = dataX.map((x, i) => ({ x: x, y: dataY[i] }));

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

// Create scales
var x = d3.scaleLinear().domain([-60, 60]).range([0, width]);
var y = d3.scaleLinear().domain([0, 10000]).range([height, 0]);

// Create a div for the tooltip and hide it
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Add X and Y axis
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

var yAxis = svg.append("g")
    .call(d3.axisLeft(y));

// Add dots and tooltip logic
svg.selectAll(".dot")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", function(d) { return x(d.x); })
    .attr("cy", function(d) { return y(d.y); })
    .attr("r", 3.5)
    .style("fill", "rgb(45, 165, 195)")
    .on("mouseover", function(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html("Latitude: " + d.x + "<br>Elevation: " + d.y)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });

// Call the fade-in function and the date-time function when the window loads
window.onload = function() {
    fadeIn(document.body, 2000);
    showDateTime();
};
