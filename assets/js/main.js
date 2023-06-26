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



document.querySelectorAll(".input").forEach((el, _idx) => el.addEventListener("input", (e) => {
    // let className = e.target.className.split(" ")[1];
    // let emailVal = email.value;
    let p = el.closest("label");
    if (e.target.value.length <= 0) {
        // inputs[_idx].validate = true;
        e.target.classList.add("error");
        // let newEl = p.appendChild(document.createElement("p"));
        // newEl.className = "p_error";

    } else {
        e.target.classList.remove("error");
        // let p = document.querySelector(".p_error");
        // if (p) p.parentNode.removeChild(p);
        // inputs[_idx].error = "";
        // inputs[_idx].validate = false;
    }

    // if (validateEmail(e.target.value)) {
    //     inputs[1].validate = false;
    //     inputs[1].error = "";
    // } else {
    //     inputs[1].validate = true;
    //     inputs[1].error = "введите корректный e-mail";
    // }
}));

function validation(form) {


    function removeError(input) {
        const parent = input.closest("label");
        const child = parent.querySelector(".errorText");
        console.log(input.classList);
        if (input.classList.contains("error")) {
            child.remove();
            child.classList.remove(".errorText");
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const p = document.createElement("p");
        p.classList.add("errorText");
        p.textContent = text;
        input.classList.add("error");
        parent.append(p);
    }

    let result = true;

    form.querySelectorAll("input").forEach(input => {

        removeError(input);

        if (input.value == "") {
            result = false;
            createError(input, "обязательное поле!");
        }
    });

    return result;
}


form.onsubmit = function submitForm(event) {
    event.preventDefault();

    if (validation(this) == true) {
        scrollController.setMessageModal();
    }
    // let check = inputs.filter(input => input.validate === true);

    // if (!check.length) {
    //     scrollController.setMessageModal();
    // }
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
    let documentEl = {};
    flag ? documentEl = window : documentEl = body;

    setTimeout(window.scrollTo({
        top: pos,
        left: 0,
    }));
}