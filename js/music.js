const holder = document.querySelector(".tracks");
const queue = [];
let progress = -1;
let lastLoadedTime;

//<audio controls><source src="' +music[a].path +'" type="audio/mpeg"></audio>

holder.classList.add("loading");

for(var a = 0; a < music.length;a+=1) 
    holder.innerHTML += '<div class="qblock trackholder"><h1>' +music[a].name +'</h1><div class="buttonholder"><a class="qbutton to-clip" target="_blank" href="' + music[a].video+'">Клип</a><a class="qbutton download" href="' +music[a].path +'" download>Скачать</a></div></div>';

function LastAudio() {
    var audios = document.querySelectorAll("audio");
    return audios[audios.length - 1];
}

function Activate() {
    var target = LastAudio();
    if(progress == 0) holder.classList.remove("loading");
    else if(progress == music.length - 1) document.querySelector("footer").style.visibility = "visible";

    var timeDiff = !lastLoadedTime? 0 : Date.now() - lastLoadedTime;
    var delay = 30*progress - timeDiff;

    console.log(delay);

    setTimeout(function() {
        target.parentElement.style.visibility = "visible";
        target.parentElement.style.animation = "appear .4s forwards ease-in-out";
    },(delay < 0? 0 : delay));

    lastLoadedTime = Date.now();
}

function OnLoad() {
    Activate();
    Next();
}

function Next() {
    progress++;
    if(progress == music.length) return;
    var newAudio = document.createElement("audio");
    newAudio.innerHTML = '<source src="' +music[progress].path +'" type="audio/mpeg">';
    newAudio.controls = true;
    newAudio.oncanplay = OnLoad;
    newAudio.onplay = ShutOthers;
    holder.children[progress].insertBefore(newAudio,holder.children[progress].children[1]);
}

Next();

function ShutOthers() {
    const players = document.querySelectorAll("audio");
    for(var b = 0; b < players.length;b+=1) {
        if(players[b] == this) continue;
        players[b].pause();
    }
}