
let form = document.querySelector(".form");
let email = document.querySelector(".email");
let area = document.querySelector(".area");
let nickForm = document.querySelector(".nick");

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

form.onsubmit = function (event) {
    event.preventDefault();
    let emailVal = email.value;
    if(area.value === "" || area.value.length > 100){
        area.classList.add("error");
    } else {
        area.classList.remove("error");
    }
    if(nickForm.value === "" || nickForm.value.length > 30){
        nickForm.classList.add("error");
    } else {
        nickForm.classList.remove("error");
    }
    if(!validateEmail(emailVal)) {
        email.classList.add("error");
    } else {
        alert("w");
        email.classList.remove("error");
        document.querySelector(".modalConfirm").classList.add("open");
        setTimeout(() => {
            document.querySelector(".modalConfirm").classList.remove("open");
        }, 3000);
        setTimeout(() => {
            document.querySelector(".modal").classList.remove("open");
            document.body.classList.remove("openBody");
        }, 3001);
    }
};


document.querySelector(".close2").addEventListener("click",()=>{
    document.querySelector(".modalConfirm").classList.remove("open");
    document.querySelector(".modal").classList.remove("open");
    document.body.classList.remove("openBody");
});

document.querySelector(".modal");
const talkBtn = document.querySelector(".btn_talk_link");
talkBtn.addEventListener("click",()=>{
    let email = document.querySelector(".email");
    email.value = "";
    document.querySelector(".modal").classList.add("open");
    document.body.classList.add("openBody");
    document.body.scrollTo(120,0);
});

document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".modal").classList.remove("open");
    document.body.classList.remove("openBody");
    
});

document.querySelector(".modal").addEventListener("click", ()=>{
    document.querySelector(".modal").classList.remove("open");
    document.body.classList.remove("openBody");
});

document.querySelector(".modal_box").addEventListener("click", (e) => {
    e.stopPropagation();
});