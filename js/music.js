const holder = document.querySelector(".tracks");
const queue = [];
let progress = 0;

holder.classList.add("loading");

for(var a = 0; a < music.length;a+=1) 
    holder.innerHTML += '<div class="qblock trackholder"><h1>' +music[a].name +'</h1><audio controls><source src="' +music[a].path +'" type="audio/mpeg"></audio><div class="buttonholder"><a class="qbutton to-clip" target="_blank" href="' + music[a].video+'">Клип</a><a class="qbutton download" href="' +music[a].path +'" download>Скачать</a></div></div>';

let audios = document.querySelectorAll("audio");

function Activate(id) {
    setTimeout(function() {
        if(id == 0) holder.classList.remove("loading");
        audios[id].parentElement.style.visibility = "visible";
        audios[id].parentElement.style.animation = "appear .4s forwards ease-in-out";

        //Когда последний плеер загружен,
        //Подвал сайта становится видимым.
        if(id == audios.length - 1)
            document.querySelector("footer").style.visibility = "visible";
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
    audios[id].oncanplay = function() {
        if(progress == id) {
            Activate(id);
            progress+=1;
            Queue();
            return;
        }
        queue.push(id);
    };
}

for(var a = 0; a < audios.length;a+=1)
    Configure(a);

const players = document.querySelectorAll("audio");

for(var a = 0; a < players.length;a+=1) {
    players[a].onplay = function() {
        for(var b = 0; b < players.length;b+=1) {
            if(players[b] == this) continue;
            players[b].pause();
        }
    };
}
