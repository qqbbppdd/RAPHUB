const content = document.querySelector(".concerts-holder");

for(var a = 0; a < concerts.length;a+=1) {
    content.innerHTML += '<div class="qblock"><a target="_blank" href="'+concerts[a].link+'"><img id="' + a +'" class="qimage" src="' + concerts[a].path+'"><div class="bottom-panel"><h1 class="qheader" >' +concerts[a].name +'</h1></div></a></div>';
}

//Когда последний концерт прогрузился,
//Подвал сайта становится видимым.
document.getElementById(concerts.length-1).onload = function() {
    document.querySelector("footer").style.visibility = "visible";
};

function conc(id) {
    return content.children[id];
}

function UpdateConcerts() {
    var width = document.body.clientWidth;
    if(width <= 768) {
        var percent = width <=575? "100%" : "90%";
        for(var a = 0; a < content.children.length;a+=1) {
            conc(a).style.width = percent;
            conc(a).style.height = conc(a).clientWidth + "px";
        }
    }
    else {
        for(var a = 0; a < content.children.length;a+=1) {
            conc(a).style.width = "325px";
            conc(a).style.height = "325px";
        }
    }
}

window.addEventListener("resize",UpdateConcerts);

UpdateConcerts();
