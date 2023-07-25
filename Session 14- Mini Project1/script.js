let updatedata=document.getElementsByClassName("updatedata");
let table=document.getElementById("table");
let row=0;
let search=document.getElementById("search");
function editData(x){
    document.getElementById("modal").style.display="block";
    row=x;
    for(let i=0;i<row.cells.length-1;i++){
        updatedata[i].value=row.cells[i].innerHTML;
    }
}
function updateData(){
    for(let i=0;i<row.cells.length-1;i++){
        row.cells[i].innerHTML=updatedata[i].value;
    }
    document.getElementById("modal").style.display="none";
}
function deleteData(x){
    table.deleteRow(x.rowIndex);
}
function cancelUpdate(){
    document.getElementById("modal").style.display="none";
}

function searchData(){
    let value=false;
    let searchValue=search.value.toUpperCase();
    for(let i=1;i<table.rows.length;i++){
    if(table.rows[i].cells[1].innerHTML.toUpperCase().includes(searchValue)){
        table.rows[i].style.display="";
        value=true;
        document.getElementById("nodata").style.display="";
    } 
    else{
        table.rows[i].style.display="none";
    }
   }
   if(value===false){
    document.getElementById("nodata").style.display="block";
   }
}

