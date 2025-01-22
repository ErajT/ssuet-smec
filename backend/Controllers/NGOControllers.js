const Qexecution = require("./query");

exports.addDeserving = async (req, res) => {
    // Define the SQL query to insert into the deserving table
    const InsertSQL = "INSERT INTO deserving(name, ageGroup, gender, phoneNo) VALUES (?, ?, ?, ?)";
    
    try {
        // Extract the data to insert from the request body
        const { name, ageGroup, gender, phoneNo } = req.body;

        // Execute the query with the extracted data
        const result = await Qexecution.queryExecute(InsertSQL, [name, ageGroup, gender, phoneNo]);

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


