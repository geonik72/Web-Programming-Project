document.addEventListener('DOMContentLoaded', function () {
    const resultsBoxes1 = document.querySelectorAll('.results-box');
    const checkoutButton1 = document.getElementById('checkoutButton');
    //const returnButton = document.getElementById('returnButton')

    // Initially disable the checkout button
    checkoutButton1.classList.remove('enabled');
    //returnButton.classList.remove('enabled');



    resultsBoxes1.forEach(resultsBox => {

        

        resultsBox.addEventListener('click', function () {
            // Toggle the selected class on the results box
            this.classList.toggle('selected');
            
            
            const selectedBoxes1 = document.querySelectorAll('.results-box.selected').length;

            // Enable the checkout button if the box is selected, otherwise disable it
            if (selectedBoxes1 === 1 ) {
                checkoutButton1.classList.add('enabled');
                //returnButton.classList.add('enabled');
            } else {
                checkoutButton1.classList.remove('enabled');
                //returnButton.classList.remove('enabled');
            }

    })

   
    });
});