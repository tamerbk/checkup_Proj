import React, { useEffect, useState } from "react";
import { Checkbox, Button, Divider, Chip, Box, Slider, Typography, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, InputLabel, Select, SelectChangeEvent, MenuItem, Modal } from "@mui/material"
import { Label, South } from "@mui/icons-material";
import { getLocalStorageUser } from "../utils/localStorageUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MAX = 10;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

const marksN = [
    {
      value: MIN,
      label: '',
    },
    {
      value: MAX,
      label: '',
    },
  ];

const CheckBoxesVerification: React.FC = () => {
   // for  Strips scrollor

   const navigate = useNavigate();

   const member = getLocalStorageUser();
   const [modalOpen, setModalOpen] = useState(false);
   const [missingEquipment, setMissingEquipment] = useState<string[]>([]);
  
   const openModal = () => {
    setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};



   const [carSelected, setCarSelected] = useState(false);
   
   
   const [stripsVal, setStripsVal] = React.useState<number>(MIN);
    const handleStripsChange = (_: Event, newValue: number | number[]) => {
      setStripsVal(newValue as number);
    };
    // for needles
    const [needlesVal, setNeedlesVal] = React.useState<number>(MIN);
    const handleNeedlesChange = (_: Event, newValue: number | number[]) => {
      setNeedlesVal(newValue as number);
    };

    const [viralValue, setViralValue] = useState(0);

  const handleViralChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViralValue(parseInt(event.target.value));
  };






    const initialCheckboxes = [
        { name: "cannula 40", checked: false },
        { name: "cannula 50", checked: false },
        { name: "cannula 60", checked: false },
        { name: "cannula 70", checked: false },
        { name: "cannula 80", checked: false },
        { name: "cannula 90", checked: false },
        { name: "cannula 100", checked: false },
        { name: "cannula 110", checked: false },
        { name: "tensiometer", checked: false },
        { name: "stethoscope", checked: false },
        { name: "manual suction", checked: false },
        { name: "MS tubes", checked: false },
        { name: "Electrical S tubes", checked: false },
        { name: "ambubag Adult", checked: false },
        { name: "ambubag Pediatric", checked: false },
       

        // Add more checkboxes here as needed
    ];

    const [Car, setCar] = React.useState('');

      const handleChange = (event: SelectChangeEvent) => {
        setCar(event.target.value as string);
      };
    
      useEffect(()=>{
        console.log('carr',Car)
          },[Car]);
    
   
    const [checkboxes, setCheckboxes] = useState<{ name: string; checked: boolean }[]>(initialCheckboxes);

    const handleCheckboxChange = (index: number) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
        setCheckboxes(updatedCheckboxes);
    };

    const [submitClicked, setSubmitClicked] = useState(false);

const [OxygenPercentage, setOxygenPercentage]= useState<number>(0);
const [mainOxygenPercentage, setMainOxygenPercentage]= useState<number>(0);
  

const handleOxygenError = () => {
      const input1 = document.getElementById(`input1`) as HTMLInputElement;
      const input2 = document.getElementById(`input2`) as HTMLInputElement;
      const input3 = document.getElementById(`input3`) as HTMLInputElement;
      const input4 = document.getElementById(`input4`) as HTMLInputElement;
  
      let error = false;
      if (!input1.value || !input2.value || !input3.value || !input4.value) {
        alert('please fill all required fields!');
        return true ;
    }
  
    
      // Check first set of input fields
      if (input1 && input2) {
          const value1 = parseInt(input1.value);
          const value2 = parseInt(input2.value);
          
          if (value1 > value2 || value2===0) {
              input1.style.backgroundColor = 'red';
              input2.style.backgroundColor = 'white';
              error = true; // Set error to true if there's an error
          } else {
            const o = (value1 * 100) / value2;
            setOxygenPercentage(o); 
            input1.style.backgroundColor = 'white';
              input2.style.backgroundColor = 'white';

          }
      }
  
  
      // Check second set of input fields
      if (input3 && input4) {
          const value3 = parseInt(input3.value);
          const value4 = parseInt(input4.value);
          
          if (value3 > value4 || value4===0) {
              input3.style.backgroundColor = 'red';
              input4.style.backgroundColor = 'white';
              error = true; // Set error to true if there's an error
          } else {
            const o = (value3 * 100) / value4;
            setMainOxygenPercentage(o);
              input3.style.backgroundColor = 'white';
              input4.style.backgroundColor = 'white';
          }
      }
  
      return error; // Return true if any error occurred
  };

  useEffect(() => {
    if (OxygenPercentage < 20) {
      setMissingEquipment(prevMissingEquipment => [...prevMissingEquipment, "Oxygen Tank"]);
  } else {
      // Remove "Oxygen Tank" from missing equipment if oxygen percentage is above or equal to 20
      setMissingEquipment(prevMissingEquipment => prevMissingEquipment.filter(item => item !== "Oxygen Tank"));
  }
  }, [OxygenPercentage]);

  useEffect(() => {
    if (mainOxygenPercentage < 10) {
        setMissingEquipment(prevMissingEquipment => [...prevMissingEquipment, "Main Oxygen Tank"]);
    } else {
        // Remove "Main Oxygen Tank" from missing equipment if main oxygen percentage is above or equal to 10
        setMissingEquipment(prevMissingEquipment => prevMissingEquipment.filter(item => item !== "Main Oxygen Tank"));
    }
}, [mainOxygenPercentage]);

