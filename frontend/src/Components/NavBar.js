import React from 'react'
import { AppBar,Toolbar,Typography,IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
const NavBar = () => {
  return (
    <AppBar position='relative' component='div' color='primary'>
        <Toolbar  variant='dense'>
          <Typography variant='h5'>YouScience</Typography>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar
