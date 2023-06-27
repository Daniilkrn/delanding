/* eslint-disable no-undef */
/* eslint-disable no-unused-vars*/
const talkBtn = document.querySelector(".btn_talk");
let form = document.querySelector(".form");
let email = document.querySelector(".email");
let area = document.querySelector(".area");
let nickForm = document.querySelector(".nick");
let body = document.querySelector("body");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector(".close");
let closeModalSent = document.querySelector(".close2");
let modalSent = document.querySelector(".modalConfirm");
let modalSentBox = document.querySelector(".modalConfrim_box");
let modalBox = document.querySelector(".modal_box");

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let inputs = [
    {
        validate: true,
        error: "обязательное поле!",
    },
    {
        validate: true,
        error: "обязательное поле!",
    },
    {
        validate: true,
        error: "обязательное поле!",
    }
];

function validation (form) {

    let check = {
        validation: false,
    };

    function removeError (input,flag) {
        const parent = input.closest("label");
        const child = parent.querySelector(".errorText");
        
        if(input.classList.contains("error")){
            child.remove();
            child.classList.remove(".errorText");
            input.classList.remove("error");
        }

    }

    function createError(input,text) {
        const parent = input.parentNode;
        const p = document.createElement("p");
        p.classList.add("errorText");
        p.textContent = text;
        input.classList.add("error");
        parent.append(p);
    }

    form.querySelectorAll("input").forEach((input,idx) => {

        removeError(input);
        let email;

        if(input.value == ""){
            if(idx !== 1) createError(input, "обязательное поле!", true);
        } else {
            if(idx !== 1){
                const parent = input.closest("label");
                const child = parent.querySelector(".errorText");
                if(child) {
                    child.remove();
                    child.classList.remove(".errorText");
                    input.classList.remove("error");
                    check.validation = true;
                } 
            } 
        }

        if(idx === 1){
            email = validateEmail(input.value);
            if(!email){
                createError(input, "введите ваш e-mail!");
            } else {
                check.validation = true;
            }
        }

    });
    
    return check.validation;
}


form.onsubmit = function submitForm(event) {
    event.preventDefault();
    
    if(validation(this) == true){
        scrollController.setMessageModal();
    }
};

const scrollController = {

    position: 0,
    flag: false,

    disabled() {
        let pos = window.scrollY;
        body.classList.add("openBody");
        modal.classList.add("open");
        this.position = pos;
        this.flag = true;
        confirmPos(this.position);
    },

    enabled() {
        modal.classList.remove("open");
        body.classList.remove("openBody");
        return confirmPos(this.position, this.flag);
    },

    setMessageModal() {
        modal.classList.remove("open");
        modalSent.classList.add("open");
    },

    disableMessageModal() {
        modalSent.classList.remove("open");
        form.reset();
        confirmPos(this.position, this.flag);
    }
};

talkBtn.addEventListener("click", () => {
    scrollController.disabled();
});

closeModal.addEventListener("click", () => {
    scrollController.enabled();
});

closeModalSent.addEventListener("click", () => {
    scrollController.disableMessageModal();
});

modal.addEventListener("click", () => {
    scrollController.enabled();
});

modalBox.addEventListener("click", (e) => {
    e.stopPropagation();
});

modalSentBox.addEventListener("click", (e) => {
    e.stopPropagation();
});

modalSent.addEventListener("click", () => {
    scrollController.disableMessageModal();
});


function confirmPos(pos, flag) {
    window.scrollTo({
        top: pos,
        left: 0,
    });
}