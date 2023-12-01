const db = require("../routes/db-config");

const saveProfile = (req, res) => {
  // Assuming you have the user information stored in req.user after authentication
  


  // Extract profile data from the request body
  const profileData = req.body;

  // Prepare an SQL query to update the user's profile data in the database
  const sql = `INSERT INTO user_profiles (fullname, address1, address2, city, state, zipcode, user_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?);`;

  // Execute the SQL query to update the user's profile data
  db.query(
    sql,
    [
      profileData.fullname, // Ensure the key names in profileData match your form field names
      profileData.address1,
      profileData.address2,
      profileData.city,
      profileData.state,
      profileData.zipcode,
      req.user.id, // Use the user's ID from req.user
    ],
    (err, result) => {
      if (err) {
        console.error(err); // Log the error for debugging
        return res.json({
          status: "error",
          error: "Profile update failed. Please try again later.",
        });
      }

      // Profile data update was successful
      return res.json({ status: "success", message: "Profile updated successfully." });
    }
  );
};

module.exports = saveProfile;
