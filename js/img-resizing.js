const FitObjects = document.querySelectorAll("[res]");
const InitialSizes = [];

for(var a = 0; a < FitObjects.length;a+=1) {
    function Appear(id) {
        setTimeout(function(){FitObjects[id].style.animation = "appear .4s ease-in-out forwards"},id*35 )
    }
    Appear(a);
    var res = FitObjects[a].getAttribute('res');
    var persp = FitObjects[a].getAttribute('persp');

    if(persp) FitObjects[a].style.objectPosition = persp;

    if(!res) {
        FitObjects.splice(a,1);
        continue;
    }
    var raw = res.split('x');
    var width = raw[0] == '_'? NaN : parseInt(raw[0]);
    var height = raw[1] == '_'? NaN : parseInt(raw[1]);

    if(!width && !height) {
        width = FitObjects[a].naturalWidth;
        height = FitObjects[a].naturalHeight;
    }
    else if(!width && height)
        width = FitObjects[a].naturalWidth * (height / FitObjects[a].naturalHeight);
    else if(width && !height)
        height = FitObjects[a].naturalHeight * (width / FitObjects[a].naturalWidth);
    
    FitObjects[a].style.width = width + "px";
    FitObjects[a].style.height = height + "px";
    FitObjects[a].style.minHeight = Math.ceil(height * 0.75) + "px";
    InitialSizes.push({"width":width,"height":height});
}

function Reset() {
    for(var a = 0; a < FitObjects.length;a+=1) {
        FitObjects[a].style.width = InitialSizes[a].width + "px";
        FitObjects[a].style.height = InitialSizes[a].height + "px";
    }
}

function ImgResizing() {
    if(Device() == "desktop" && screen.width == window.innerWidth) {
        Reset();
        return;
    }

    for(var a = 0; a < FitObjects.length;a+=1) {
        var parentWidth = FitObjects[a].parentElement.clientWidth;
        var width = FitObjects[a].clientWidth;
        var height = FitObjects[a].clientHeight;
        if(parentWidth <= InitialSizes[a].width || width / parentWidth >= 0.5) {
            FitObjects[a].style.width = parentWidth + 'px';
            FitObjects[a].style.height = InitialSizes[a].height *  parentWidth / InitialSizes[a].width + 'px';

        }
        if(document.body.clientWidth > 600 && FitObjects[a].clientWidth > InitialSizes[a].width) {
            FitObjects[a].style.width = InitialSizes[a].width + 'px';
            FitObjects[a].style.height = InitialSizes[a].height + 'px';
        }
    }
}

window.addEventListener("resize",ImgResizing);
ImgResizing();