const handleSubmit = () => {
  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // Get current time
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const formattedTime = `${currentHours}:${currentMinutes}`; // Format: HH:MM

  const requestData = {
    memberId: member?.member_id,
    data: formattedDate,
    time: formattedDate.toString,
    carNb: parseInt(Car),
    shiftDay: member?.shiftDay,
    missingMaterials: missingEquipment,
    oxygenMainPercent:Math.ceil(OxygenPercentage),
    oxygenTankPercent: Math.ceil(mainOxygenPercentage)
  };
 
  axios.post('http://localhost:3000/ambulance',requestData ).then(response => {
      navigate("/test")
      console.log(response.data);
  }).catch(error => {
      console.error('Error:', error);
  });
}

 
  const modalContent = (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
        <Typography variant="h6" component="h2">
            {missingEquipment.length > 0 ? "Missing Equipment" : "No missing elements"}
        </Typography>
        {missingEquipment.length > 0 ? (
            missingEquipment.map((item, index) => (
                <Typography key={index} variant="body1">{item}</Typography>
            ))
        ) : (
            <Typography variant="body1">No missing elements</Typography>
        )}
        <Button onClick={handleSubmit} sx={{ mt: 2 }}>Okay</Button>
    </Box>
);



    const handleVerificationClick = () => {
     
      setSubmitClicked(true);
      
     const MissingEquipment= []
    
     
     if (!Car) {
      setCarSelected(false);
      return;
  } else {
      setCarSelected(true);
  }

     if (handleOxygenError()) {
      return;
  }

        const uncheckedCheckboxes = checkboxes.filter(checkbox => !checkbox.checked).map(checkbox => checkbox.name);
      let strips=0, needles=0;
        if(stripsVal<10){
            strips=10-stripsVal;
            MissingEquipment.push("strips "+ strips);
        }
        if(needlesVal<10){
            needles=10-needlesVal;
      MissingEquipment.push("needles "+ needles);
        }
        if(viralValue<3)
            {
                MissingEquipment.push("viral Filter " + (3-viralValue));
            }

            const result = MissingEquipment.concat(uncheckedCheckboxes);
            
          if (result.length > 0) {
            openModal();
        } else {
            setModalOpen(false);
        }

        setMissingEquipment(result)
        console.log("Unchecked Checkboxes:", uncheckedCheckboxes, missingEquipment);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        event.target.value = value.replace(/\D/, '');
       
      };

      

    return (
       <>


       <div  style={{ backgroundColor: '#BF0000', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          
      
            <div>
<div style={{display: "flex", justifyContent: 'center', alignItems: 'center', color: 'white', backgroundColor:'white'}}><h1 style={{color: 'red'}}>AMBULANCE CHECKUP</h1></div>

<div style={{marginTop:'20px'}}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label" sx={{color:'white'}}>CAR</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={Car}
    label="CAR"
    onChange={handleChange}
    sx={{ color: 'white' }}
  >
    <MenuItem value={641}>641</MenuItem>
    <MenuItem value={642}>642</MenuItem>
    <MenuItem value={643}>643</MenuItem>
    <MenuItem value={644}>644</MenuItem>
    <MenuItem value={646}>646</MenuItem>
  </Select>
</FormControl>
</div>

                <Divider textAlign="left" sx={{ marginBottom: '50px', color:'#fff', marginTop: '60px' }}>
                    <Chip label="O2 Kit" size="medium" sx={{ fontSize: '1.2rem', color: 'red', backgroundColor: '#fff' }} />
                </Divider>
                <div style={{ backgroundColor: '' }}>
                    <Divider textAlign="center" sx={{ marginBottom: '20px', marginLeft: '70px', color:'#fff', width: '60%', marginTop: "20px" }}>
                        <Chip label="Airways Cannula" size="medium" sx={{ fontSize: '1.2rem', color: 'red', backgroundColor: '#fff' }} />
                    </Divider>
                    <div style={{ display: 'flex', flexWrap: 'wrap', color: '#FFFFFF' }}>
                        {checkboxes.slice(0, 8).map((checkbox, index) => (
                            <div key={checkbox.name} style={{ marginRight: '20px', marginBottom: '10px' }}>
                                <Checkbox
                                    checked={checkbox.checked}
                                    onChange={() => handleCheckboxChange(index)}
                                    sx={{ '& .MuiSvgIcon-root': { color: '#FFFFFF' } }}
                                />
                                <span>{index * 10 + 40}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Divider style={{marginLeft:'70px', width:'60%', marginBottom: '60px' }}/>
                <div style={{ display: 'flex', flexWrap: 'wrap', color: '#FFFFFF' }}>
                        {checkboxes.slice(8, 10).map((checkbox, index) => (
                            <div key={checkbox.name} style={{ marginRight: '20px', marginBottom: '10px', marginLeft: '70px' }}>
                                <Checkbox
                                    checked={checkbox.checked}
                                    onChange={() => handleCheckboxChange(index+8)}
                                    sx={{ '& .MuiSvgIcon-root': { color: '#FFFFFF' } }}
                                />
                                <span>{checkbox.name}</span>
                            </div>
                        ))}
                    </div>
                   <Divider textAlign="center" sx={{ marginBottom: '20px', marginLeft: '70px', color:'#fff', width: '60%', marginTop: "20px" }}>
                        <Chip label="Glocometer" size="medium" sx={{ fontSize: '1.2rem', color: 'red', backgroundColor: '#fff' }} />
                    </Divider>
                   
                    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ width: "90%", mx: "auto" }}>
          <Typography textAlign="center">Strips</Typography>
          <Slider
            marks={marks}
            step={1}
            value={stripsVal}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={handleStripsChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography
              variant="body2"
              onClick={() => setStripsVal(MIN)}
              sx={{ cursor: 'pointer' }}
            >
              {MIN} 
            </Typography>
            <Typography
              variant="body2"
              onClick={() => setStripsVal(MAX)}
              sx={{ cursor: 'pointer' }}
            >
              {MAX} 
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ width: "90%", mx: "auto" }}>
          <Typography textAlign="center">Second Slider</Typography>
          <Slider
            marks={marksN}
            step={1}
            value={needlesVal}
            valueLabelDisplay="auto"
            min={MIN}
            max={MAX}
            onChange={handleNeedlesChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="body2"
              onClick={() => setNeedlesVal(MIN)}
              sx={{ cursor: 'pointer' }}
            >
              {MIN} 
            </Typography>
            <Typography
              variant="body2"
              onClick={() => setNeedlesVal(MAX)}
              sx={{ cursor: 'pointer' }}
            >
              {MAX} 
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>

    <Divider textAlign="center" sx={{ marginBottom: '20px', marginLeft: '70px', color:'#fff', width: '60%', marginTop: "30px" }}>
                        <Chip label="Airways managment Equipment" size="medium" sx={{ fontSize: '1.2rem', color: 'red', backgroundColor: '#fff' }} />
                    </Divider>

                    <div style={{ display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', marginLeft: '70px', flexDirection: 'row' }}>
  {checkboxes.slice(10, 15).map((checkbox, index) => (
    <div key={checkbox.name} style={{ marginRight: '20px', marginBottom: '10px', width: 'fit-content' }}>
      <Checkbox
        checked={checkbox.checked}
        onChange={() => handleCheckboxChange(index + 10)}
        sx={{ '& .MuiSvgIcon-root': { color: '#FFFFFF' } }}
      />
      <span style={{ marginLeft: '5px' }}>
        {checkbox.name}
      </span>
    </div>
  ))}
</div>

<div style={{ display: 'flex', flexWrap: 'wrap', color: '#FFFFFF', marginLeft: '70px', flexDirection: 'row' , marginBottom:'20px' }}>
<FormControl>
  <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: "white" }}>Viral Filter</FormLabel>
  <RadioGroup
    row
    value={viralValue.toString()}
        onChange={handleViralChange}
    aria-labelledby="demo-row-radio-buttons-group-label"
    name="row-radio-buttons-group"
  >
    <FormControlLabel value="0" control={<Radio sx={{ color: 'white' }} />} label="0" />
    <FormControlLabel value="1" control={<Radio sx={{ color: 'white' }} />} label="1" />
    <FormControlLabel value="2" control={<Radio sx={{ color: 'white' }} />} label="2" />
    <FormControlLabel value="3" control={<Radio sx={{ color: 'white' }} />} label="3" />
  </RadioGroup>
</FormControl>


</div>
<Divider textAlign="center" sx={{ marginBottom: '20px', marginLeft: '70px', color:'#fff', width: '60%', marginTop: "30px" }}>
                        <Chip label="Oxygen" size="medium" sx={{ fontSize: '1.2rem', color: 'red', backgroundColor: '#fff' }} />
                    </Divider>




   <div>
                    <h3 style={{ color: 'white', marginLeft: '10px' }}>Oxygen Tank</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        id={`input1`}
                        size="small"
                        inputProps={{
                            type: 'text', // Set input type to text
                            pattern: '[0-9]*', // Allow only numerical input
                        }}
                        required
                        onChange={handleInputChange}
                        sx={{ backgroundColor: "white", marginLeft: '20px', marginBottom: "20px", width: '80px' }}
                    />
                    <h1 style={{ marginBottom: "50px", marginLeft: "20px" }}> / </h1>
                    <TextField
                        id={`input2`}
                        required
                        size="small"
                        inputProps={{
                            type: 'text', // Set input type to text
                            pattern: '[0-9]*', // Allow only numerical input
                        }}
                        onChange={handleInputChange}
                        sx={{ backgroundColor: "white", marginLeft: '20px', marginBottom: "20px", width: '80px' }}
                    />
                </div>
<div>
   <h3 style={{color: 'white',marginLeft:'10px'}}>Oxygen MAIN</h3>
   </div>
<div style={{ display: "flex", alignItems: "center" }}>
 
    
<TextField
id={`input3`}
  size="small"
   inputProps={{
    type: 'text', 
    pattern: '[0-9]*',
  }}
  required
  onChange={handleInputChange}
    sx={{ backgroundColor: "white",marginLeft:'20px', marginBottom:"20px", width:'80px' }}
    
  />
 <h1 style={{ marginBottom: "50px", marginLeft:"20px" }}> / </h1>

  <TextField
  id={`input4`}
  size="small"
   inputProps={{
    type: 'text', 
    pattern: '[0-9]*',
  }}
  required
  onChange={handleInputChange}
    sx={{ backgroundColor: "white",marginLeft:'20px', marginBottom:"20px", width:'80px' }}
    
  />



</div>



<div style={{ display: 'flex', justifyContent: 'center' }}>
  <Button onClick={handleVerificationClick} size="large" sx={{ fontSize: '1.2rem', marginBottom: '20px', backgroundColor: 'white', color: 'black' }}>SUBMIT</Button>
</div>      
            </div>
           
        </div>
        <Modal
    open={submitClicked && !carSelected} // Open modal only if submit button is clicked and car is not selected
    onClose={() => setCarSelected(true)} // Close modal if user clicks on background
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Please select a car.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You need to select a car before submitting the form.
        </Typography>
        <Button onClick={() => setCarSelected(true)} sx={{ mt: 2 }}>Okay</Button>
    </Box>
</Modal>

<Modal
        open={modalOpen}
        onClose={handleSubmit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent}
      </Modal>
               
        </>
    );
};

export default CheckBoxesVerification;
