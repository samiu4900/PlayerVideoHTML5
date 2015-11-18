var imageAddr = "skin/speedtest.jpg"; 
var downloadSize = 80322; //bytes
var speedBps;
var speedKbps;
var speedMbps;
var startTime, endTime;
var callback;
var videoSet = false;


function KrPanoReady($callback) {
    callback = $callback;
    //var oProgress = document.getElementById("progress");
    //oProgress.innerHTML = "Loading the image, please wait...";
    console.log("player ready");
    window.setTimeout(MeasureConnectionSpeed, 100);
};



function MeasureConnectionSpeed() 
{
    //var oProgress = document.getElementById("progress");
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        //oProgress.innerHTML = "Invalid image, or error downloading";
        console.log("Invalid image, or error downloading");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    console.log("testing speed...");
}



function showResults() 
{
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    speedBps = (bitsLoaded / duration).toFixed(2);
    speedKbps = (speedBps / 1024).toFixed(2);
    speedMbps = (speedKbps / 1024).toFixed(2);
    

    callback();
    
    //console.log( speedBps + " bps" );
    //console.log( speedKbps + " Kbps" );
    //console.log( speedMbps + " Mbps" );
}



function LoadKRPanoVideo() 
{
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var krpano = document.getElementById("krpanoSWFObject");
    if( krpano && !userAgent.match( /iPhone/i ) )
    {
        if( speedMbps < 1 ) {
            console.log("baixa")
            krpano.call("videointerface_selectmenuitem(configmenu, q1);");
            krpano.call("change_video_file(q1, 'baixa.mp4|baixa.webm');");
        }
        else if( speedMbps < 5 ) {
            console.log("media")
            krpano.call("videointerface_selectmenuitem(configmenu, q2);");
            krpano.call("change_video_file(q2, 'media.mp4|media.webm');");
        }
        else {
            console.log("alta")
            krpano.call("videointerface_selectmenuitem(configmenu, q3);");
            krpano.call("change_video_file(q3, 'alta.mp4|alta.webm');");
        }

        console.log("speed result: " + speedMbps);
    }
}


function PreparePlayer() 
{

    if( videoSet ) return;
    videoSet = true
    window.setTimeout(function() {
        var krpano = document.getElementById("krpanoSWFObject");
    
        krpano.call("set(plugin[get(videointerface_video)].volume, 0);");
        krpano.call("plugin[get(videointerface_video)].play()");
        window.setTimeout(function() 
        {
            krpano.call("set(plugin[get(videointerface_video)].volume, 1);");
            krpano.call("plugin[get(videointerface_video)].pause()");
            krpano.call("show_tutorial()");
            
        }, 450);
    }, 100 );

    
}