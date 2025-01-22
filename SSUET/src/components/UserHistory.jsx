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

const UserHistory = () => {
    const navigate = useNavigate();
    const [clothesData, setClothesData] = useState([]);

    const ngoID = 1; // Constant for NGO ID
    const brandID = 2; // Constant for Brand ID

    // Function to fetch the data from all APIs
    const fetchData = async () => {
        try {
            // Fetch the three API endpoints using constants for ngoID and brandID
            const pendingResponse = await fetch(`http://localhost:2000/NGO/getPending/${ngoID}/${brandID}`);
            const donationResponse = await fetch(`http://localhost:2000/NGO/getDonation/${ngoID}/${brandID}`);
            const donatedResponse = await fetch(`http://localhost:2000/NGO/getDonated/${ngoID}/${brandID}`);

            // Parse the responses
            const pendingData = await pendingResponse.json();
            const donationData = await donationResponse.json();
            const donatedData = await donatedResponse.json();

            // Combine the data from all three responses
            const combinedData = [
                ...pendingData.data.map(item => ({
                    ...item,
                    status: "Pending",
                    action: "Donate",
                    // image: `data:image/jpeg;base64,${Buffer.from(item.picture.data).toString('base64')}`,
                })),
                ...donationData.data.map(item => ({
                    ...item,
                    status: "Not donated yet",
                    action: "Donate",
                    // image: `data:image/jpeg;base64,${Buffer.from(item.picture.data).toString('base64')}`,
                })),
                ...donatedData.data.map(item => ({
                    ...item,
                    status: "Donated",
                    action: "Donate",
                    // image: `data:image/jpeg;base64,${Buffer.from(item.picture.data).toString('base64')}`,
                })),
            ];

            // Update the state with the combined data
            setClothesData(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = () => {
        navigate("/donate-more"); // This will navigate to the /donate-more route
    };

    return (
        <Container
            sx={{
                marginTop: 4,
                padding: 2,
                borderRadius: 2,
                maxHeight: "100vh",
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
                    <Table sx={{ minWidth: 650 }} aria-label="donation record table">
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
                                    "Image",
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
                                    <TableCell>{row.donatedTo || row.userName}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{row.ageGroup}</TableCell>
                                    <TableCell>{row.material}</TableCell>
                                    <TableCell>{row.clothName}</TableCell>
                                    <TableCell>{row.conditions}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>
                                        <img
                                            src={row.image}
                                            alt={row.clothName}
                                            style={{ width: 50, height: 50, borderRadius: 4 }}
                                        />
                                    </TableCell>
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
