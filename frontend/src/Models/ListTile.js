import React, { useState, useEffect } from 'react'
import {
    TextField,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    Button,
    Drawer,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Divider,
    IconButton,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { Folder, Close } from "@mui/icons-material";
import ButtonGroups from '../Components/ButtonGroups';
import DataManager from "../Controller/DataManager";
import CircularBar from '../Components/CircularBar';


const ListTile = () => {

    let schema = {
        name: "",
        description: "",
        viewed: false,
        status: "new"
    }
    const [dataSet, setDataSet] = useState([]);
    const [open, setOpen] = useState(false)
    const [newEntry, setNewEntry] = useState(false)
    const [loading, setLoading] = useState(true)
    const [drawerItem, setDrawerItem] = useState(schema)
    const manager = new DataManager()




    useEffect(async () => {
        let data = await manager.getList()
        setTimeout(()=>{
            setDataSet(data)
            setLoading(false)
        },2000)
        return ()=> clearTimeout()
    }, [])


    async function reload(){
        let data = await manager.getList()
        setDataSet(data)
    }


    const handleNameChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ name: e.target.value } }))
    }
    const handleDecChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ description: e.target.value } }))
    }
    const handleViewChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ viewed: e.target.checked } }))
    }
    const handleStatusChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ status: e.target.value } }))
    }
    const handleDelete = () => {
    }
    const handleSubmit =  (e) => {
        e.preventDefault()
        if (newEntry) {
            setLoading(true)
            manager.addNewData(drawerItem).then((res)=>{
                const [status,data] = res
                if(status === 201){
                    setOpen(false)
                    setNewEntry(false)
                    alert(data?.message)
                    reload()
                }
            }).catch((err)=>{
                log(err)
            })
            setLoading(false)
        }
        else {
            //update here
        }
    }


    return (
        
            loading? <CircularBar/>: <div>
            <List>
                <ListItem>
                    <Button color='primary' variant="contained" className='px-4' onClick={() => {
                        setDrawerItem(schema)
                        setNewEntry(true)
                        setOpen(true)
                    }}>
                        <Typography variant='span'>Add New</Typography>
                    </Button>
                </ListItem>
                {
                    dataSet?.map((item) => {
                        return (
                            <ListItem key={item.name}>
                                <Button className='px-4' onClick={() => { setDrawerItem((prev) => ({ ...prev, ...item })); setOpen(true) }}>
                                    <ListItemAvatar >
                                        <Avatar>
                                            <Folder />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Typography variant='span'>{item.name}</Typography>
                                </Button>
                            </ListItem>
                        )
                    })
                }
            </List>
            <Drawer
                open={open}
                className='px-5'
                anchor='right'
                onClose={() => setOpen(false)}
            >
                <form onSubmit={handleSubmit}>
                    <div className='p-3  my-2 mx-4' style={{
                        width: window.innerWidth * 0.30
                    }} >
                        <IconButton onClick={() => { setOpen(false); setNewEntry(false) }}>
                            <Close />
                        </IconButton>
                        <center>
                            <TextField value={drawerItem.name} fullWidth label="Name" onChange={handleNameChange} variant="outlined" className='my-2' required /><br />
                            <Textarea value={drawerItem.description} label="Description" onChange={handleDecChange} minRows={3} variant="outlined" className='my-2' placeholder='Description...' />
                            <Divider />
                            <div className='my-2'>
                                <FormLabel id="view-lable">Viewed</FormLabel>
                                <Checkbox onChange={handleViewChange} checked={drawerItem.viewed} className='my-2' inputProps={{ 'aria-label': 'Checkbox demo' }} />
                            </div>
                            <Divider /><br />
                            <FormControl className='text-center'>
                                <FormLabel id="radio-lable">Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="radio-lable"
                                    value={drawerItem.status}
                                    name="radio-buttons-group"
                                    onChange={handleStatusChange}
                                    row>
                                    <center>
                                        <FormControlLabel value="new" control={<Radio required />} label="New" />
                                        <FormControlLabel value="in-progress" control={<Radio required />} label="In Progress" />
                                        <FormControlLabel value="on-hold" control={<Radio required />} label="On Hold" />
                                        <FormControlLabel value="complete" control={<Radio required />} label="Complete" />
                                        <FormControlLabel value="archived" control={<Radio required />} label="Archived" />
                                    </center>
                                </RadioGroup>
                            </FormControl>
                            <Divider className='my-3' />
                            <ButtonGroups
                                newEntry={newEntry}
                                setNewEntry={setNewEntry}
                                setOpen={setOpen}
                            />
                        </center>
                    </div>
                </form>
            </Drawer>
        </div>
    
    )
}

export default ListTile
