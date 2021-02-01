pie_daten = 0;
var LKIdL = 0;
var LKIdR =0;
var LKName = "TestLand";
var Einwohner = "0";
var Inzidenz ="0";


//Erste Inizialisierung
setTimeout(()=>{
    pie_daten = getRelevantData();
    createPieBar("#pie_1");
    createPieBar("#pie_2");
    UpdateEbeneR(pie_daten[0]);
    UpdateEbeneL(pie_daten[0]);
},600);


//Navigantionsbuttens anzeigen und mit Übergeordnetem Regionsnamen versehen (z.B. Miesbach -> Bayern)
//Rechter Button
function UpdateEbeneR(Ort_ID){

    //Herausfinden auf welcher Ebene man sich befindet (DE, Budnesland, Landkreis)
    if(Ort_ID == 0){
        document.getElementsByClassName("EbeneZurückR")[0].style.display = "none";
    }
    else if(Ort_ID <100){
        document.getElementById("BZR").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span> Deutschland";
    }
    else{
        var ÜberID=0;
        if(Ort_ID <10000){
            ÜberID = Ort_ID.toString().substring(0,1);
        }
        else{
            ÜberID = Ort_ID.toString().substring(0,2);
        }
        document.getElementById("BZR").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span>"+IDtoName(ÜberID);
    }
}

//Linker Button
function UpdateEbeneL(Ort_ID){

    //Herausfinden auf welcher Ebene man sich befindet (DE, Budnesland, Landkreis)
    if(Ort_ID == 0){
        document.getElementsByClassName("EbeneZurückL")[0].style.display = "none";
    }
    else if(Ort_ID <100){
        document.getElementById("BZL").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span> Deutschland";
    }

    else{
        var ÜberID=0;
        if(Ort_ID <10000){
            ÜberID = Ort_ID.toString().substring(0,1);
        }
        else{
            ÜberID = Ort_ID.toString().substring(0,2);
        }
        document.getElementById("BZL").innerHTML = "<span class=\"glyphicon glyphicon-share-alt\"></span>"+IDtoName(ÜberID);
    }
}

//Rechter Button wird gedrückt
function BZRPress(){
    LKIdR = getRegionID();
    if(LKIdR < 100){
        goBackOnMap(); // zoome raus wenn es eine Bundesland ID ist
        changeDisplay('selectBund', 0)
    }
    console.log(LKIdR);

    //Herausfinden auf welcher Ebene man sich befindet (DE, Budnesland, Landkreis)
    if(LKIdR <100){
        RegionChange(0);
        UpdateEbeneR(0);
    }
    else{
        if(LKIdR <10000){
            RegionChange(LKIdR.toString().substring(0,1));
            UpdateEbeneR(LKIdR.toString().substring(0,1));
        }
        else{
            RegionChange(LKIdR.toString().substring(0,2));
            UpdateEbeneR(LKIdR.toString().substring(0,2));
        }
    }

}

//Linker Button wird gedrückt
function BZLPress(){
    LKIdL = getRegionID();
    if(LKIdL < 100){
        goBackOnMap(); // zoome raus wenn es eine Bundesland ID ist
        changeDisplay('selectBund', 0)
    }

    //Herausfinden auf welcher Ebene man sich befindet (DE, Bundesland, Landkreis)
    if(LKIdL <100){
        RegionChange(0);
        UpdateEbeneL(0);
    }
    else{
        if(LKIdL <10000){
            RegionChange(LKIdL.toString().substring(0,1));
            UpdateEbeneL(LKIdL.toString().substring(0,1));
        }
        else{
            RegionChange(LKIdL.toString().substring(0,2));
            UpdateEbeneL(LKIdL.toString().substring(0,2));
        }
    }

}


