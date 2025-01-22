import React from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Typography,
} from "@mui/material";

const UserHistory = () => {
    const clothesData = [
        {
            id: 1,
            donateTo: "Charity A",
            gender: "Male",
            ageGroup: "Adult",
            material: "Cotton",
            clothName: "Shirt",
            condition: "New",
            action: "Donate",
            image: "Images/shirt.jpg",
        },
        {
            id: 2,
            donateTo: "Charity B",
            gender: "Female",
            ageGroup: "Child",
            material: "Wool",
            clothName: "Sweater",
            condition: "Used",
            action: "Donate",
            image: "Images/sweater.jpg",
        },
    ];

    return (
        <Container
            sx={{
                marginTop: 4,
                // backgroundColor: "#f2f2f2", // Light grey background
                padding: 2,
                borderRadius: 2,
                maxHeight: "100vh",
                // overflowY: "auto", // Allows vertical scrolling
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
                                    "Image",
                                ].map((header) => (
                                    <TableCell key={header} sx={{ color: "#ffffff" }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clothesData
                                .filter((row) => row.action === "Donate" && row.donateTo)
                                .map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.donateTo}</TableCell>
                                        <TableCell>{row.gender}</TableCell>
                                        <TableCell>{row.ageGroup}</TableCell>
                                        <TableCell>{row.material}</TableCell>
                                        <TableCell>{row.clothName}</TableCell>
                                        <TableCell>{row.condition}</TableCell>
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
        </Container>
    );
};

export default UserHistory;