document.addEventListener('DOMContentLoaded', function () {
    const resultsBoxes = document.querySelectorAll('.results-box');
    const checkoutButton = document.getElementById('checkoutButton');
    
    // Initially disable the checkout button
    checkoutButton.classList.remove('enabled');


    resultsBoxes.forEach(resultsBox => {

        resultsBox.addEventListener('click', function () {
            // Toggle the selected class on the results box
            this.classList.toggle('selected');
            
            const selectedBoxes = document.querySelectorAll('.results-box.selected').length;

            // Enable the checkout button if the box is selected, otherwise disable it
            if (selectedBoxes === 1 ) {
                checkoutButton.classList.add('enabled');
            
            } else {
                checkoutButton.classList.remove('enabled');
            }
    })

    });
});