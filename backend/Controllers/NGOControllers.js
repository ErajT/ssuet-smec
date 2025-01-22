const Qexecution = require("./query");

exports.addDeserving = async (req, res) => {
    // Define the SQL query to insert into the deserving table
    const InsertSQL = "INSERT INTO deserving(name, ageGroup, gender, phoneNo, ngoID) VALUES (?, ?, ?, ?, ?)";
    
    try {
        // Extract the data to insert from the request body
        const { name, ageGroup, gender, phoneNo, ngoID } = req.body;

        // Execute the query with the extracted data
        const result = await Qexecution.queryExecute(InsertSQL, [name, ageGroup, gender, phoneNo, ngoID]);

        // Respond with success
        res.status(200).send({
            status: "success",
            message: "Deserving individual added successfully.",
            data: result,
        });
    } catch (err) {
        // Handle any errors
        console.error("Error adding deserving individual:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error adding deserving individual.",
            error: err.message,
        });
    }
};

exports.addDeservingBulk = async (req, res) => {
    // Define the base SQL query for bulk insertion
    const InsertSQL = "INSERT INTO deserving(name, ageGroup, gender, phoneNo, ngoID) VALUES ?";
    
    try {
        // Extract the data to insert from the request body
        const deservingRecords = req.body.deservingRecords; // Expecting an array of objects with keys: name, ageGroup, gender, phoneNo
        
        // Map the records into an array of arrays for bulk insertion
        const values = deservingRecords.map(record => [
            record.name,
            record.ageGroup,
            record.gender,
            record.phoneNo,
            record.ngoID
        ]);

        // Execute the query with the array of values
        const result = await Qexecution.queryExecute(InsertSQL, [values]);

        // Respond with success
        res.status(200).send({
            status: "success",
            message: `${values.length} deserving individuals added successfully.`,
            data: result,
        });
    } catch (err) {
        // Handle any errors
        console.error("Error adding deserving individuals in bulk:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error adding deserving individuals in bulk.",
            error: err.message,
        });
    }
};

exports.getDeserving = async (req, res) => {
    const GetSQL = "SELECT * FROM deserving WHERE ngoID=?";
    
    try {
        const {ngoID} = req.params;
        const result = await Qexecution.queryExecute(GetSQL, [ngoID]);
        
        res.status(200).send({
            status: "success",
            message: "Deserving individuals fetched successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching deserving individuals:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching deserving individuals.",
            error: err.message,
        });
    }
};

exports.getDonations = async (req, res) => {
    const GetSQL = `
        SELECT donation.*, user.name AS userName
        FROM donation
        JOIN user ON donation.userID = user.userID 
        WHERE ngoID=? AND brandID=?
    `;
    
    try {
        const {ngoID, brandID} = req.params;
        const result = await Qexecution.queryExecute(GetSQL, [ngoID, brandID]);
        
        res.status(200).send({
            status: "success",
            message: "Donations fetched successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching donations:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching donations.",
            error: err.message,
        });
    }
};

exports.getDonated = async (req, res) => {
    const GetSQL = `
        SELECT donated.*, users.name AS donatedBy, deserving.name AS donatedTo
        FROM donated
        JOIN users ON donated.userID = users.userID
        JOIN deserving ON donated.deservingID = deserving.deservingID
        WHERE ngoID=? AND brandID=?
    `;
    
    try {
        const {ngoID, brandID} = req.params;
        const result = await Qexecution.queryExecute(GetSQL, [ngoID, brandID]);
        
        res.status(200).send({
            status: "success",
            message: "Donated records fetched successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching donated records:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching donated records.",
            error: err.message,
        });
    }
};

exports.getDiscarded = async (req, res) => {
    const GetSQL = `
        SELECT discarded.*, users.name AS userName
        FROM discarded
        JOIN users ON discarded.userID = users.userID
    `;
    
    try {
        const result = await Qexecution.queryExecute(GetSQL, []);
        
        res.status(200).send({
            status: "success",
            message: "Discarded records fetched successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching discarded records:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching discarded records.",
            error: err.message,
        });
    }
};

exports.addDiscarded = async (req, res) => {
    const SelectSQL = "SELECT clothName, material, userID FROM donation WHERE donationID = ?";
    const InsertSQL = "INSERT INTO discarded(clothName, material, suggestions, userID) VALUES (?, ?, ?, ?)";
    const DeleteSQL = "DELETE FROM donation WHERE donationID = ?";

    try {
        const { donationID, suggestions } = req.body;

        // Fetch the donation details
        const donationDetails = await Qexecution.queryExecute(SelectSQL, [donationID]);
        if (donationDetails.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Donation not found.",
            });
        }

        // Insert into discarded table
        const { clothName, material, userID } = donationDetails[0];
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, material, suggestions, userID]);

        // Delete from donation table
        const result2 = await Qexecution.queryExecute(DeleteSQL, [donationID]);

        res.status(200).send({
            status: "success",
            message: "Discarded record added successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error processing discarded record:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error processing discarded record.",
            error: err.message,
        });
    }
};

exports.addDonated = async (req, res) => {
    const SelectSQL = "SELECT clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID FROM donation WHERE donationID = ?";
    const InsertSQL = "INSERT INTO donated(clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, deservingID, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const DeleteSQL = "DELETE FROM donation WHERE donationID = ?";

    try {
        const { donationID, deservingID } = req.body;

        // Fetch the donation details
        const donationDetails = await Qexecution.queryExecute(SelectSQL, [donationID]);
        if (donationDetails.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Donation not found.",
            });
        }

        // Insert into donated table
        const { clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID } = donationDetails[0];
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, deservingID, "donated"]);

        // Delete from donation table
        const result2 = await Qexecution.queryExecute(DeleteSQL, [donationID]);

        res.status(200).send({
            status: "success",
            message: "Donated record added successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error processing donated record:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error processing donated record.",
            error: err.message,
        });
    }
};

exports.addDonation = async (req, res) => {
    const SelectSQL = "SELECT clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, picture FROM pending WHERE pendingID = ?";
    const InsertSQL = "INSERT INTO donation(clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, picture, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const DeleteSQL = "DELETE FROM pending WHERE pendingID = ?";

    try {
        const { pendingID } = req.body;

        // Fetch the pending details
        const pendingDetails = await Qexecution.queryExecute(SelectSQL, [pendingID]);
        if (pendingDetails.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Pending record not found.",
            });
        }

        // Insert into donation table
        const { clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, picture } = pendingDetails[0];
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, picture, "not donated yet"]);

        // Delete from pending table
        const result2 = await Qexecution.queryExecute(DeleteSQL, [pendingID]);

        res.status(200).send({
            status: "success",
            message: "Donation added successfully and removed from pending.",
            data: result,
        });
    } catch (err) {
        console.error("Error processing donation:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error processing donation.",
            error: err.message,
        });
    }
};

exports.getDetails = async (req, res) => {
        const GetSQL = "SELECT * FROM ngo WHERE email = ?";
    
        try {
            // Extract userID from request parameters
            const { email } = req.params;
    
            // Execute the query with the userID
            const result = await Qexecution.queryExecute(GetSQL, [email]);
    
            // Respond with the fetched data
            res.status(200).send({
                status: "success",
                message: "Details for the user fetched successfully.",
                data: result,
            });
        } catch (err) {
            console.error("Error fetching details for the user:", err.message);
            res.status(500).send({
                status: "fail",
                message: "Error fetching details for the user.",
                error: err.message,
            });
        }
}

exports.genAI = async (req, res) => {
    
}

