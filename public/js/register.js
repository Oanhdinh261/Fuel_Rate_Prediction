// Get references to HTML elements
const format = document.getElementById("registrationForm");
const username = document.getElementById("register-username");
const password = document.getElementById("register-password");
const registerMessage = document.getElementById("register-message");

// Add an event listener for the form submission
format.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a registration object with the username and password
    const register = {
        username: username.value,
        password: password.value,
    };

    // Send a POST request to the server for registration
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "success") {
                // Registration was successful, display a success message
                registerMessage.textContent = "Registration successful!";
                registerMessage.style.color = "green";
            } else {
                // Registration failed, display an error message
                registerMessage.textContent = data.error || "Registration failed.";
                registerMessage.style.color = "red";
            }
        })
        .catch((error) => {
            console.error("Error during registration:", error);
        });
});

