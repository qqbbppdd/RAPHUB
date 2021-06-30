const holder = document.querySelector(".qimagecontainer");
const queue = [];
let progress = 0;

holder.classList.add("loading");

for(var a = 1; a <= count;a+=1)
    holder.innerHTML += '<img width="400" onclick="OpenImg(this)" style="max-width:100%" class="qimage tile" src="photos/' + root + a + '.jpg">';

function Activate(id) {
    setTimeout(function() {
        if(id == 0) holder.classList.remove("loading");
        holder.children[id].style.visibility = "visible";
        holder.children[id].style.animation = "appear .4s forwards ease-in-out";
        if(id == holder.children.length - 1) document.querySelector("footer").style.visibility = "visible";
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
    holder.children[id].onload = function() {
        if(progress == id) {
            Activate(id);   
            progress+=1;
            Queue();
            return;
        }
        queue.push(id);
    };
}

for(var a = 0; a < holder.children.length;a+=1)
    Configure(a);


function pic(id) {
    return holder.children[id];
}

function UpdatePopupImg() {
    var width = document.body.clientWidth;
    var height = window.innerHeight;
    var img = document.querySelector("#popup-img");
    var popupwin = document.querySelector(".popup-window");
    var holderheight = height * 0.9 - 20;
    if(width > 1005) {
        if(holderheight < 525) {
            img.style.minHeight = holderheight+ "px";
        }
        else {
            img.style.minHeight="525px";
        }
        if(popupwin.clientWidth - 20 > img.clientWidth || popupwin.clientWidth - 20 < img.clientWidth) {
            popupwin.style.width = (img.clientWidth + 20) + "px";
        }
    }
    else {
        popupwin.style.width = null;
        img.style.minHeight = null;
        popupwin.style.height = "auto";
    }
    
}

function UpdatePhotos() {
    var width = document.body.clientWidth;
    if(width <= 768) {
        var percent = width <=575? "100%" : "90%";
        for(var a = 0; a < holder.children.length;a+=1) {
            pic(a).style.width = percent;
            pic(a).style.height = pic(a).clientWidth + "px";
        }
    }
    else {
        for(var a = 0; a < holder.children.length;a+=1) {
            pic(a).style.width = "350px";
            pic(a).style.height = "350px";
        }
    }
    UpdatePopupImg();
}

window.addEventListener("resize",UpdatePhotos);
UpdatePhotos();

let popup_state = false;
let popup = document.querySelector(".popup");

function TogglePopup(state) {
    if(state) {
        popup.style.animation = "popup-open .5s both";
        popup_state = true;
    }
    else {
        popup.style.animation = "popup-close .5s both";
        popup_state = false;
    }
}

function OpenImg(img) {
    if(popup_state) return;
    document.querySelector("#popup-img").src=img.src;
    TogglePopup(true);
    UpdatePopupImg();
}

window.addEventListener("mousedown",function() {
    if(popup_state) TogglePopup(false);
});