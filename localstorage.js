Refresh_slot();

function Refresh_slot(){
    let status=JSON.parse(localStorage.getItem("Name"));;
    let i;
    for(i=0;i<2;i++){
        if(status[i]==1)document.getElementById('slotstatus'+(i+1)).className = 'fa fa-calendar-check-o';
        else document.getElementById('slotstatus'+(i+1)).className = 'fa fa-calendar-o';
    }
}

var selected_slot = 0;
function SAVEPAGE(){
    if(JSON.parse(localStorage.getItem("Name"))[selected_slot-1]!=0 && x>0){
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to save this file?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            
          })
          .then((sure) => {
            if(sure) {
                localStorage.setItem(document.getElementById('SAVEs_name').innerHTML + "_img",document.getElementById('imageholder').src)
                localStorage.setItem(document.getElementById('SAVEs_name').innerHTML + "_rsrp",JSON.stringify(rsrp))
                localStorage.setItem(document.getElementById('SAVEs_name').innerHTML + "_pci",JSON.stringify(pci))
                localStorage.setItem(document.getElementById('SAVEs_name').innerHTML + "_x",JSON.stringify(xarr))
                localStorage.setItem(document.getElementById('SAVEs_name').innerHTML + "_y",JSON.stringify(yarr))
                localStorage.setItem(document.getElementById('SAVEs_name').innerHTML + "_settingspci",JSON.stringify(settingsPCI))
                let slot = JSON.parse(localStorage.getItem("Name"));
                slot[selected_slot-1]=1;
                localStorage.setItem("Name",JSON.stringify(slot))
                swal("Success!", "Data Saved Successfully!", "success",{
                    buttons : false,
                });
            } else {
                swal("Cancelled!","The file is not saved!","warning",{
                    buttons : false,
                });
            }
          });
    } else {
        swal("Oops!", "Something went wrong!", "error",{
            buttons : false,
        });  
    }
    Refresh_slot();

}

function LOADPAGE(){
    if(JSON.parse(localStorage.getItem("Name"))[selected_slot-1]==undefined){
        swal("Oops!", "Please select a slot!", "error",{
            buttons : false,
        });
        selected_slot=0;
        document.getElementById('SAVEs_name').innerHTML = 'NONE SELECTED';
        document.getElementById('slot1').style.backgroundColor= 'white';
        document.getElementById('slot2').style.backgroundColor = 'white';
        return;
    }
    if(JSON.parse(localStorage.getItem("Name"))[selected_slot-1]!=0){
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to load this file?",
            icon: "success",
            buttons: true,
            dangerMode: true,
          })
          .then((sure) => {
            if(sure) {
                document.getElementById('saveload').style.display = 'none';
                document.getElementById("upload_form").style.display = 'none';
                for(i=0;i<x;i++)document.getElementById("dot"+i).remove();
                imgfile = (localStorage.getItem(document.getElementById('SAVEs_name').innerHTML + "_img"));
                document.getElementById('imageholder').src = (localStorage.getItem(document.getElementById('SAVEs_name').innerHTML + "_img"));
                rsrp = JSON.parse(localStorage.getItem(document.getElementById('SAVEs_name').innerHTML+"_rsrp"));
                pci = JSON.parse(localStorage.getItem(document.getElementById('SAVEs_name').innerHTML+"_pci"));;
                xarr = JSON.parse(localStorage.getItem(document.getElementById('SAVEs_name').innerHTML+"_x"));;
                yarr = JSON.parse(localStorage.getItem(document.getElementById('SAVEs_name').innerHTML+"_y"));
                settingsPCI = JSON.parse(localStorage.getItem(document.getElementById('SAVEs_name').innerHTML + "_settingspci"));
                x = JSON.parse(localStorage.getItem(document.getElementById('SAVEs_name').innerHTML+"_x")).length;
                for(i=0;i<settingsPCI.length;i++){
                    $("#pcifilter").append(
                        $('<input type="radio" id="pci' + settingsPCI[i] + '" name="pci_radio" onclick="filter()">'),
                        $('<label for="pci' + settingsPCI[i] + '" id="labelpci' + settingsPCI[i] + '"> ' + settingsPCI[i] + ' <label><br>')
                    );
                }
                loadwrite();
                swal("Success!", "File Loaded successfully!", "success",{
                    buttons : false,
                }); 
                document.getElementById("scrbar").style.display = 'inline';
                selected_slot=0;
                document.getElementById('SAVEs_name').innerHTML = 'NONE SELECTED';
                document.getElementById('slot1').style.backgroundColor= 'white';
                document.getElementById('slot2').style.backgroundColor = 'white';
            } else {
              swal("The file has not loaded!",{
                buttons : false,
            });
              selected_slot=0;
              document.getElementById('SAVEs_name').innerHTML = 'NONE SELECTED';
              document.getElementById('slot1').style.backgroundColor= 'white';
              document.getElementById('slot2').style.backgroundColor = 'white';
            }
          });
    }
     else {
        swal("Oops!", "The slot is empty!", "error",{
            buttons : false,
        }); 
        selected_slot=0;
        document.getElementById('SAVEs_name').innerHTML = 'NONE SELECTED';
        document.getElementById('slot1').style.backgroundColor= 'white';
        document.getElementById('slot2').style.backgroundColor = 'white';
    }

}

