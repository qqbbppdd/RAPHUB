const holder = document.querySelector(".tracks");

for(var a = 0; a < music.length;a+=1) {
    holder.innerHTML += '<div class="qblock trackholder"><h1>' +music[a].name +'</h1><audio controls><source src="' +music[a].path +'" type="audio/mpeg"></audio><div class="buttonholder"><a class="qbutton to-clip" target="_blank" href="' + music[a].video+'">Клип</a><a class="qbutton download" href="' +music[a].path +'" download>Скачать</a></div></div>';
}

//Когда последний плеер добавлен на страницу,
//Подвал сайта становится видимым.
document.querySelector("footer").style.visibility = "visible";

const players = document.querySelectorAll("audio");

for(var a = 0; a < players.length;a+=1) {
    players[a].onplay = function() {
        for(var b = 0; b < players.length;b+=1) {
            if(players[b] == this) continue;
            players[b].pause();
        }
    };
}
