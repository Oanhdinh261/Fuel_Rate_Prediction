const db = require('../routes/db-config'); // Adjust the path as per your project structure

function submitQuote(req, res) {
    // Extract data from the request body
    const { gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalAmount } = req.body;
     // Assuming user ID is available in req.user

    // First, fetch the delivery address from the user_profiles table
    db.query('SELECT CONCAT_WS(", ", address1, address2, city, state, zipcode) AS deliveryAddress FROM user_profiles WHERE user_id = ?', [req.user.id], (err, addressResults) => {
        if (err) {
            console.error('Error fetching address:', err);
            return res.status(500).send('Error fetching address.');
        }
        if (!addressResults.length) {
            return res.status(404).send('Address not found.');
        }

        // Now we have the address, proceed to insert the quote
        const deliveryAddress = addressResults[0].deliveryAddress;

        // SQL query to insert the quote data into the database
        const sql = `INSERT INTO quotes (user_id, gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalAmount) VALUES (?, ?, ?, ?, ?, ?);`;

        // Execute the SQL query
        db.query(sql, [req.user.id, gallonsRequested, deliveryAddress, deliveryDate, suggestedPrice, totalAmount], (err, result) => {
            if (err) {
                console.error('Error saving quote:', err);
                return res.status(500).send('Error saving quote data.');
            }

            // Successfully saved the quote data
            res.json({ status: 'success', message: 'Quote submitted successfully.' });
        });
    });
}


module.exports = submitQuote;
