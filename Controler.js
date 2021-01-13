var RegionID;
var Datum;
var Daten = "Data.csv";
var RelevantData = Daten; //Hier nochFiltern nach 1. Januar und Deutschland zur Initialisierung

function getDate(){
    return Datum;
}

function getRegionID(){
    return RegionID;
}

function DateChange(newDate){
    updateTimeSlider(newDate);
    $( "#input-datepicker" ).datepicker("setDate", newDate);
    Datum = newDate;
    pushUpdateTime();
}

//Stoppt die Automatische Wiedergabe der Zeitleiste
function stopTimePlay(){
    if (moving) {
        d3.select("#play-button").on("click")();
    }
}

function RegionChange(newRegionID){
    RegionID = newRegionID;
    console.log("HierHatSichWasGeändert"+RegionID);
    stopTimePlay();
    pushUpdateOrt();
}

function getRelevantData(){
    return RelevantData;
}

function pushUpdateTime(){
    RelevantData = Daten; // Hier noch Filtern entsprechend den upgedateten Kathegorien;
    //Mapcolour();
    PieBarTimeUpdate();
}
function pushUpdateOrt(){
    RelevantData = Daten; // Hier noch Filtern entsprechend den upgedateten Kathegorien;
    //Mapzoom();
    PieBarPlaceUpdate();
}



