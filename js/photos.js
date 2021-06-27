const holder = document.querySelector(".qimagecontainer");

for(var a = 1; a <= count;a+=1) {
    holder.innerHTML += '<img id="' + a +'" width="400" onclick="OpenImg(this)" style="max-width:100%" class="qimage tile" src="photos/' + root + a + '.jpg">';
}

//Когда последнее фото прогрузилось,
//Подвал сайта становится видимым.
document.getElementById(count).onload = function() {
    document.querySelector("footer").style.visibility = "visible";
};


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