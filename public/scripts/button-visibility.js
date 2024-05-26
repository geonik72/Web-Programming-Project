document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tripType = urlParams.get('trip-choice');
    const returnButton = document.getElementById('returnButton');
    const checkoutButton = document.getElementById('checkoutButton');
    
    if (tripType === 'one-way') {
        returnButton.style.display = 'none';
        checkoutButton.style.display = 'block';
    } 
    else if (tripType === 'round-trip') {
        returnButton.style.display = 'block';
        checkoutButton.style.display = 'none';
    }
});