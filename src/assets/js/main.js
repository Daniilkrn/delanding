/* eslint-disable no-undef */

//= components/form.js
document.querySelector(".modal");
const talkBtn = document.querySelector(".btn_talk_link");
talkBtn.addEventListener("click",()=>{
    document.querySelector(".modal").classList.add("open");
    document.body.classList.add("openBody");
    document.body.scrollTo(120,0);
});

document.querySelector(".modal").addEventListener("click", ()=>{
    document.querySelector(".modal").classList.remove("open");
    document.body.classList.remove("openBody");
    form.reset();
});

document.querySelector(".modal_box").addEventListener("click", (e) => {
    e.stopPropagation();
});