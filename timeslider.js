// Functions to display time in right format
var formatDateMonth = d3.timeFormat("%b");
var formatDateMonthDay = d3.timeFormat("%d %b %Y");

// Time period to display at time slider
var startDate = new Date("2020-01-01"),
    endDate = new Date("2020-12-31");

// Margins for right positioning
var margin = {top:50, right:50, bottom:0, left:50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Time slider SVG
var svg = d3.select("#timeslider")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// Global variables
var moving = false;
var currentValue = 0;
var targetValue = width;

// Append play button
var playButton = d3.select("#play-button")
    .on("click", function() {
        var button = d3.select("#play-button");
        if (button.text() == "Pause") {
            moving = false;
            clearInterval(timer);
            // timer = 0;
            button.text("Play");
        } else {
            moving = true;
            timer = setInterval(step, 20); //Moving Speed by play
            button.text("Pause");
        }
    });

// Set time scaling
var x = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, targetValue])
    .clamp(true);

// Append slider
var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height/5 + ")");

// Implement slider functionality and send new date to controller if slider is moved
slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() {
            currentValue = d3.event.x;
            DateChange(x.invert(d3.event.x));
        })
    );

// Set ticks
slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(x.ticks(10))
    .enter()
    .append("text")
    .attr("x", x)
    .attr("y", 12)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDateMonth(d); });

// Append handle
var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);

// Append actual date on handle
var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDateMonthDay(startDate))
    .attr("transform", "translate(0," + (-25) + ")")

// Move one step and send new date to controller
function step() {
    DateChange(x.invert(currentValue));
    granularitiy = (targetValue/1501)
    currentValue = currentValue + granularitiy; // Granularity
    if (currentValue >=  targetValue + granularitiy) {
        moving = false;
        currentValue = 0;
        clearInterval(timer);
        playButton.text("Play");
    }
    if(currentValue < 0)
        currentValue = 0;
}

// Update time on slider, should be called in controller
function updateTimeSlider(h) {
    currentValue = x(h);
    handle.attr("cx", x(h));
    label
        .attr("x", x(h))
        .text(formatDateMonthDay(h));
}