//Erstellt Pie-Bar Diagramm an bestimter HTML ID stelle pie_id
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

    LKName=pie_daten[1];
    Einwohner =pie_daten[2][0];
    Inzidenz =pie_daten[3][0]
    var LKID = pie_daten[0];
    //Relevante Daten einlesen und in das richtige Format für die Verarbeitung bringen
    var rows =[
        ["Age","Value","Corona"],
        ["<15",Math.round(pie_daten[2][1]*100),Math.round(pie_daten[3][1]*100)],
        ["15-35",Math.round(pie_daten[2][2]*100),Math.round(pie_daten[3][2]*100)],
        ["35-60",Math.round(pie_daten[2][3]*100),Math.round(pie_daten[3][3]*100)],
        [">60",Math.round(pie_daten[2][4]*100),Math.round(pie_daten[3][4]*100)]];
    let csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(",")).join("\n");
    d3.csv(csvContent, (data) => {
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
            .attr("text-anchor", function(d) { return (x(d.Age) + x.bandwidth()/2 + Math.PI /2) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
            .attr("transform", function(d) { return "rotate(" + ((x(d.Age) +x.bandwidth() /1.8) * 180 / Math.PI - 100) + ")"+"translate("+ (innerRadius*0.87) + ")"; })
            .append("text")
            .text(function(d){return(d.Age)})
            .attr("transform", function(d) { return (x(d.Age) + x.bandwidth() / 2 +(Math.PI /2) ) % (2 * Math.PI) > Math.PI ? "rotate(265)" : "rotate(80)"; })
            .style("font-size", "13px")
            .attr("fill", "#333366")
            .attr("alignment-baseline", "middle")

        //Text LKName
        svg.append("text")
            .attr("x",2)
            .attr("y",0)
            .attr("textLength", 150)
            .attr("font-family","sans-serif")
            .attr("text-anchor","middle")
            .attr("fill","black")
            .text(IDtoName(LKID))

        //Text Altersdruchschnitt
        svg.append("text")
            .attr("x",2)
            .attr("y",25)
            .attr("font-size","13px")
            .attr("font-family","sans-serif")
            .attr("text-anchor","middle")
            .attr("fill","darkblue")
            .text(Einwohner.toLocaleString()+" Einwohner")

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
            .attr("transform", "rotate("+((Math.log10(Inzidenz+1)-0.7)*-20)+",-32,100)")



//Text Inzidenz
        svg.append("text")
            .attr("x",0)
            .attr("y",innerRadius+5)
            .attr("font-size","13px")
            .attr("font-family","sans-serif")
            .attr("fill","#770000")
            .text(Math.floor(Inzidenz*10)/10)

//Text R-Text
        svg.append("text")
            .attr("x",20)
            .attr("y",innerRadius+20)
            .attr("font-size","10px")
            .attr("font-family","sans-serif")
            .attr("text-anchor","middle")
            .attr("fill","#000000")
            .text("7-Tage-Inzidenz")


    });
}

//Update mit neuem Datum wird anders gehandhabt als mit neuem Ort, da es sehr schnell gehen muss

//Neues Datum -> Neuer Graph
function PieBarTimeUpdate(){
    var LockIcon = document.getElementsByClassName("Abgeschlossen");

        pie_daten = getRelevantData();

        //Unterscheidung welcher Graph geupdated werden soll, dann neuzeichnen und löschen des alten Graphs
        //links
        if(LockIcon[0].style.display == "none"){
            createPieBar("#pie_1");
            createPieBar("#pie_2");
            setTimeout(()=>{
                d3.select("#pie_1 *").remove();
                d3.select("#pie_2 *").remove();
            },1);

        }
        //rechts
        else{
            createPieBar("#pie_2");
            setTimeout(()=>{
                d3.select("#pie_2 *").remove();
            },1);
        }



}

//Neuer Ort -> Neuer Graph
function PieBarPlaceUpdate(){
    var LockIcon = document.getElementsByClassName("Abgeschlossen");
;
        pie_daten = getRelevantData();

        UpdateEbeneR(pie_daten[0]);
        UpdateEbeneL(pie_daten[0]);

        //Unterscheidung welcher Graph geupdated werden soll, dann neuzeichnen und löschen des alten Graphs

        if(LockIcon[0].style.display == "none"){

            //links
            if(pie_daten[0]>0){
                document.getElementsByClassName("EbeneZurückL")[0].style.display = "inline";
            }
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

        }

        //rechts
        else{
            if(pie_daten[0]>0){
                document.getElementsByClassName("EbeneZurückR")[0].style.display = "inline";
            }
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
                d3.select("#pie_2").transition().duration(500).ease(d3.easeLinear).style("opacity", 0);
                setTimeout(function(){
                    d3.select("#pie_2 *").remove();
                    createPieBar("#pie_2");
                    d3.select("#pie_2").transition().duration(500).ease(d3.easeLinear).style("opacity", 1);
                },500);
            }
        }


    //links


}