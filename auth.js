document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    // Strong password regex: 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Handle Sign Up
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const errorMsg = document.getElementById('error-message');

            errorMsg.textContent = ''; // clear previous errors

            if (password !== confirmPassword) {
                errorMsg.textContent = "Passwords do not match!";
                return;
            }

            if (!passwordRegex.test(password)) {
                errorMsg.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
                return;
            }

            // Save to local storage
            const user = { name, email, password };
            localStorage.setItem(email, JSON.stringify(user));
            
            alert('Sign up successful! Please sign in.');
            window.location.href = 'signin.html';
        });
    }

    // Handle Sign In
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('error-message');

            errorMsg.textContent = ''; // clear previous errors

            const storedUserData = localStorage.getItem(email);
            
            if (storedUserData) {
                const user = JSON.parse(storedUserData);
                if (user.password === password) {
                    alert('Sign in successful!');
                    // Optionally set a flag that user is logged in
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = 'index.html';
                } else {
                    errorMsg.textContent = "Invalid email or password.";
                }
            } else {
                errorMsg.textContent = "User not found. Please sign up first.";
            }
        });
    }
});
