var RightPie = document.getElementsByClassName("right_chart")
var LockButton = document.getElementsByClassName("Schloss")
var LockIcon = document.getElementsByClassName("Abgeschlossen")
var TrashButton = document.getElementsByClassName("Trashcan")
var BackButtonL = document.getElementsByClassName("EbeneZurückL")
var BackButtonR = document.getElementsByClassName("EbeneZurückR")
var savedRegionIDLeft = 12;

function test(){
    console.log("Success");
}

initialize();
function initialize(){
    RightPie[0].style.display = "none";
    document.getElementById("TagInfo").innerText="";
    LockIcon[0].style.display = "none";

    TrashButton[0].style.display = "none";

    BackButtonR[0].style.display = "none";
}

function trashcan(){

    document.getElementById("TagInfo").innerText="";

    LockButton[0].style.display = "inline";

    LockIcon[0].style.display = "none";

    TrashButton[0].style.display = "none";

    BackButtonL[0].style.display = "inline";

    BackButtonR[0].style.display = "none";

    RegionChange(savedRegionIDLeft);

}

function padlock (){
    document.getElementById("TagInfo").innerText=getDate().getUTCDate()+". "+ (parseInt(getDate().getUTCMonth())+1)+" 2020";

    LockButton[0].style.display = "none";

    LockIcon[0].style.display = "inline";
    LockIcon[0].style.display = "inline";

    TrashButton[0].style.display = "inline";

    BackButtonR[0].style.display = "inline";

    BackButtonL[0].style.display = "none";

    savedRegionIDLeft = getRegionID();

    RegionChange(0);
    if(savedRegionIDLeft <100){
        RegionChange(savedRegionIDLeft);
    }
    else{
        var ÜberID=0;
        if(savedRegionIDLeft <10000){
            ÜberID = savedRegionIDLeft.toString().substring(0,1);
        }
        else{
            ÜberID = savedRegionIDLeft.toString().substring(0,2);
        }
        RegionChange(ÜberID);
    }
}


