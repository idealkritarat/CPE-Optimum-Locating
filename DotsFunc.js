function resize_dots(){
    for(i=0;i<x;i++){
        if(document.getElementById("dot"+i).style.width == '15px'){
                document.getElementById("dot"+i).style.width = '10px';
                document.getElementById("dot"+i).style.height = '10px';
                let k = (document.getElementById("dot"+i).style.top).slice(0,-2);
                document.getElementById("dot"+i).style.top = (parseFloat(k)+2.5)+"px";
                k = (document.getElementById("dot"+i).style.left).slice(0,-2);
                document.getElementById("dot"+i).style.left = (parseFloat(k)+2.5)+"px";
        }
    }
}

function rehide_dots(){
    for(i=0;i<x;i++){
        document.getElementById("dot"+i).style.display='none';
    }
}

function ondots(num){
    resize_dots();
    document.getElementById("settingsform").style.display = 'none';
    document.getElementById("wholeform").style.display = 'block';
    let k = (document.getElementById("dot"+num).style.top).slice(0,-2);
    document.getElementById("dot"+num).style.top = (parseFloat(k)-2.5)+"px";
    k = (document.getElementById("dot"+num).style.left).slice(0,-2);
    document.getElementById("dot"+num).style.left = (parseFloat(k)-2.5)+"px";
    document.getElementById("dot"+num).style.width = '15px';
    document.getElementById("dot"+num).style.height = '15px';
    selecteddot=num;
    document.getElementById('dothead').innerHTML = "Dashboard (" + (num+1) + ")";
    document.getElementById('rsrpshow').innerHTML = "rsrp : " + rsrp[num] + " dBm";
    document.getElementById('pcishow').innerHTML = "pci : " + pci[num];
    document.getElementById("rsrpinput").value = "";
    document.getElementById("rsrpform").style.display = 'none';
    document.getElementById("+rsrp").style.display = 'inline';
    document.getElementById("pciinput").value = "";
    document.getElementById("pciform").style.display = 'none';
    document.getElementById("+pci").style.display = 'inline';
}

function removedot(){
    document.getElementById("wholeform").style.display = 'block';
    document.getElementById("dot"+selecteddot).remove();
    let l=pci[selecteddot];
    xarr.splice(selecteddot,1);
    yarr.splice(selecteddot,1);
    rsrp.splice(selecteddot,1);
    pci.splice(selecteddot,1);
    if(l!="not filled")pcicheckbox_remove(l);
    for(i=selecteddot;i<rsrp.length;i++){
        $("#dot"+(i+1)).attr("onclick","ondots("+i+")");
        document.getElementById("dot"+(i+1)).id = "dot"+i;
    }
    console.log("remove dot " + (selecteddot+1));
    x--;
    if(x==0)outofdot();
    else ondots(x-1);
}

function outofdot(){
    document.getElementById("wholeform").style.display = 'none';
    console.log("out of dots");
}

