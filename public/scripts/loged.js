document.addEventListener('DOMContentLoaded', () => {
    fetch('/navbar')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;

            fetch('/api/login-status')
                .then(response => response.json())
                .then(data => {
                    const userLoggedIn = data.loggedIn;

            const loginButton = document.querySelector('.navbar_btn a[href="/login"]');
            const signupButton = document.querySelector('.navbar_btn a[href="/signup"]');
            const myProfileButton = document.querySelector('.navbar_btn a[href="/myprofile"]');
            const logoutButton = document.querySelector('.navbar_btn a[href="/logout"]');

            if (userLoggedIn) {
                 
                 if (loginButton) loginButton.style.display = 'none';
                 if (signupButton) signupButton.style.display = 'none';


                 if (myProfileButton){
                    myProfileButton.style.display = 'inline-block';
                    //myProfileButton.style.justifyContent = 'center';
                 } 
                 if (logoutButton) logoutButton.style.display = 'inline-block';
            } else {
                if (loginButton) {
                    loginButton.style.display = 'inline-block';
                    //loginButton.style.justifyContent = 'center';
                }
                if (signupButton) signupButton.style.display = 'inline-block';
                

                if (myProfileButton) myProfileButton.style.display = 'none';
                if (logoutButton) logoutButton.style.display = 'none';
            }
        })
        .catch(error => console.error("Error checking login status: ", error));
        
        })
        .catch(error => console.error('Error loading navbar:', error));
});

//module.exports = userLoggedIn