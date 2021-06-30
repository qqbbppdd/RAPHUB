const holder = document.querySelector(".concerts-holder");
const queue = [];
let progress = 0;

holder.classList.add("loading");

for(var a = 0; a < concerts.length;a+=1)
    holder.innerHTML += '<div class="qblock"><a target="_blank" href="'+concerts[a].link+'"><img class="qimage" src="' + concerts[a].path+'"><div class="bottom-panel"><h1 class="qheader" >' +concerts[a].name +'</h1></div></a></div>';

let icons = document.querySelectorAll(".concerts-holder img");

function Activate(id) {
    setTimeout(function() {
        if(id == 0) holder.classList.remove("loading");
        else if(id == icons.length - 1) document.querySelector("footer").style.visibility = "visible";
        icons[id].parentElement.parentElement.style.visibility = "visible";
        icons[id].parentElement.parentElement.style.animation = "appear .4s forwards ease-in-out";
    },30*id);
}

function Queue() {
    if(queue.length == 0) return;
    var index = queue.indexOf(progress);
    if(index == -1) return;
    queue.splice(index,1);
    Activate(progress);
    progress+=1;
    Queue();
}

function Configure(id) {
    icons[id].onload = function() {
        if(progress == id) {
            Activate(id);   
            progress+=1;
            Queue();
            return;
        }
        queue.push(id);
    };
}

for(var a = 0; a < icons.length;a+=1)
    Configure(a);


function conc(id) {
    return holder.children[id];
}

function UpdateConcerts() {
    var width = document.body.clientWidth;
    if(width <= 768) {
        var percent = width <=575? "100%" : "90%";
        for(var a = 0; a < holder.children.length;a+=1) {
            conc(a).style.width = percent;
            conc(a).style.height = conc(a).clientWidth + "px";
        }
    }
    else {
        for(var a = 0; a < holder.children.length;a+=1) {
            conc(a).style.width = "325px";
            conc(a).style.height = "325px";
        }
    }
}

window.addEventListener("resize",UpdateConcerts);

UpdateConcerts();
