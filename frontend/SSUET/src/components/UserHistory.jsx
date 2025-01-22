import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
} from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: "#2b6777",
      },
      background: {
        default: "#e0e0e0",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });

const UserHistory = () => {
    return (
        <div>
            <h1>Donations</h1>
        </div>
    );
};

export default UserHistory;