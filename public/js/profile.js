// JavaScript for the Client Profile page

// Function to handle profile form submission
function handleProfileSubmission(event) {
    event.preventDefault();

    // Get form input values
    const fullname = document.getElementById("full-name").value;
    const address1 = document.getElementById("address-1").value;
    const address2 = document.getElementById("address-2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zipcode = document.getElementById("zipcode").value;

    // Validate and process the data as needed
    // For now, let's just display an alert with the collected data
    const profileData = {
        fullname,
        address1,
        address2,
        city,
        state,
        zipcode,
    };
    // Send a POST request to the server
    fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify(profileData),
        headers: {
            "Content-Type": "application/json",
        credentials: 'include'
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status === "success") {
            alert("Profile saved successfully!");
            window.location.href = "/quote";
        } else {
            alert("Profile save failed: " + data.error);
        }
        
    })
    .catch((error) => {
        console.error("Error during profile submission:", error);
    });
}

    


// Attach an event listener to the profile form
document.getElementById("profile").addEventListener("submit", handleProfileSubmission);