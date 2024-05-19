document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const menu = document.querySelector('#mobile-menu');
        const menuLinks = document.querySelector('.navbar_menu');

        if (menu && menuLinks) {
            menu.addEventListener('click', function(){
                menu.classList.toggle('is-active');
                menuLinks.classList.toggle('active');
            });
        } 
    }, 100);
});