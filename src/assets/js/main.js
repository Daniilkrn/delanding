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

function validation(form) {

    let count = [];

    let check = {
        validationAll: false,
        validationEmail: false,
    };

    function removeError(input, flag) {
        const parent = input.closest("label");
        const child = parent.querySelector(".errorText");

        if (input.classList.contains("error")) {
            child.remove();
            child.classList.remove(".errorText");
            input.classList.remove("error");
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

    form.querySelectorAll("input").forEach((input, idx) => {

        removeError(input);
        let email;
    
        if (idx === 1) {
            email = validateEmail(input.value);
            if (!email) {
                createError(input, "введите ваш e-mail!");
            } else {
                check.validationEmail = true;
            }
        }

        if (input.value.trim() == "") {
            if (idx !== 1) createError(input, "обязательное поле!", true);
        } else {
            count.push(idx);
            if(email && count.length > 1) check.validationAll = true;
        }

    });

    if(check.validationAll && check.validationEmail) return true;

}

form.onsubmit = function submitForm(event) {
    event.preventDefault();

    if (validation(this) == true) {
        submitHandler(this);
    }
};

/*шаблон для отправки данных на бэк*/

async function submitHandler(formCurrent) {

    formCurrent.classList.add("sending");
    let div = document.createElement("div");
    div.className = "sendingDiv";
    div.innerHTML = `
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
    formCurrent.append(div);

    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title: "testTitle",
            body: "testBody",
            userId: 1,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then(response => response.json())
        .then((data) => {
            if (data) {
                scrollController.setMessageModal();
            } else {
                formCurrent.classList.remove("sending");
                formCurrent.removeChild(div);
            }
        })
        .finally(()=>{
            formCurrent.classList.remove("sending");
            formCurrent.removeChild(div);
            formCurrent.reset();
        });
}

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
