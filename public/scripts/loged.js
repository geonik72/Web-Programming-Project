document.addEventListener('DOMContentLoaded', () => {
    fetch('/navbar')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;

            fetch('/api/login-status')
                .then(response => response.json())
                .then(data => {
                    const userLoggedIn = data.loggedIn;

            if (userLoggedIn) {
                document.querySelector('.navbar_links[href="/login"]').style.display = 'none';
                document.querySelector('.navbar_btn a[href="/signup"]').style.display = 'none';
            } else {
                document.querySelector('.navbar_links[href="/myprofile"]').style.display = 'none';
                document.querySelector('.navbar_btn a[href="/logout"]').style.display = 'none';
            }
        })
        .catch(error => console.error("Error checking login status: ", error));
        })
        .catch(error => console.error('Error loading navbar:', error));
});

//module.exports = userLoggedIn