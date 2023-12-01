document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('fuelQuoteForm');
    const getQuoteButton = document.getElementById('getQuote');
    const submitButton = document.getElementById('submitQuote');


    // Fetch and populate delivery address
    fetch('/api/get-address', {
        method: 'GET',
        credentials: 'include' // Important for sending the session cookie
    })
    .then(response => response.json())
    .then(data => {
        if (data.address) {
            document.getElementById('deliveryAddress').value = data.address;
        }
    })
    .catch(error => {
        console.error('Error fetching address:', error);
    });

    // Function to handle the 'Get Quote' button click
    function handleGetQuote() {
        const gallonsRequested = document.getElementById('gallonsRequested').value;
        const deliveryDate = document.getElementById('deliveryDate').value;
        // Include additional data as required

        // Perform validation if necessary
        if (!gallonsRequested || !deliveryDate) {
            alert('Please fill in all required fields.');
            return;
        }

        // Prepare the data to be sent to the server
        const requestData = {
            gallonsRequested,
            deliveryDate
            // Include additional data as required
        };

        // AJAX call to the server to calculate the quote
        fetch('/api/calculate-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('suggestedPrice').value = data.suggestedPrice;
            document.getElementById('totalAmount').value = data.totalAmount;
            submitButton.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to get the quote. Please try again.');
        });
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        const formData = {
            gallonsRequested: document.getElementById('gallonsRequested').value,
            deliveryAddress: document.getElementById('deliveryAddress').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            suggestedPrice: document.getElementById('suggestedPrice').value,
            totalAmount: document.getElementById('totalAmount').value
        };

        fetch('/api/submit-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            alert('Quote submitted successfully.');
            // You can redirect or update the UI as needed
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit the quote. Please try again.');
        });
    }

    getQuoteButton.addEventListener('click', handleGetQuote);
    form.addEventListener('submit', handleSubmit);
});
