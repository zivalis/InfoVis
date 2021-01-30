var RegionID = 0;
var Datum = new Date("2020-01-01");
var Daten;
var Navigator;

var RelevantData=[]; //Daten die zum aktuellen Tag und Ort passen

//Datum in 1-366 umrechnen
function getDay(){
    var formatDay = d3.timeFormat("%j");
    return formatDay(getDate()) - 1;
}

//Daten laden
async function getIncidenceData(){
    await d3.json("./data/inzidenzen.json", (data) =>{
        Daten = data;

    });
};


firstIni()

//Erstinizialisierung
function firstIni(){
    getIncidenceData();
    SetNavigator();
    setTimeout(()=>{
        UpdateRelevant(RegionID,Datum);

    },500)
}



function SetNavigator(){
    d3.csv("./data/Navigation.csv", (data)=>{
        Navigator =  data;

    })
}

//Ändert RelevantData nach Ortsänderung
function UpdateRelevant(Ort,Datum){

    //var formatDay = d3.timeFormat("%j");
    Tag = Math.round(getDay());
    var tmp =[]
     tmp= Daten[IDtoArrayPos(Ort)];
    RelevantData =[];
    RelevantData[0] = tmp[0];
    RelevantData[1] = tmp[1];
    RelevantData[2] = tmp[2];
    RelevantData[3] = tmp[3][Tag];



}

//Liefert Array POsition einer OrtsId
function IDtoArrayPos(RegionID){
    for(var i = 0; i < Navigator.length;i++){
        if(Navigator[i].ID==RegionID){
            return  Navigator[i].Pos;
        }
    }
}

//ID die für die FUnktionen verwendet wird in Namen, der angezeigt wird umwandeln
function IDtoName(RegionID){
    for(var i = 0; i < Navigator.length;i++){
        if(Navigator[i].ID==RegionID){
            return  Navigator[i].Name;
        }
    }
}

//Namen in ID umwandeln
function NametoID(RegionName){
    for(var i = 0; i < Navigator.length;i++){
        if(Navigator[i].Name==RegionID){
            return  Navigator[i].ID;
        }
    }
}

//Get Methoden
function getDate(){
    return Datum;
}

function getRegionID(){
    return RegionID;
}

function getRelevantData(){
    return RelevantData;
}

//Aufrufen beim Ändern eines Datums
function DateChange(newDate){
    updateTimeSlider(newDate);
    $( "#input-datepicker" ).datepicker("setDate", newDate);
    Datum = newDate;
    UpdateRelevant(RegionID, Datum);

    pushUpdateTime();
}

//Stoppt die Automatische Wiedergabe der Zeitleiste
function stopTimePlay(){
    if (moving) {
        d3.select("#play-button").on("click")();
    }
}


//Aufrufen beim Ändern eines Orts
function RegionChange(newRegionID){
    RegionID = newRegionID;
    stopTimePlay();
    UpdateRelevant(RegionID, Datum);
    pushUpdateOrt();
}



//Elemente über neues Datum benachrichtigen
function pushUpdateTime(){
    // Ludwig
    updateCircles(4, getDate()); // 4 => 60+

    PieBarTimeUpdate();
}
//Elemente über neuen Ort benachrichtigen
function pushUpdateOrt(){
    //Mapzoom();
    PieBarPlaceUpdate();
}



