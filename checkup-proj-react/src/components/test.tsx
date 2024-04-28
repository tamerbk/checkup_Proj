// test.tsx
import React from "react";
import { getLocalStorageUser } from "../utils/localStorageUtils";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Test: React.FC = () => {
    const member = getLocalStorageUser(); 
    
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column', // Align cards vertically
                    gap: '20px',
                }}>
                    <Link to="/card1" style={{ textDecoration: 'none' }}>
                        <Card sx={{ maxWidth: 200 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={logo}
                                    alt="Ambulance"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        AMBULANCE
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>

                    <Card sx={{ maxWidth: 200 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={logo}
                                alt="SOIN"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    SOIN
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card sx={{ maxWidth: 200 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={logo}
                                alt="SECTOR"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    SECTOR
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Test;
