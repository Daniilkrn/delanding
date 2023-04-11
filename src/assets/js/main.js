//= components/form.js

const modal = document.querySelector('.modal')
const talkBtn = document.querySelector('.btn_talk_link')
talkBtn.addEventListener("click",()=>{
    let email = document.querySelector('.email')
    email.value = ''
    document.querySelector('.modal').classList.add('open')
    document.body.classList.add('openBody')
    document.body.scrollTo(120,0)
})

const close = document.querySelector('.close').addEventListener("click",(e)=>{
    document.querySelector('.modal').classList.remove('open')
    document.body.classList.remove("openBody")
    
})

document.querySelector('.modal').addEventListener("click", (e)=>{
    document.querySelector('.modal').classList.remove('open')
    document.body.classList.remove("openBody")
})

const modalBox = document.querySelector('.modal_box').addEventListener('click', (e) => {
    e.stopPropagation()
})

