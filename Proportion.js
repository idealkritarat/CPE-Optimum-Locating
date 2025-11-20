var pptdot=0,pptwrite=false,Ratio,xppt = [], yppt = [];
function Proportion(){
    if(document.getElementById('imageholder').src!=undefined){
        swal("In the process of defining the ratio.","Please plot 2 dots and  the distance between them.","warning");  
        document.getElementById("pptform").style.display = 'inline';
        if(pptdot>0){
            document.getElementById("ppt1").remove();
            document.getElementById("ppt2").remove();
        }
        xppt = [];
        yppt = [];
        pptwrite=true;
        pptdot=0;
    }else{
        swal("Oops!", "Something went wrong!, There's no image!", "error",{
            buttons : false,
        });
    }
    
}

function distanceppt(){
    if(pptdot==2 && document.getElementById("pptdistance").value>0){
        let temp = Math.sqrt((xppt[0]-xppt[1])*(xppt[0]-xppt[1])+(yppt[0]-yppt[1])*(yppt[0]-yppt[1]))
        Ratio = temp/document.getElementById("pptdistance").value;
        document.getElementById("pptdistance").value = '';
        document.getElementById("ppttell").style.display = 'inline';
        document.getElementById("ppttell").innerHTML = 'The Ratio is '+ Ratio.toFixed(2) +' pixel per meter.';
        document.getElementById("ppt1").remove();
        document.getElementById("ppt2").remove();
        xppt = [];
        yppt = [];
        pptwrite=false;
        pptdot=0;
        document.getElementById("pptform").style.display = 'none';
        swal("Success!", "The ratio has been defined!", "success",{
            buttons : false,
        });  
    } else {
        swal("Oops!", "Something went wrong!", "error",{
            buttons : false,
        });   
        document.getElementById("pptdistance").value = '';
    }
    
}

$('#imageholder').click(function(event) {
    if(pptwrite && pptdot<2){
        var hor = (event.offsetX),
            ver = (event.offsetY+65);
        xppt.push(hor);
        yppt.push(ver);
        $("#scrbar").prepend(
            $('<div class="marker" style="border-radius: 50%;"'+'id="ppt'+ ++pptdot +'"></div>').css({
                position: 'absolute',
                top: ver+2.5 + 'px',
                left: hor+6 + 'px',
                width: '5px',
                height: '5px',
                display:'inline',
                backgroundColor : 'black',
            })
        );
    }    
});
