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
                 // Hide login and signup buttons
                 const loginButton = document.querySelector('.navbar_item a[href="/login"]');
                 const signupButton = document.querySelector('.navbar_btn a[href="/signup"]');
                 if (loginButton) loginButton.style.display = 'none';
                 if (signupButton) signupButton.style.display = 'none';

                 // Show my profile and logout buttons
                 const myProfileButton = document.querySelector('.navbar_item a[href="/myprofile"]');
                 const logoutButton = document.querySelector('.navbar_btn a[href="/logout"]');
                 if (myProfileButton) myProfileButton.style.display = 'block';
                 if (logoutButton) logoutButton.style.display = 'block';
            } else {
                // Show login and signup buttons
                const loginButton = document.querySelector('.navbar_item a[href="/login"]');
                const signupButton = document.querySelector('.navbar_btn a[href="/signup"]');
                if (loginButton) loginButton.style.display = 'inline-block';
                if (signupButton) signupButton.style.display = 'inline-block';

                // Hide my profile and logout buttons
                const myProfileButton = document.querySelector('.navbar_item a[href="/myprofile"]');
                const logoutButton = document.querySelector('.navbar_btn a[href="/logout"]');
                if (myProfileButton) myProfileButton.style.display = 'none';
                if (logoutButton) logoutButton.style.display = 'none';
            }
        })
        .catch(error => console.error("Error checking login status: ", error));
        
        })
        .catch(error => console.error('Error loading navbar:', error));
});

//module.exports = userLoggedIn