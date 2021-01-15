var RegionID = 9172;
var Datum = 0;
var Daten;
var Navigator;

var RelevantData=[];

async function getIncidenceData(){
    await d3.json("./data/inzidenzen.json", (data) =>{
        Daten = data;
    });
};

firstIni()
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

function UpdateRelevant(Ort,Tag){
    var tmp = Daten[IDtoArrayPos(Ort)];
    RelevantData[0] = tmp[0];
    RelevantData[1] = tmp[1];
    RelevantData[2] = tmp[2];
    RelevantData[3] = tmp[3][Tag];
    console.log(RelevantData);
}

function IDtoArrayPos(RegionID){
    for(var i = 0; i < Navigator.length;i++){
        if(Navigator[i].ID==RegionID){
            console.log(Navigator[i].Pos);
            return  Navigator[i].Pos;
        }
    }
}
function IDtoName(RegionID){
    for(var i = 0; i < Navigator.length;i++){
        if(Navigator[i].ID==RegionID){
            console.log(Navigator[i].Name);
            return  Navigator[i].Name;
        }
    }
}
function NametoID(RegionName){
    for(var i = 0; i < Navigator.length;i++){
        if(Navigator[i].Name==RegionID){
            console.log(Navigator[i].ID);
            return  Navigator[i].ID;
        }
    }
}


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
    stopTimePlay();
    pushUpdateOrt();
}

function getRelevantData(){
    return RelevantData;
}

function pushUpdateTime(){
    RelevantData = Daten; // Hier noch Filtern entsprechend den upgedateten Kathegorien;
    
    // Ludwig
    updateCircles(4, getDate()); // 4 => 60+

    PieBarTimeUpdate();
}
function pushUpdateOrt(){
    RelevantData = Daten; // Hier noch Filtern entsprechend den upgedateten Kathegorien;
    //Mapzoom();
    PieBarPlaceUpdate();
}



