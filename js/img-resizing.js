class FitObject {
    constructor(id) {
        this.Id = id;
        this.Element = FitObjectsRaw[id];
        //Чтобы функция выполнялась не относительно картинки,
        //а относительно класса.
        this.Element.onload = () => this.OnLoad();
        if(this.Element.complete && !this.InitialSize) this.OnLoad();
    }

    Reset() {
        this.Element.style.width = this.InitialSize.width + "px";
        this.Element.style.height = this.InitialSize.height + "px";
    }

    OnLoad() {
        if(this.InitialSize)return;
        var res = this.Element.getAttribute('res');
        var persp = this.Element.getAttribute('persp');
    
        if(persp) this.Element.style.objectPosition = persp;
    
        var raw = res.split('x');
        var width = raw[0] == '_'? NaN : parseInt(raw[0]);
        var height = raw[1] == '_'? NaN : parseInt(raw[1]);
    
        if(!width && !height) {
            width = this.Element.naturalWidth;
            height = this.Element.naturalHeight;
        }
        else if(!width && height)
            width = this.Element.naturalWidth * (height / this.Element.naturalHeight);
        else if(width && !height)
            height = this.Element.naturalHeight * (width / this.Element.naturalWidth);
        
        this.Element.style.width = width + "px";
        this.Element.style.height = height + "px";
        this.Element.style.minHeight = Math.ceil(height * 0.75) + "px";
        this.InitialSize = {"width":width,"height":height};
        setTimeout(() => function(obj){obj.Element.style.animation = "appear .4s ease-in-out forwards"}(this),this.Id*30);
        this.Update();
    }

    Update() {
        if(!this.InitialSize) return;
        var parentWidth = this.Element.parentElement.clientWidth;
        var width = this.Element.clientWidth;
        var height = this.Element.clientHeight;
        if(parentWidth <= this.InitialSize.width || width / parentWidth >= 0.5) {
            this.Element.style.width = parentWidth + 'px';
            this.Element.style.height =  this.InitialSize.height *  parentWidth / this.InitialSize.width + 'px';
        }
        if(document.body.clientWidth > 600 && this.Element.clientWidth > this.InitialSize.width)
            this.Reset();

    }
}



//Просто элементы целей.
const FitObjectsRaw = document.querySelectorAll("[res]");
//Цели, которые прогрузились, настроились и готовы к работе.

const FitObjects = [];

for(var a = 0; a < FitObjectsRaw.length;a+=1)
    FitObjects.push(new FitObject(a));


function Reset() {
    for(var a = 0; a < FitObjects.length;a+=1)
        FitObjects[a].Reset();
}

function ImgResizing() {
    if(Device() == "desktop" && screen.width == window.innerWidth) {
        Reset();
        return;
    }
    for(var a = 0; a < FitObjects.length;a+=1)
        FitObjects[a].Update();
}

window.addEventListener("resize",ImgResizing);

document.addEventListener("visibilitychange", function() {
    if(!document.hidden) ImgResizing();
});