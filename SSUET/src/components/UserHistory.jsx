import React, { useEffect, useState } from "react";
import {
    Container,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserHistory = () => {
    const navigate = useNavigate();
    const [clothesData, setClothesData] = useState([]);
    const userDetails = Cookies.get("userDetails")
        ? JSON.parse(Cookies.get("userDetails"))
        : null;
        console.log(userDetails)
    const userID = userDetails[0]?.userID; // Extract userID from the cookie

    // Function to fetch the data from the API
    const fetchData = async () => {
        try {
            // Fetch the API endpoint for user donations
            const response = await fetch(`http://localhost:2000/Users/getDonations/${userID}`);

            // Parse the response
            const data = await response.json();

            if (data.status === "success") {
                const combinedData = [
                    ...data.data.pending.map((item) => ({
                        ...item,
                        status: "Pending",
                        action: "Donate",
                    })),
                    ...data.data.donation.map((item) => ({
                        ...item,
                        status: "Not donated yet",
                        action: "Donate",
                    })),
                    ...data.data.donated.map((item) => ({
                        ...item,
                        status: "Donated",
                        action: "View Details",
                    })),
                ];

                // Update the state with the combined data
                setClothesData(combinedData);
            } else {
                console.error("Error fetching data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        // Auto scroll to the top when the component mounts
        window.scrollTo(0, 0);

        // Fetch donation data
        if (userID) {
            fetchData();
        } else {
            console.error("No userID found in cookies.");
        }
    }, [userID]);

    const handleSubmit = () => {
        navigate("/donate-more"); // Navigate to the /donate-more route
    };

    return (
        <Container
            sx={{
                marginTop: 4,
                padding: 2,
                borderRadius: 2,
                overflowY: "auto", // Enable vertical scrolling
                height: "auto", // Adjust height for scrollable area
            }}
        >
            {/* Donation Record Table */}
            <Box sx={{ marginBottom: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        marginBottom: 2,
                        color: "#2b6777", // Primary theme color
                    }}
                >
                    Your Donations
                </Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
                    <Table sx={{ minWidth: 750 }} aria-label="donation record table">
                        <TableHead sx={{ backgroundColor: "#2b6777" }}>
                            <TableRow>
                                {[
                                    "Donated To",
                                    "Gender",
                                    "Age Group",
                                    "Material",
                                    "Cloth Name",
                                    "Condition",
                                    "Status",
                                ].map((header) => (
                                    <TableCell key={header} sx={{ color: "#ffffff" }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clothesData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.donatedTo || "N/A"}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.ageGroup}</TableCell>
                                    <TableCell>{row.material}</TableCell>
                                    <TableCell>{row.clothName}</TableCell>
                                    <TableCell>{row.conditions}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Button to navigate to another page */}
            <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ marginTop: "20px", backgroundColor: "#2b6777" }}
            >
                Donate More
            </Button>
        </Container>
    );
};

export default UserHistory;
