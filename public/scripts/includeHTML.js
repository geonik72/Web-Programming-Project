const nav = document.querySelector('.navbar')
fetch('../views/navbar.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
})