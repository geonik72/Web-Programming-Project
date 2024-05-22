let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let bookname = document.getElementById("book-name");
let booksurname = document.getElementById("book-surname");
let bookemail = document.getElementById("book-email");
let bookphone = document.getElementById("book-phone");
let bookid = document.getElementById("book-id");



function generateQR(){
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + "TICKET ID:" + getRandomInt(1000, 9999999) +   "Name: " + bookname.value 
    + "Surname: " + booksurname.value + "Email: " + bookemail.value + "Phone number: " + bookphone.value + "ID: " + bookid.value
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }