var AlrHavCPE = false;

function ALbutton(){
    pptwrite=false;
    if(!AlrHavCPE && x>0){
        getdots();
    } else {
        swal("Oops!","Something went wrong!","error",{
            buttons : false,
        });
    }
}

var xan = [], yan = [],pcian = [];
function getdots(){
        xan = []; yan = [];pcian = [];
        for(i=0;i<x;i++){
            if(document.getElementById('dot'+i).style.display != "none"){
                if(rsrp[i]!="not filled"){
                    xan.push(xarr[i]);
                    yan.push(yarr[i]);
                    pcian.push(pci[i]);
                    //console.log('dot '+(i+1));
                } else {
                    swal("Oops!","Something went wrong!","error",{
                        buttons : false,
                    });
                    xan = []; yan = [];pcian = [];
                    return;
                }     
            }
        }
        if(x>0)analyze();
}
var d;
var cpenumber=0;
var fxall=[],
    fyall=[],
    fx=[],
    fy=[],
    rect;
var FiX,FiY,R;
var avg_x = 0,avg_y=0;
//${value}
function analyze(){
    if(Ratio==undefined){
        swal("Cancelled!","You need to define to ratio first!","warning",{
            buttons : false,
        });
        return;
    }
    swal({
        title: "Are you sure?",
        text: "Please state the maximum range of the signal.(Meter)",
        icon: "warning",
        content: "input",
        buttons: true,
        dangerMode: true,
      })
      .then((sure) => {
        if(sure) {
            if(sure<=0){
                swal("Cancelled!","Invalid number!","warning",{
                    buttons : false,
                });
                return;
            }
            R = sure*Ratio;
            //console.log(R + " M.");
            console.log('analyzing');
            for(d=0;d<settingsPCI.length;d++){
                console.log(settingsPCI[d]);
                fxall=[];
                fyall=[];
                let havepci = false;
                for(j=0;j<xan.length;j++){
                    if(settingsPCI[d]==pcian[j]){
                        fxall.push(xan[j]);
                        fyall.push(yan[j]);
                        havepci = true;
                    }
                }
                
                while(fxall.length>1){
                    fx = [];
                    fy = [];
                    fx.push(fxall[0]);
                    fy.push(fyall[0]);

                    for(u=1;u<fxall.length;u++){
                        if((fx[0]-fxall[u])*(fx[0]-fxall[u])+(fy[0]-fyall[u])*(fy[0]-fyall[u])<4*R*R-60*R+225){
                            fx.push(fxall[u]);
                            fy.push(fyall[u]);
                        }
                    }
                    for(u=1;u<fx.length-1;u++){
                        for(v=u+1;v<fx.length;v++){
                            if(Math.sqrt((fx[u]-fx[v])*(fx[u]-fx[v])+(fy[u]-fy[v])*(fy[u]-fy[v]))>2*R){
                                fx.splice(v,1);
                                fy.splice(v,1);
                                v--;
                            }
                        }
                    }

                    for(u=0;u<fx.length;u++){
                        for(v=0;v<fxall.length;v++){
                            if(fx[u]==fxall[v] && fy[u]==fyall[v]){
                                fxall.splice(v,1);
                                fyall.splice(v,1);
                            }
                        }
                    }
                    console.log(fxall);
                    console.log(fyall);
                    console.log("----------");
                    if(fx.length>0){
                        avg_x = 0;avg_y=0;
                        if(havepci){
                            for(k=0;k<fx.length;k++){
                                avg_x += fx[k];
                                avg_y += fy[k];
                            }
                            FiX = avg_x/fx.length;
                            FiY = avg_y/fx.length;
                            $("#cpemap").prepend(
                                $('<div class="marker"'+'onclick="showarea('+ ++cpenumber +')" style="border-radius: 50%;"'+' id="cpepoint'+ cpenumber +'"></div>').css({
                                    position: 'absolute',
                                    top: FiY-3 + 'px',
                                    left: FiX-3 + 'px',
                                    width: '21px',
                                    height: '21px',
                                    backgroundImage: 'url("cpe.png")',
                                    backgroundSize:'100%',
                                    display:'inline',
                                })
                            );
                            $("#cpemap").prepend(
                                $('<div class="marker" style="border-radius: 50%;"'+' id="cpearea'+ cpenumber +'"></div>').css({
                                    position: 'absolute',
                                    top: FiY-(R) + 'px',
                                    left: FiX-(R) + 'px',
                                    width: (R)*2+15 + 'px',
                                    height: (R)*2+15 + 'px',
                                    background: 'black',
                                    display:'none',
                                    opacity: '30%',
                                })
                            );
                            AlrHavCPE = true;
                        }
                        swal("Success!","The best cpe points have been located!","success",{
                            buttons : false,
                        });
                    } else {
                        swal("Oops!","Something went wrong!","error",{
                            buttons : false,
                        });
                    }
                }     
            }
        } else {
          swal("Cancelled!","You pressed cancel!","warning",{
            buttons : false,
        });
        }
      });

    
}

function showarea(cpenum){
    if(document.getElementById('cpearea'+cpenum).style.display == "none")document.getElementById('cpearea'+cpenum).style.display = "inline";
    else document.getElementById('cpearea'+cpenum).style.display = "none";
}

function clearCPE(){
    if(AlrHavCPE){
        swal({
            title: "Are you sure?",
            text: "Please click again to confirm.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((sure) => {
            if(sure) {
                for(i=0;i<settingsPCI.length;i++){
                    for(j=0;j<pcian.length;j++){
                        if(settingsPCI[i]==pcian[j]){
                            //console.log(settingsPCI[i]);
                            //document.getElementById('cpearea'+settingsPCI[i]).remove();
                            document.getElementById('cpepoint'+settingsPCI[i]).remove();
                            break;
                        }
                    }
                }
                AlrHavCPE = false;
                swal("Success!","Your old usage has been removed!","success",{
                    buttons : false,
                });
            } else {
              swal("Cancelled!","The cpe points are safe!","warning",{
                buttons : false,
            });
            }
          });
    } else {
        swal("Oops!","There's no cpe points to remove!","error",{
            buttons : false,
        });
    }

}
