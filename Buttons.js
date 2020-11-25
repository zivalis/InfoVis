var RightPie = document.getElementsByClassName("right_chart")
var InfoText = document.getElementsByClassName("Ersatztext")
var LockButton = document.getElementsByClassName("Schloss")
var LockIcon = document.getElementsByClassName("Abgeschlossen")
var TrashButton = document.getElementsByClassName("Trashcan")
var BackButtonL = document.getElementsByClassName("EbeneZurückL")
var BackButtonR = document.getElementsByClassName("EbeneZurückR")

initialize();
function initialize(){
    RightPie[0].style.display = "none";

    LockIcon[0].style.display = "none";

    TrashButton[0].style.display = "none";

    BackButtonR[0].style.display = "none";
}

function trashcan(){

    RightPie[0].style.display = "none";

    InfoText[0].style.display = "inline";

    LockButton[0].style.display = "inline";

    LockIcon[0].style.display = "none";

    TrashButton[0].style.display = "none";

    BackButtonL[0].style.display = "inline";

    BackButtonR[0].style.display = "none";

    UpdateEbeneL(100);
}

function padlock (){

    RightPie[0].style.display = "inline";

    InfoText[0].style.display = "none";

    LockButton[0].style.display = "none";

    LockIcon[0].style.display = "inline";

    TrashButton[0].style.display = "inline";

    BackButtonR[0].style.display = "inline";

    BackButtonL[0].style.display = "none";

    UpdateEbeneR(20);
}


