import React from 'react'
import { ButtonGroup, Button } from "@mui/material";
const ButtonGroups = ({ id,newEntry, setNewEntry, setOpen ,handleDelete}) => {
    return (
        <ButtonGroup
            fullWidth
            aria-label="flex button group"
        >
            {
                newEntry ? <>
                    <Button type='submit' color='success' >Save New</Button>
                    <Button type='button' color='warning' onClick={() => { setNewEntry(false); setOpen(false) }}>Cancel</Button>
                </> : <>
                    <Button type='submit'  color='warning'>Update</Button>
                    <Button type='button' color='error' onClick={()=>{handleDelete(id)}}>Delete</Button>
                </>
            }
        </ButtonGroup>
    )
}

export default ButtonGroups
