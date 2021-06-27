//EFFECT OF OPENING

function IsSimple() {
    return (window.innerWidth <= 1128 || window.innerHeight <= 700)
}

function OpenArticle(id,root) {
    if(Device() != "desktop" || IsSimple()) {
        location.href = root + "/index.html";
        return;
    }
    setTimeout(function() { location.href = root + "/index.html" },900);
    var people = document.querySelector(".people");
    for(var a = 0; a < 3; a+=1) {
        if(a == id) continue;
        people.children[a].style.animation = "disappear .4s ease-in-out forwards";
    }
    if(id != 1) people.children[id].style.animation = "toCenterFrom" + (id < 1? "Left" : "Right") + " .4s ease-in-out forwards";
    people.children[id].style.pointerEvents = "none";
    document.querySelector(".header").style.animation = "disappear .4s ease-in-out forwards";
}

//UPDATES POPUP

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

function Send(name,email) {
    alert("Спасибо!");
    TogglePopup(false);
    try {
        Email.send({
            Host: "smtp.yandex.ru",
            Username: "mrkostinilya@yandex.ru",
            Password: "Tb|_Lox228",
            To: "ilyaspecial999@gmail.com",
            From: "mrkostinilya@yandex.ru",
            Subject: "Подписка на обновления",
            Body: "Ура! " + name + " подписался(ась) на наши обновления!<br>Email: " + email
        }).then(message => console.log("SMTP: " + message));
        localStorage.setItem("registered","true");
    }catch {
        alert("Что-то пошло не так.");
    }
}

function strweight(str) {
    for(var a = 0; a < str.length;a+=1) {
        if(str[a] != ' ' && str[a] != '\n' && str[a] != '') return true;
    }
    return false;
}

const popup = document.querySelector(".popup");
let registered = localStorage.getItem("registered");
let popup_state = false;

var cmfinp_opened = false;
var raised = false;
var butt_aim = false;
const comfort_input = ["tablet","mobile"].includes(Device());

function ComfortInputs_Focus() {
    if(butt_aim) return;
    raised = true;
    popup.style.alignItems = "start";
    document.querySelector(".comfort-inputs").style.marginTop = "15px";
}

function ComfortInputs_UnFocus() {
    if(butt_aim) return;
    raised = false;
    popup.style.alignItems = "center";
    document.querySelector(".comfort-inputs").style.marginTop = "0px";
}

function Done() {
    if(comfort_input && !cmfinp_opened) {
        document.querySelector(".registration").style.display="none";
        document.querySelector(".comfort-inputs").style.display = "flex";
        
        var name_comf = document.querySelector("#NAME-comf"); var email_comf = document.querySelector("#EMAIL-comf");
        var cmf_b1 = document.querySelector("#cmf-b1"); var cmf_b2 = document.querySelector("#cmf-b2");

        name_comf.addEventListener("focus",ComfortInputs_Focus);
        name_comf.addEventListener("focusout",ComfortInputs_UnFocus);
        email_comf.addEventListener("focus",ComfortInputs_Focus);
        email_comf.addEventListener("focusout",ComfortInputs_UnFocus);

        cmf_b1.addEventListener("mouseover",function() {butt_aim = true; });
        cmf_b1.addEventListener("mouseout",function() {butt_aim = false; });
        cmf_b2.addEventListener("mouseover",function() {butt_aim = true; });
        cmf_b2.addEventListener("mouseout",function() {butt_aim = false; });

        name_comf.focus();

        cmfinp_opened = true;
        return;
    }
    var name = document.querySelector(comfort_input?"#NAME-comf" : "#NAME").value;
    var email = document.querySelector(comfort_input?"#EMAIL-comf" : "#EMAIL").value;
    if(!strweight(name) || !strweight(email)) {
        alert("Ошибка!");
        return;
    }
    Send(name,email);
}

function Cancel() {
    TogglePopup(false);
    localStorage.setItem("registered","false");
}

if(comfort_input) {
    var form = document.querySelector(".form");
    form.style.display="none";
}

if(!registered)
    TogglePopup(true);