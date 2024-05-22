document.addEventListener('DOMContentLoaded', function () {
    const departureDateInput = document.getElementById('departure-date');
    const returnDateInput = document.getElementById('return-date');

    setMinDates();
    

    function setMinDates() {
        const today = new Date().toISOString().split('T')[0];

        departureDateInput.setAttribute('min', today);
        returnDateInput.setAttribute('min', today);
        
    }

    departureDateInput.addEventListener('change', function () {
        validateDate(departureDateInput);
        const departureDate = departureDateInput.value;
        returnDateInput.setAttribute('min', departureDate);
        validateDate(returnDateInput);
    });

    returnDateInput.addEventListener('change', function () {
        validateDate(returnDateInput);
    });

    function validateDate(input) {
        const selectedDate = new Date(input.value);
        const today = new Date();
        if (selectedDate < today) {
            alert("Please select a date that is today or after today.");
            input.value = '';
        }
    }
});
