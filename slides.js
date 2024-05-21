
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}




//script to disable/enable date-to input depending on the trip type
document.addEventListener('DOMContentLoaded', function () {
  
  const oneWayRadio = document.getElementById('one-way');
  const roundTripRadio = document.getElementById('round-trip');

  const dateToInput = document.getElementById('dateto').querySelector('input');

 
  function handleTripChoiceChange() {
      if (oneWayRadio.checked) {
          dateToInput.disabled = true;
      } else if (roundTripRadio.checked) {
          dateToInput.disabled = false;
      }
  }

  oneWayRadio.addEventListener('change', handleTripChoiceChange);
  roundTripRadio.addEventListener('change', handleTripChoiceChange);

  handleTripChoiceChange();
});


document.getElementById('date-from').addEventListener('change', function(){
  var dateFrom = this.value;
  document.getElementById('date-to').min = dateFrom;
});