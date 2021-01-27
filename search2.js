function myFunction(){
    var input, filter, ul, li, a, i, txtValue, bund;
    bund= document.getElementById("selectBund").value;
    filter= input.value.toUpperCase();
    ul = document.getElementById("Regi");
    li= ul.getElementsByTagName("li");

    
    for(i = 0; i<li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        input= li[i].value;
        txtValue = a.textContent || a.innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1 && bund==input){
            li[i].style.display = "";
        }else{
            li[i].style.display = "none";
        }
    }
}

function change(){
    var x = document.getElementById("selectBund").value;
    RegionChange(x);
}