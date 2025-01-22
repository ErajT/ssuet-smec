const Qexecution = require("./query");

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


exports.addDonation = async (req, res) => {
    const InsertSQL = "INSERT INTO donation(clothName, brandID, ageGroup, gender, conditions, material, ngoID, userID, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    try {
        const { clothName, brandID, ageGroup, gender, condition, material, ngoID,  userID , picture} = req.body;
        // console.log(clothName, brandID, ageGroup, gender, condition, material, ngoID,  userID);
        
        const result = await Qexecution.queryExecute(InsertSQL, [clothName, brandID, ageGroup, gender, condition, material, ngoID, userID, picture]);
        
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

exports.getDonationsByUser = async (req, res) => {
    const GetSQL = "SELECT * FROM donation WHERE userID = ?";

    try {
        // Extract userID from request parameters
        const { userID } = req.params;

        // Execute the query with the userID
        const result = await Qexecution.queryExecute(GetSQL, [userID]);

        // Respond with the fetched data
        res.status(200).send({
            status: "success",
            message: "Donations for the user fetched successfully.",
            data: result,
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

