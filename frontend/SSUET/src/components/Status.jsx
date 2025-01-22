import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const StatusForm = () => {
  const [name, setName] = useState('');
  const [clothName, setClothName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [gender, setGender] = useState('');
  const [condition, setCondition] = useState('');
  const [material, setMaterial] = useState('');
  const [status, setStatus] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = () => {
    if (status === 'Completed') {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      // Handle further actions on confirmed status
      console.log('Status confirmed as Completed!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cloth Status Form</h2>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Cloth Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={clothName}
        onChange={(e) => setClothName(e.target.value)}
      />
      <TextField
        label="Age Group"
        variant="outlined"
        fullWidth
        margin="normal"
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Condition"
        variant="outlined"
        fullWidth
        margin="normal"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
      <TextField
        label="Material"
        variant="outlined"
        fullWidth
        margin="normal"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={handleStatusChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={status !== 'Completed'}
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Status</DialogTitle>
        <DialogContent>
          <p>Are you sure the status is "Completed"?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default StatusForm;
