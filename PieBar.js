pie_daten = getRelevantData();

createPieBar("#pie_1");
createPieBar("#pie_2");
UpdateEbeneR(10);
UpdateEbeneL(10);

function UpdateEbeneR(Ort_ID){
    if(Ort_ID == 0){
        document.getElementsByClassName("EbeneZurückR")[0].style.display = "none";
    }
    else if(Ort_ID <100){
        document.getElementById("BZR").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span> Deutschland";
    }
    else{
        document.getElementById("BZR").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span> Bayern";
    }
}

function UpdateEbeneL(Ort_ID){
    if(Ort_ID == 0){
        document.getElementsByClassName("EbeneZurückL")[0].style.display = "none";
    }
    else if(Ort_ID <100){
        document.getElementById("BZL").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span> Deutschland";
    }

    else{
        document.getElementById("BZL").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span> Bayern";
    }
}

function createPieBar(pie_id){


    var margin = {top: 100, right: 0, bottom: 0, left: 0},
        width = 400 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border
// append the svg object to the body of the page
    var svg = d3.select(pie_id)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + ( height/2+100 )+ ")"); // Add 100 on Y translation, cause upper bars are longer

    d3.csv(pie_daten, function(data) {

        // X scale
        var x = d3.scaleBand()
            .range([1.2*Math.PI, 2.9 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
            .align(0)                  // This does nothing ?
            .domain( data.map(function(d) { return d.Age; }) ); // The domain of the X axis is the list of states.

        // Y scale
        var y = d3.scaleRadial()
            .range([innerRadius, outerRadius])   // Domain will be define later.
            .domain([0, 40]); // Domain of Y is from 0 to the max seen in the data


        //Gradient first bars
        var gradient1 = svg.append("svg:defs")
            .append("svg:radialGradient")
            .attr("id", "gradient_blue")
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("fr", "0%")
            .attr("gradientUnits","userSpaceOnUse")
        //G1 C1
        gradient1.append("svg:stop")
            .attr("offset", "40%")
            .attr("stop-color", "#AAAAFF")
            .attr("stop-opacity", 1)
        //G1C2
        gradient1.append("svg:stop")
            .attr("offset", "65%")
            .attr("stop-color", "#222288")
            .attr("stop-opacity", 1)

        //Gradient second bars
        var gradient2 = svg.append("svg:defs")
            .append("svg:radialGradient")
            .attr("id", "gradient_red")
            .attr("cx", "0")
            .attr("cy", "0")
            .attr("fr", "0%")
            .attr("gradientUnits","userSpaceOnUse")
        //G1 C1
        gradient2.append("svg:stop")
            .attr("offset", "40%")
            .attr("stop-color", "#FF8888")
            .attr("stop-opacity", 1)
        //G1C2
        gradient2.append("svg:stop")
            .attr("offset", "65%")
            .attr("stop-color", "#AA1111")
            .attr("stop-opacity", 1)


        // Add bars
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            //.attr("fill", "#8855FF")
            .style("fill", "url(#gradient_blue)")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d['Value']); })
                .startAngle(function(d) { return x(d.Age); })
                .endAngle(function(d) { return x(d.Age) + x.bandwidth()/3; })
                .padAngle(0.05)
                .padRadius(innerRadius))



        //Add second Bars
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .style("fill", "url(#gradient_red)")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d['Corona']); })
                .startAngle(function(d) { return x(d.Age)+x.bandwidth()/3; })
                .endAngle(function(d) { return x(d.Age) + 2*x.bandwidth()/3; })
                .padAngle(0.05)
                .padRadius(innerRadius))

        //Add inner line
        svg.append("g")
            .selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", "#000000")
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius-1)
                .outerRadius(innerRadius)
                .startAngle(1.2*Math.PI)
                .endAngle(function(d) { return x(d.Age) + 2*x.bandwidth()/3; })
                .padAngle(0.05)
                .padRadius(innerRadius))

        //Add Lables for Values
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.Age) + x.bandwidth()/2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Age) + x.bandwidth() /6) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Value'])+10) + ",0)"; })
            .append("text")
            .text(function(d){return(d.Value)+"%"})
            .attr("transform", function(d) { return (x(d.Age) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "13px")
            .attr("fill", "#8855FF")
            .attr("font-weight","bold")
            .attr("alignment-baseline", "middle")

        //Add Lables for Corona
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.Age) + x.bandwidth()/2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Age) +x.bandwidth() /2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['Corona'])+10) + ",0)"; })
            .append("text")
            .text(function(d){return(d.Corona)+"%"})
            .attr("transform", function(d) { return (x(d.Age) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
            .style("font-size", "13px")
            .attr("fill", "#FF0000")
            .attr("font-weight","bold")
            .attr("alignment-baseline", "middle")


        //Add Lables for Age
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("text-anchor", function(d) { return (x(d.Age) + x.bandwidth()/2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Age) +x.bandwidth() /2-0.15) * 180 / Math.PI - 100) + ")"+"translate("+ (innerRadius*0.85) + "0)"; })
            .append("text")
            .text(function(d){return(d.Age)})
            .attr("transform", function(d) { return (x(d.Age) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(280)" : "rotate(100)"; })
            .style("font-size", "13px")
            .attr("fill", "#333366")
            .attr("alignment-baseline", "middle")

        //Text LKName
        svg.append("text")
            .attr("x",2)
            .attr("y",0)
            .attr("font-size","18px")
            .attr("font-family","sans-serif")
            .attr("text-anchor","middle")
            .attr("fill","black")
            .text("Saarland")

        //Text Altersdruchschnitt
        svg.append("text")
            .attr("x",2)
            .attr("y",25)
            .attr("font-size","13px")
            .attr("font-family","sans-serif")
            .attr("text-anchor","middle")
            .attr("fill","darkblue")
            .text("Ø49,3"+" J")

        //arrow-head
        svg.append("svg:defs")
            .append("svg:marker")
            .attr("id", "triangle")
            .attr("refX", 6)
            .attr("refY", 6)
            .attr("markerWidth", 30)
            .attr("markerHeight", 30)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 12 6 0 12 3 6")
            .style("fill", "#770000")

//line
        svg.append("line")
            .attr("x1", -32)
            .attr("y1", innerRadius)
            .attr("x2", -14)
            .attr("y2", innerRadius)
            .attr("stroke-width", 1)
            .attr("stroke", "#770000")
            .attr("marker-end", "url(#triangle)")
            .attr("transform", "rotate(0,-32,100)")

//Text R-Wert
        svg.append("text")
            .attr("x",0)
            .attr("y",innerRadius+5)
            .attr("font-size","13px")
            .attr("font-family","sans-serif")
            .attr("fill","#770000")
            .text("+1,27")

//Text R-Text
        svg.append("text")
            .attr("x",20)
            .attr("y",innerRadius+20)
            .attr("font-size","10px")
            .attr("font-family","sans-serif")
            .attr("text-anchor","middle")
            .attr("fill","#000000")
            .text("R-Faktor")


    });
}

function PieBarTimeUpdate(){
    var LockIcon = document.getElementsByClassName("Abgeschlossen");
    pie_daten = getRelevantData();
    //links
    if(LockIcon[0].style.display == "none"){

            d3.select("#pie_1 *").remove();
            createPieBar("#pie_1");
            d3.select("#pie_2 *").remove();
            createPieBar("#pie_2");

        UpdateEbeneL(10);
    }
    //rechts
    else{

            d3.select("#pie_2 *").remove();
            createPieBar("#pie_2");

        UpdateEbeneR(10);
    }

}

function PieBarPlaceUpdate(){

    var LockIcon = document.getElementsByClassName("Abgeschlossen");
    pie_daten = getRelevantData();
    //links
    if(LockIcon[0].style.display == "none"){
        var angezeigt = document.getElementsByClassName("right_chart");
        //Rechts wird gerade  gelöscht löschen
        if(angezeigt[0].style.display == "inline"){
            d3.select("#keinGraphText").transition().duration(0).ease(d3.easeLinear).style("opacity", 0);
            var InfoText = document.getElementsByClassName("Ersatztext")[0].style.display = "inline";
            d3.select("#pie_2").transition().duration(500).ease(d3.easeLinear).style("opacity", 0);
            setTimeout(function(){
                angezeigt[0].style.display = "none";
                d3.select("#pie_2").transition().duration(500).ease(d3.easeLinear).style("opacity", 0);
                d3.select("#keinGraphText").transition().duration(2000).ease(d3.easeLinear).style("opacity", 1);
            },500);

        }
        //Rechts nicht angezeigt
        else{
            d3.select("#pie_1").transition().duration(500).ease(d3.easeLinear).style("opacity", 0);
            setTimeout(function(){
                d3.select("#pie_1 *").remove();
                createPieBar("#pie_1");
                d3.select("#pie_1").transition().duration(500).ease(d3.easeLinear).style("opacity", 1);
                d3.select("#pie_2 *").remove();
                createPieBar("#pie_2");
            },500);
        }

        UpdateEbeneL(10);
    }
    //rechts
    else{

        var angezeigt = document.getElementsByClassName("right_chart");
        //Rechts wird gerade ausgeklappt
        if(angezeigt[0].style.display == "none"){

                d3.select("#pie_2").transition().duration(0).ease(d3.easeLinear).style("opacity", 0);
                angezeigt[0].style.display = "inline";
                d3.select("#pie_2 *").remove();
                createPieBar("#pie_2");
                d3.select("#pie_2").transition().duration(1500).ease(d3.easeLinear).style("opacity", 1);
                var InfoText = document.getElementsByClassName("Ersatztext")[0].style.display = "none";


        }
        //Rechts wird bereits angezeigt
        else{
            console.log("hi");
            d3.select("#pie_2").transition().duration(500).ease(d3.easeLinear).style("opacity", 0);
            setTimeout(function(){
                d3.select("#pie_2 *").remove();
                createPieBar("#pie_2");
                d3.select("#pie_2").transition().duration(500).ease(d3.easeLinear).style("opacity", 1);
            },500);
        }
        UpdateEbeneR(10);
    }

}