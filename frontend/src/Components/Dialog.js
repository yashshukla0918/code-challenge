import React, { useState } from 'react'
import { Button, Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from "@mui/material";
const DialogComp = ({dialog,message,setDialog}) => {
    const handleClose =()=>{
        setDialog(false)
    }
    return (
    <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="Message Dialog"
    >
        <DialogTitle>Message From Application</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogComp
