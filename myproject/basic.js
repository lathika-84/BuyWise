const API_BASE = 'http://localhost:8080/api/auth';

// Show Login Form
function showlogin() {
    document.getElementById("login_container").style.display = "block";
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

// Show Signup Form
function showsignup() {
    document.getElementById("login_container").style.display = "block";
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Handle Signup
async function handleSignup() {
    const userData = {
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value,
        mobile: document.getElementById('signupMobile').value,
        role: document.getElementById('signupRole').value
    };

    // Validation
    if (!userData.name || !userData.email || !userData.password || !userData.mobile) {
        alert('Please fill all required fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful! Please login.');
            showlogin();
            // Clear form
            document.getElementById('signupForm').reset();
        } else {
            alert('Signup failed: ' + (data.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please check your connection.');
    }
}

// Handle Login
async function handleLogin() {
    const credentials = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    // Validation
    if (!credentials.email || !credentials.password) {
        alert('Please enter email and password');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful! Welcome ' + data.name);
            
            // Store user info in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(data));
            
            // Redirect based on role
            if (data.role === 'CUSTOMER') {
                window.location.href = 'customerhome.html';
            } else if (data.role === 'RETAILER') {
                window.location.href = 'retailer_products.html';
            } else if (data.role === 'EMPLOYEE') {
                window.location.href = 'employee_dashboard.html';
            }
        } else {
            alert('Login failed: ' + (data.error || 'Invalid credentials'));
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please check your connection.');
    }
}