const menu = document.querySelector(".qmenu");
const logo = document.querySelector(".qtextlogo");
const ul = document.querySelector("#ul");
const footer = document.querySelector("footer") ;
const ul_width = ul.clientWidth;
const mbutton = document.querySelector(".qmenubutton");

let compact_menu = false;
let menu_shown = false;

function MenuToCompact() {
    if(compact_menu) return;
    compact_menu = true;
    ul.classList.add("compacted");
    mbutton.style.visibility = "visible";
}

function MenuFromCompact() {
    if(!compact_menu) return;
    compact_menu = false;
    menu_shown = false;
    menu.style.borderBottomRightRadius = "20px";
    ul.style.animation = "none";
    ul.classList.remove("compacted");
    mbutton.style.visibility = "hidden";
}

function Device() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua))
        return "tablet";
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua))
        return "mobile";
    return "desktop";
}

function Update(first) {
    var width = document.body.clientWidth;
    if(first) ul.style.opacity = "1";
    if (width * 0.04 + logo.clientWidth + 10 > width/2 - ul_width/2)
        MenuToCompact();
    else
        MenuFromCompact();
}

function Random(min, max) {
    return Math.floor(rand = min + Math.random() * (max + 1 - min));
}

function RandomElement(array) {
    return array[0,Random(array.length) - 1];
}

mbutton.addEventListener("click",function(ev) {
    if(menu_shown) {
        ul.style.animation = "sidebar-close 0.4s both ease-in-out";
        menu.style.borderBottomRightRadius = "20px";
        menu_shown = false;
    }
    else {
        ul.style.animation = "sidebar-open 0.4s both ease-in-out";
        menu.style.borderBottomRightRadius = "0";
        menu_shown = true;
    }
});


window.addEventListener("resize",Update);
Update(true);