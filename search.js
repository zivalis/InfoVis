//Displays and filters options in the secons Dropdown-Box depending on input
function myFunction(){
    var input, filter, ul, li, a, i, txtValue;
    input= document.getElementById("myInput");
    filter= input.value.toUpperCase();
    ul = document.getElementById("Regi");
    li= ul.getElementsByTagName("li");
    for(i = 0; i<li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
        }else{
            li[i].style.display = "none";
        }
    }
}

//Changes the displayed map depending on chosen option in the first Dropdown-Box
function change(selectObject){
    var x = selectObject.value;
    RegionChange(x);
    triggerMapDisplayChange(selectObject,x);
}
//Udates selected Option in the first Dropdown-Box
function changeDisplay(id, valueToSelect){
    let element = document.getElementById(id);
    element.value = valueToSelect;
}