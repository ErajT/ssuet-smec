import React, { useState } from "react";
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
  Modal,
} from "@mui/material";

const ClothesDonationPage = () => {
  const [clothesData, setClothesData] = useState([
    {
      id: 1,
      name: "John Doe",
      clothName: "T-shirt",
      ageGroup: "2-4",
      gender: "Male",
      condition: "Good",
      material: "Cotton",
      picture: "https://tse1.mm.bing.net/th?id=OIP.Q-cqboy-4BnKnH3o_YwW6gHaFj&pid=Api&P=0&h=220", // Example image
      action: "",
      suggestion: "",
      donateTo: "",
    },
    {
      id: 2,
      name: "Jane Doe",
      clothName: "Jacket",
      ageGroup: "Adult",
      gender: "Female",
      condition: "Worn",
      material: "Leather",
      picture: "https://cdn.shopify.com/s/files/1/0630/3861/9880/products/standard-primary-rug-backing-fabric-tuftingnation_2048x2048.jpg?v=1654258881", // Example image
      action: "",
      suggestion: "",
      donateTo: "",
    },
  ]);

  const [donationPeople, setDonationPeople] = useState([
    "John Smith",
    "Emily Davis",
    "Michael Clark",
  ]);

  const [discardSuggestions, setDiscardSuggestions] = useState([
    "Recycle",
    "Repurpose",
    "Sell",
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleActionChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id
        ? { ...item, action: event.target.value, donateTo: "" }
        : item
    );
    setClothesData(updatedData);
  };

  const handleDonateToChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id ? { ...item, donateTo: event.target.value } : item
    );
    setClothesData(updatedData);
  };

  const handleSuggestionChange = (event, id) => {
    const updatedData = clothesData.map((item) =>
      item.id === id ? { ...item, suggestion: event.target.value } : item
    );
    setClothesData(updatedData);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container
      sx={{
        marginTop: 4,
        padding: 2,
        borderRadius: 2,
        maxHeight: "100vh",
        overflowY: "auto", // Allows vertical scrolling
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "#2b6777",
        }}
      >
        Clothes Donation Management
      </Typography>

      {/* Clothes Table */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777",
          }}
        >
          Clothes Information
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="clothes table">
            <TableHead sx={{ backgroundColor: "#2b6777" }}>
              <TableRow>
                {[
                  "Name",
                  "Picture",
                  "Cloth Name",
                  "Age Group",
                  "Gender",
                  "Condition",
                  "Material",
                  "Action",
                  "Suggestion / Donate To",
                ].map((header) => (
                  <TableCell key={header} sx={{ color: "#ffffff" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clothesData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <img
                      src={row.picture}
                      alt={row.clothName}
                      style={{
                        width: "50px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageClick(row.picture)}
                    />
                  </TableCell>
                  <TableCell>{row.clothName}</TableCell>
                  <TableCell>{row.ageGroup}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.condition}</TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel>Action</InputLabel>
                      <Select
                        value={row.action}
                        onChange={(e) => handleActionChange(e, row.id)}
                        label="Action"
                      >
                        <MenuItem value="Donate">Donate</MenuItem>
                        <MenuItem value="Discard">Discard</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {row.action === "Donate" ? (
                      <FormControl fullWidth>
                        <InputLabel>Donate To</InputLabel>
                        <Select
                          value={row.donateTo}
                          onChange={(e) => handleDonateToChange(e, row.id)}
                          label="Donate To"
                        >
                          {donationPeople.map((person, index) => (
                            <MenuItem key={index} value={person}>
                              {person}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : row.action === "Discard" ? (
                      <FormControl fullWidth>
                        <InputLabel>Suggestion</InputLabel>
                        <Select
                          value={row.suggestion}
                          onChange={(e) => handleSuggestionChange(e, row.id)}
                          label="Suggestion"
                        >
                          {discardSuggestions.map((suggestion, index) => (
                            <MenuItem key={index} value={suggestion}>
                              {suggestion}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal for Image Preview */}
      <Modal open={!!selectedImage} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            outline: "none",
            boxShadow: 24,
          }}
        >
          <img
            src={selectedImage}
            alt="Preview"
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
        </Box>
      </Modal>

      {/* Donation Record Table */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777",
          }}
        >
          Donation Records
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="donation record table">
            <TableHead sx={{ backgroundColor: "#2b6777" }}>
              <TableRow>
                {[
                  "Donated By",
                  "Donated To",
                  "Gender",
                  "Age Group",
                  "Material",
                  "Cloth Name",
                  "Condition",
                ].map((header) => (
                  <TableCell key={header} sx={{ color: "#ffffff" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clothesData
                .filter(
                  (row) =>
                    row.action === "Donate" &&
                    row.donateTo &&
                    row.gender === "Male" &&
                    row.ageGroup === "2-4"
                )
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.donateTo}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.ageGroup}</TableCell>
                    <TableCell>{row.material}</TableCell>
                    <TableCell>{row.clothName}</TableCell>
                    <TableCell>{row.condition}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Discard Record Table */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            marginBottom: 2,
            color: "#2b6777",
          }}
        >
          Discard Records
        </Typography>
        <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="discard record table">
            <TableHead sx={{ backgroundColor: "#2b6777" }}>
              <TableRow>
                {["Name", "Cloth Name", "Material", "Suggestion"].map(
                  (header) => (
                    <TableCell key={header} sx={{ color: "#ffffff" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {clothesData
                .filter((row) => row.action === "Discard" && row.suggestion)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.clothName}</TableCell>
                    <TableCell>{row.material}</TableCell>
                    <TableCell>{row.suggestion}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ClothesDonationPage;

// import React, { useState } from "react";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Box,
//   Typography,
// } from "@mui/material";

// const ClothesDonationPage = () => {
//   const [clothesData, setClothesData] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       clothName: "T-shirt",
//       ageGroup: "2-4",
//       gender: "M",
//       condition: "Good",
//       material: "Cotton",
//       picture: "",
//       action: "",
//       suggestion: "",
//       donateTo: "",
//     },
//     {
//       id: 2,
//       name: "Jane Doe",
//       clothName: "Jacket",
//       ageGroup: "0-2",
//       gender: "F",
//       condition: "Worn",
//       material: "Leather",
//       picture: "",
//       action: "",
//       suggestion: "",
//       donateTo: "",
//     },
//   ]);

//   const [donationPeople, setDonationPeople] = useState([
//     { name: "John Smith", ageGroup: "2-4", gender: "M" },
//     { name: "Emily Davis", ageGroup: "0-2", gender: "F" },
//     { name: "Michael Clark", ageGroup: "2-4", gender: "M" },
//   ]);

//   const [discardSuggestions, setDiscardSuggestions] = useState([
//     "Recycle",
//     "Repurpose",
//     "Sell",
//   ]);

//   const handleActionChange = (event, id) => {
//     const updatedData = clothesData.map((item) =>
//       item.id === id ? { ...item, action: event.target.value, donateTo: "" } : item
//     );
//     setClothesData(updatedData);
//   };

//   const handleDonateToChange = (event, id) => {
//     const updatedData = clothesData.map((item) =>
//       item.id === id ? { ...item, donateTo: event.target.value } : item
//     );
//     setClothesData(updatedData);
//   };

//   const handleSuggestionChange = (event, id) => {
//     const updatedData = clothesData.map((item) =>
//       item.id === id ? { ...item, suggestion: event.target.value } : item
//     );
//     setClothesData(updatedData);
//   };

//   return (
//     <Container
//       sx={{
//         marginTop: 4,
//         padding: 2,
//         borderRadius: 2,
//         maxHeight: "100vh",
//         overflowY: "auto", // Enables scrolling
//       }}
//     >
//       <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center", color: "#2b6777" }}>
//         Clothes Donation Management
//       </Typography>

//       <Box sx={{ marginBottom: 4 }}>
//         <TableContainer component={Paper} sx={{ backgroundColor: "#e0e0e0" }}>
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead sx={{ backgroundColor: "#2b6777" }}>
//               <TableRow>
//                 {["Name", "Cloth Name", "Age Group", "Gender", "Condition", "Material", "Action", "Suggestion / Donate To"].map((header) => (
//                   <TableCell key={header} sx={{ color: "#ffffff" }}>{header}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {clothesData.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>{row.clothName}</TableCell>
//                   <TableCell>{row.ageGroup}</TableCell>
//                   <TableCell>{row.gender}</TableCell>
//                   <TableCell>{row.condition}</TableCell>
//                   <TableCell>{row.material}</TableCell>
//                   <TableCell>
//                     <FormControl fullWidth>
//                       <InputLabel>Action</InputLabel>
//                       <Select
//                         value={row.action}
//                         onChange={(e) => handleActionChange(e, row.id)}
//                         label="Action"
//                       >
//                         <MenuItem value="Donate">Donate</MenuItem>
//                         <MenuItem value="Discard">Discard</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </TableCell>
//                   <TableCell>
//                     {row.action === "Donate" ? (
//                       <FormControl fullWidth>
//                         <InputLabel>Donate To</InputLabel>
//                         <Select
//                           value={row.donateTo}
//                           onChange={(e) => handleDonateToChange(e, row.id)}
//                           label="Donate To"
//                         >
//                           {donationPeople
//                             .filter(
//                               (person) => person.ageGroup === row.ageGroup && person.gender === row.gender
//                             )
//                             .map((person, index) => (
//                               <MenuItem key={index} value={person.name}>
//                                 {person.name}
//                               </MenuItem>
//                             ))}
//                         </Select>
//                       </FormControl>
//                     ) : row.action === "Discard" ? (
//                       <FormControl fullWidth>
//                         <InputLabel>Suggestion</InputLabel>
//                         <Select
//                           value={row.suggestion}
//                           onChange={(e) => handleSuggestionChange(e, row.id)}
//                           label="Suggestion"
//                         >
//                           {discardSuggestions.map((suggestion, index) => (
//                             <MenuItem key={index} value={suggestion}>
//                               {suggestion}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     ) : null}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Container>
//   );
// };

// export default ClothesDonationPage;
