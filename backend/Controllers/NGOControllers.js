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
    const InsertSQL = "INSERT INTO deserving(name, ageGroup, gender, phoneNo) VALUES ?";
    
    try {
        // Extract the data to insert from the request body
        const deservingRecords = req.body.deservingRecords; // Expecting an array of objects with keys: name, ageGroup, gender, phoneNo
        
        // Map the records into an array of arrays for bulk insertion
        const values = deservingRecords.map(record => [
            record.name,
            record.ageGroup,
            record.gender,
            record.phoneNo
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
    const GetSQL = "SELECT * FROM deserving";
    
    try {
        const result = await Qexecution.queryExecute(GetSQL, []);
        
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
    const GetSQL = "SELECT * FROM donation";
    
    try {
        const result = await Qexecution.queryExecute(GetSQL, []);
        
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
        SELECT donated.*, donation.*
        FROM donated
        JOIN donation ON donated.donationID = donation.donationID
    `;
    
    try {
        const result = await Qexecution.queryExecute(GetSQL, []);
        
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
    const GetSQL = "SELECT * FROM discarded";
    
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

exports.addDonation = async (req, res) => {
    const InsertSQL = "INSERT INTO donation(clothName, brandID, ageGroup, gender, condition, material, ngoID, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    try {
        const { clothName, brandID, ageGroup, gender, condition, material, ngoID, picture } = req.body;
        
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, brandID, ageGroup, gender, condition, material, ngoID, picture]);
        
        res.status(200).send({
            status: "success",
            message: "Donation added successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error adding donation:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error adding donation.",
            error: err.message,
        });
    }
};

exports.addDiscarded = async (req, res) => {
    const InsertSQL = "INSERT INTO discarded(clothName, brand, material, suggestions) VALUES (?, ?, ?, ?)";
    
    try {
        const { clothName, brand, material, suggestions } = req.body;
        
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, brand, material, suggestions]);
        
        res.status(200).send({
            status: "success",
            message: "Discarded record added successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error adding discarded record:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error adding discarded record.",
            error: err.message,
        });
    }
};

exports.addDonated = async (req, res) => {
    const InsertSQL = "INSERT INTO donated(donationID, deservingID) VALUES (?, ?)";
    
    try {
        const { donationID, deservingID } = req.body;
        
        const result = await Qexecution.queryExecute(InsertSQL, [donationID, deservingID]);
        
        res.status(200).send({
            status: "success",
            message: "Donated record added successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error adding donated record:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error adding donated record.",
            error: err.message,
        });
    }
};



