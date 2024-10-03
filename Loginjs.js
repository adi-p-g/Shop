// Common function to validate username and password
function validateCredentials(username, password) {
    if (!username || !password) {
        window.alert("Username and password are required.");
        return false;
    }
    return true;
}

// Handle Admin Login
function adminLogin() {
    var username = document.forms["form1"]["username"].value;
    var password = document.forms["form1"]["password"].value;

    if (!validateCredentials(username, password)) return;

    if (username === "admin" && password === "admin") {
        window.location.href = "admin.html";  // Redirect to admin page
    } else {
        window.alert("Invalid Admin credentials.");
    }
}

// Handle User Login
function userLogin() {
    var username = document.forms["form1"]["username"].value;
    var password = document.forms["form1"]["password"].value;

    if (!validateCredentials(username, password)) return;

    if (username !== "admin") {
        window.location.href = "shop.html";  // Redirect to user page
    } else {
        window.alert("Admin should use the Admin Login button.");
    }
}
