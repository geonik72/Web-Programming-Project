const nav = document.querySelector('.navbar')
fetch('../views/navbar.hbs')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
})