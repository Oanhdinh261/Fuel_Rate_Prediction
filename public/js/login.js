// Get references to HTML elements
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("login-username");
const password = document.getElementById("login-password");
const loginMessage = document.getElementById("login-message");

// Add an event listener for the form submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a login object with the username and password
    const login = {
        username: username.value,
        password: password.value,
    };

    // Send a POST request to the server for login
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "success") {
                // Login was successful, display a success message
                loginMessage.textContent = "Login successful!";
                loginMessage.style.color = "green";
                // You can redirect to another page on success if needed
                // window.location.href = "/dashboard";
            } else {
                // Login failed, display an error message
                loginMessage.textContent = data.error || "Login failed.";
                loginMessage.style.color = "red";
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
        });
});
