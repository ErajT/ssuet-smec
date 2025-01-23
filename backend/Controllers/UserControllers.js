const Qexecution = require("./query");

exports.addUser = async (req, res) => {
    const SQL = "INSERT INTO user(name, gender, age, location, email, phoneNo) VALUES ?";

    try{
        const {name, gender, age, location, email, phoneNo} = req.body;

        const result = await Qexecution.queryExecute(SQL, [name, gender, age, location, email, phoneNo]);
        
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

exports.getAllNGOs = async (req, res) => {
    const GetSQL = "SELECT * FROM ngo";

    try {
        const result = await Qexecution.queryExecute(GetSQL, []);

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


exports.getAllBrands = async (req, res) => {
    const GetSQL = "SELECT * FROM brand";

    try {
        const result = await Qexecution.queryExecute(GetSQL, []);

        res.status(200).send({
            status: "success",
            message: "Brands fetched successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error fetching brands:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching brands.",
            error: err.message,
        });
    }
};


exports.addPending = async (req, res) => {
    const InsertSQL = "INSERT INTO pending(clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, picture, status, mode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    try {
        const { clothName, brandID, ageGroup, gender, condition, material, ngoID, userID, picture, status, mode } = req.body;
        console.log(clothName, brandID, ageGroup, gender, condition, material, ngoID, userID, picture, status, mode);
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, brandID, ageGroup, gender, condition, material, ngoID, userID, picture, status, mode]);

        res.status(200).send({
            status: "success",
            message: "Pending record added successfully.",
            data: result,
        });
    } catch (err) {
        console.error("Error adding pending record:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error adding pending record.",
            error: err.message,
        });
    }
};


exports.getDonationsByUser = async (req, res) => {
    const GetSQL = "SELECT * FROM pending WHERE userID = ?";
    const GetSQL1 = "SELECT * FROM donation WHERE userID = ?";
    const GetSQL2 = `
        SELECT d.*, ds.name AS donatedTo
        FROM donated d
        JOIN deserving ds ON d.deservingID = ds.deservingID
        WHERE d.userID = ?;
        `;


    try {
        // Extract userID from request parameters
        const { userID } = req.params;

        // Execute the queries with the userID
        const resultPending = await Qexecution.queryExecute(GetSQL, [userID]);
        const resultDonation = await Qexecution.queryExecute(GetSQL1, [userID]);
        const resultDonated = await Qexecution.queryExecute(GetSQL2, [userID]);

        // Respond with all results embedded in the "data" field
        res.status(200).send({
            status: "success",
            message: "Donations for the user fetched successfully.",
            data: {
                pending: resultPending,
                donation: resultDonation,
                donated: resultDonated
            },
        });
    } catch (err) {
        console.error("Error fetching donations for the user:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching donations for the user.",
            error: err.message,
        });
    }
};


exports.getDetails = async (req, res) => {
    const GetSQL = "SELECT * FROM user WHERE email = ?";

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
};

