import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import testbackground from './images/testbackground.jpg';
import axios from 'axios';
import { setLocalStorageUser } from '../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

interface LoginProps {
  onLoginSuccess: () => void;
}

const SignIn: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [cardNb, setCardNb] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Allow only numerical input
    event.target.value = value.replace(/\D/, '');
    setCardNb(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };
  const handleSubmit = async () => {
    try {
      if(cardNb!=="00000")
     { const response = await axios.get(`http://localhost:3000/members/${cardNb}`);
      if (response && response.data) {
        setLocalStorageUser(response.data);
        onLoginSuccess();
        navigate("/test");
      } else {
               setShowAlert(true);
      }
    }
    else{
      setShowAlert(false)
      setShowPassword(true);
      if(password==="admin"){
        navigate("/admin");
        

      }
      else {
        setShowAlert(true);
      }
    }
    } catch (error) {
      console.error('Error retrieving user:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
        background: `url(${testbackground}) center/cover`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        <TextField
          required
          helperText="Please enter your Id"
          id="demo-helper-text-aligned"
          label="card Id"
          margin="normal"
          inputProps={{
            type: 'text',
            pattern: '[0-9]*',
          }}
          onChange={handleInputChange}
          sx={{
            marginRight: '16px',
            '& input': {
              borderColor: '#FFFFFF',
              borderWidth: '2px',
              WebkitAppearance: 'none',
              '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
            },
            '& .MuiInputLabel-root': {
              // color: '#FFFFFF', // Set label color to white
            },
          }}
        />

{showPassword && (
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            margin="normal"
            sx={{
              marginBottom: '16px',
              '& input': {
                borderColor: '#FFFFFF',
                borderWidth: '2px',
                WebkitAppearance: 'none',
                '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
              '& .MuiInputLabel-root': {
            
              },
            }}
          />
        )}


        <IconButton aria-label="submit" sx={{ borderRadius: '100%' }} size="large" onClick={handleSubmit}>
          <ArrowCircleRightIcon sx={{ fontSize: '55px', marginBottom: '12px' }} />
        </IconButton>
      </Box>
      {/* Alert */}
      {showAlert && (
        <Alert
          sx={{
            position: 'absolute',
            bottom: '20px',
            width: '100%',
            textAlign: 'center',
          }}
          severity="error"
          onClose={() => setShowAlert(false)}
        >
          ID not found!
        </Alert>
      )}
    </Box>
  );
}

export default SignIn;