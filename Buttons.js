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

    LockIcon[0].style.display = "none";

    TrashButton[0].style.display = "none";

    BackButtonR[0].style.display = "none";
}

function trashcan(){

    LockButton[0].style.display = "inline";

    LockIcon[0].style.display = "none";

    TrashButton[0].style.display = "none";

    BackButtonL[0].style.display = "inline";

    BackButtonR[0].style.display = "none";

    RegionChange(savedRegionIDLeft);

}

function padlock (){

    LockButton[0].style.display = "none";

    LockIcon[0].style.display = "inline";
    LockIcon[0].style.display = "inline";

    TrashButton[0].style.display = "inline";

    BackButtonR[0].style.display = "inline";

    BackButtonL[0].style.display = "none";

    savedRegionIDLeft = getRegionID();

    RegionChange(14612);
}


