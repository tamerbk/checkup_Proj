import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface Ambulance {
  id: number;
  date: Date;
  time: string;
  carNb: number;
  shiftDay: string;
  missingMaterials: string[];
  oxygenMainPercent: number;
  oxygenTankPercent: number;
  

}

const AmbulanceTable: React.FC = () => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Ambulance[]>('http://localhost:3000/ambulance');
        setAmbulances(response.data);
      } catch (error) {
        console.error('Error fetching ambulances:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Car Number</TableCell>
            <TableCell>shift Day</TableCell>
            <TableCell>Missing Equipment</TableCell>
            <TableCell>Main oxygen Tank</TableCell>
            <TableCell>Oxygen Tank</TableCell>
           
            {/* Add more table headers if needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {ambulances.map((ambulance) => (
            <TableRow key={ambulance.id}>
              <TableCell>{ambulance.id}</TableCell>
              <TableCell>{ambulance.time}</TableCell>
              <TableCell>{ambulance.carNb}</TableCell>
              <TableCell>{ambulance.shiftDay}</TableCell>
              <TableCell>{ambulance.missingMaterials}</TableCell>
              <TableCell>{ambulance.oxygenMainPercent}</TableCell>
              <TableCell>{ambulance.oxygenTankPercent}</TableCell>
   
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AmbulanceTable;
