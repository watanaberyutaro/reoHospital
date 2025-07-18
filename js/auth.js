// Simple authentication system
const AUTH_KEY = 'reoHospital_auth';
const USERS = {
    'admin': 'password123',
    'user1': 'test123'
};

// Check if user is logged in
function isLoggedIn() {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth !== null;
}

// Get current user
function getCurrentUser() {
    const auth = localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth).username : null;
}

// Login function
function login(username, password) {
    if (USERS[username] && USERS[username] === password) {
        const authData = {
            username: username,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
        return true;
    }
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'login.html';
}

// Handle login form submission
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        if (login(username, password)) {
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'ユーザー名またはパスワードが正しくありません。';
            errorMessage.style.display = 'block';
        }
    });
}

// Redirect to login if accessing protected pages
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Add logout button to pages
function addLogoutButton() {
    if (isLoggedIn()) {
        const header = document.querySelector('header .container');
        if (header && !document.getElementById('logoutButton')) {
            const logoutDiv = document.createElement('div');
            logoutDiv.style.cssText = 'position: absolute; right: 20px; top: 50%; transform: translateY(-50%);';
            logoutDiv.innerHTML = `
                <span style="margin-right: 10px;">ようこそ、${getCurrentUser()}さん</span>
                <button id="logoutButton" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">ログアウト</button>
            `;
            header.style.position = 'relative';
            header.appendChild(logoutDiv);
            
            document.getElementById('logoutButton').addEventListener('click', logout);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    addLogoutButton();
});