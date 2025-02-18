const Qexecution = require("./query");
require('dotenv').config(); // Ensure dotenv is loaded for environment variables
const Cerebras = require('@cerebras/cerebras_cloud_sdk');

exports.addNGO = async (req, res) => {
    const SQL = "INSERT INTO ngo(ngoname, location, email) VALUES ?";

    try{
        const {name, location, email} = req.body;

        const result = await Qexecution.queryExecute(SQL, [name,location, email]);
        
        res.status(200).send({
            status: "success",
            message: "NGOs fetched successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching NGOs:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching NGOs.",
            error: err.message,
        });
    }
};

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
        const { ngoID } = req.params;
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
        const { ngoID, brandID } = req.params;
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

exports.getPending = async (req, res) => {
    const GetSQL = `
        SELECT pending.*, user.name AS userName
        FROM pending
        JOIN user ON pending.userID = user.userID 
        WHERE ngoID=? AND brandID=?
    `;

    try {
        const { ngoID, brandID } = req.params;
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
        SELECT donated.*, user.name AS donatedBy, deserving.name AS donatedTo
        FROM donated
        JOIN user ON donated.userID = user.userID
        JOIN deserving ON donated.deservingID = deserving.deservingID
        WHERE donated.ngoID=? AND donated.brandID=?
    `;

    try {
        const { ngoID, brandID } = req.params;
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
        SELECT discarded.*, user.name AS userName
        FROM discarded
        JOIN user ON discarded.userID = user.userID
        WHERE discarded.ngoID=? AND discarded.brandID=?
    `;

    try {
        const {ngoID, brandID} = req.params;
        const result = await Qexecution.queryExecute(GetSQL, [ngoID, brandID]);
        
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

// Function to summarize comments
const aiSuggestions = async (clothName, material) => {
    try {
        console.log("hello i am here")

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
            //   "Authorization": `${API_KEY}`,
              "Authorization": `Bearer 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`,            
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "meta-llama/llama-3.1-8b-instruct:free",
              "messages": [
                {"role": "system", "content": `Based on the discarded clothing item ${clothName} made of ${material}, provide a professional and concise suggestion on how it can be recycled or repurposed into other products while ensuring eco-friendliness and minimal environmental impact. Focus very concisely on actionable recycling or repurposing methods tailored to the material and avoid unnecessary details. Strictly return only one best suggestion. remove any * and numbering`},
              ],
            })
          });
          
          const Res = await response.json();
        //   console.log(Res.choices?.[0]?.message?.content);

        // Extract the summary content
        const suggestions = Res.choices?.[0]?.message?.content;

        if (!suggestions) {
            throw new Error('Failed to generate suggestions');
        }

        return suggestions;
    } catch (error) {
        console.error('Error generating suggestions', error.message);
        throw new Error('Error generating suggestions');
    }
};


exports.addDiscarded = async (req, res) => {
    const SelectSQL = "SELECT clothName, material, userID, ngoID, brandID FROM donation WHERE donationID = ?";
    const InsertSQL = "INSERT INTO discarded(clothName, material, suggestions, userID, ngoID, brandID) VALUES (?,?,?,?,?,?)";
    const DeleteSQL = "DELETE FROM donation WHERE donationID = ?";

    try {
        const { donationID } = req.body;

        // Fetch the donation details
        const donationDetails = await Qexecution.queryExecute(SelectSQL, [donationID]);
        console.log(donationDetails[0].clothName, donationDetails[0].material);

        const suggestions = await aiSuggestions(donationDetails[0].clothName, donationDetails[0].material);
        console.log(suggestions);

        if (donationDetails.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Donation not found.",
            });
        }

        // Insert into discarded table
        const { clothName, material, userID, ngoID, brandID } = donationDetails[0];
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, material, suggestions, userID, ngoID, brandID]);

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
        console.log(donationID, deservingID)

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

