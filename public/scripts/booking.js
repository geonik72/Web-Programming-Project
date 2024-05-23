document.addEventListener('DOMContentLoaded', function () {
    const bookTripButton = document.getElementById('BookTrip');

    bookTripButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form from submitting
        
        // Get input values
        const name = document.getElementById('book-name').value;
        const surname = document.getElementById('book-surname').value;
        const email = document.getElementById('book-email').value;
        const phone = document.getElementById('book-phone').value;
        const idNum = document.getElementById('book-idNum').value;


        document.getElementById('tick-name').textContent = name;
        document.getElementById('tick-surname').textContent = surname;
        document.getElementById('tick-email').textContent = email;
        document.getElementById('tick-phone').textContent = phone;
        document.getElementById('tick-idNum').textContent = idNum;
  
    });
});