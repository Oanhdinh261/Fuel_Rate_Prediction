const db = require('../routes/db-config'); // Adjust the path as per your project structure

function calculateQuote(req, res) {
    const { gallonsRequested, deliveryDate } = req.body;
     // Assuming user ID is available in req.user
    
     
     

    // Debugging: Log the req.user and req.user.id
    console.log("Debugging - req.user:", req.user);
    console.log("Debugging - User ID:", req.user ? req.user.id : 'User ID not found');

    
    // Constants
    const currentPricePerGallon = 1.50;
    const companyProfitFactor = 0.10;

    // Function to calculate the quote
    const calculateAndSendQuote = (clientState, hasHistory) => {
        const locationFactor = clientState === 'TX' ? 0.02 : 0.04;
        const rateHistoryFactor = hasHistory ? 0.01 : 0;
        const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;

        const margin = currentPricePerGallon * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor);
        const suggestedPrice = currentPricePerGallon + margin;
        const totalAmount = gallonsRequested * suggestedPrice;

        res.json({
            suggestedPrice: suggestedPrice.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        });
    };
    // Ensure req.user and req.user.id are available
    

    // Retrieve client state and history from the database
    db.query('SELECT state FROM user_profiles WHERE user_id = ?', [req.user.id], (err, userResult) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving user data.');
        }
        // Check if user result is empty (user not found)
        if (!userResult.length) {
            return res.status(404).send('User not found.');
        }

        
        const clientState = userResult[0].state; // Adjust according to your schema
        console.log("Debugging - Client State:", clientState);

        db.query('SELECT COUNT(*) as quoteCount FROM quotes WHERE user_id = ?', [req.user.id], (err, quoteResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error retrieving quote history.');
            }
            
            const hasHistory = quoteResult[0].quoteCount > 0;
            console.log("Debugging - Has History:", hasHistory);
            calculateAndSendQuote(clientState, hasHistory);
        });
    });
}

module.exports = calculateQuote;
