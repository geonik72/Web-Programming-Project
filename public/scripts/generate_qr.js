let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let bookname = document.getElementById("book-name");
let booksurname = document.getElementById("book-surname");
let bookemail = document.getElementById("book-email");
let bookphone = document.getElementById("book-phone");
let bookid = document.getElementById("book-id");



function generateQR(){
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + "Name: " + bookname.value 
    + "Surname: " + booksurname.value + "Email: " + bookemail.value + "Phone number: " + bookphone.value + "ID: " + bookid.value
}