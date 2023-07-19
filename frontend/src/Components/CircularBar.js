import { CircularProgress, Box } from "@mui/material";
import './com.css'
import React from 'react'

const CircularBar = () => {
    return (
        <div className="center">
            <center>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </center>
        </div>
    )
}

export default CircularBar