function DELETEPAGE(){
    if(JSON.parse(localStorage.getItem("Name"))[selected_slot-1]!=0){
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this file?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((sure) => {
            if(sure) {
                localStorage.removeItem(document.getElementById('SAVEs_name').innerHTML + "_img");
                localStorage.removeItem(document.getElementById('SAVEs_name').innerHTML+"_rsrp");
                localStorage.removeItem(document.getElementById('SAVEs_name').innerHTML+"_pci");
                localStorage.removeItem(document.getElementById('SAVEs_name').innerHTML+"_x");
                localStorage.removeItem(document.getElementById('SAVEs_name').innerHTML+"_y");
                let slot = JSON.parse(localStorage.getItem("Name"));
                slot[selected_slot-1]=0;
                localStorage.setItem("Name",JSON.stringify(slot))
            } else {
                swal("Cancelled!","The file is safe!","success",{
                    buttons : false,
                });
            }
          });
    } else {
        swal("Oops!", "The slot is empty!", "error",{
            buttons : false,
        }); 
    }
    Refresh_slot();
}

function Click_saves(txt){
    document.getElementById('SAVEs_name').innerHTML = txt;
    //document.getElementById('slot1').style.backgroundColor= 'white';
    //document.getElementById('slot2').style.backgroundColor = 'white';
    //document.getElementById('slot'+selected_slot).style.backgroundColor = 'aliceblue';
}

function loadwrite(){
    for(i=0;i<x;i++){
        selecteddot = i;
        var hor = xarr[i],
        ver = yarr[i];
            document.getElementById("wholeform").style.display = 'block';
        
        //console return x,y coordinates
        //console.log("dot " + (i+1) + " : x = " + hor + " y = " + ver);

        $("#scrbar").prepend(
            $('<div class="marker" style="border-radius: 50%;"'+ ' id="dot' +i+ '" onclick="ondots(' + i + ')"></div>').css({
                position: 'absolute',
                top: ver + 'px',
                left: hor + 'px',
                width: '15px',
                height: '15px',
                background : 'Maroon',
                display:'inline',
            })
        );
        recolor(rsrp[i]);
    }
    ondots(x-1);

}

var mousex = null,
    mousey = null,
    lastx = 0,
    lasty = 0;
document.addEventListener("mousemove", () => {
    mousex = event.clientX; // Gets Mouse X
    mousey = event.clientY; // Gets Mouse Y
    //console.log(mousex +' '+  mousey); // Prints data
  });

function difference(a, b) {
    return Math.abs(a - b);
}

let mouseDown = 0;  
window.onmousedown = () => {
    if(writing){
        ++mouseDown;  
        if (mouseDown) {  
            console.log('mouse button down')  
        }  
    }
    
}  
window.onmouseup = () => {  
    if(writing)--mouseDown;  
}

window.onload = initDivMouseOver;
function initDivMouseOver()   {
    let imgmouse = document.getElementById("imageholder");
    imgmouse.mouseIsOver = false;
    imgmouse.onmouseover = function()   {
       this.mouseIsOver = true;
    };
    imgmouse.onmouseout = function()   {
       this.mouseIsOver = false;
    }
 }

document.addEventListener("mousemove",function(event) {
    if(document.getElementById("imageholder").mouseIsOver && difference(mousex,lastx)*difference(mousex,lastx)+difference(mousey,lasty)*difference(mousey,lasty)>350 && mouseDown && writing && document.getElementById('scrbar').style.display != 'none'){
        var hor = (event.offsetX),
            ver = (event.offsetY+65)
        document.getElementById("wholeform").style.display = 'block';
    
        //console return x,y coordinates
    console.log("dot " + (x+1) + " : x = " + hor + " y = " + ver);

    yarr.push(ver);
    xarr.push(hor);
    rsrp.push("not filled") ;
    pci.push("not filled");
    $("#scrbar").prepend(
        $('<div class="marker" style="border-radius: 50%;"'+ ' id="dot' +x+ '" onclick="ondots(' + x + ')"></div>').css({
            position: 'absolute',
            top: ver + 'px',
            left: hor + 'px',
            width: '15px',
            height: '15px',
            background : 'Maroon',
            display:'inline',
        })
    );
    ondots(x);
    x++;
    lastx=mousex;
    lasty=mousey;
    }
});

