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
import Dialog from '../Components/Dialog';
import DialogComp from '../Components/Dialog';
import ListBuilder from '../Components/ListBuilder';


const ListTile = () => {
    //Schema  for out data set
    let schema = {
        id: '',
        name: "",
        description: "",
        viewed: false,
        status: "new"
    }

    const [dialog, setDialog] = useState(false)
    const [dataSet, setDataSet] = useState([]);
    const [open, setOpen] = useState(false)
    const [newEntry, setNewEntry] = useState(false)
    const [loading, setLoading] = useState(true)
    const [ids, setIds] = useState('')
    const [drawerItem, setDrawerItem] = useState(schema)
    const [message, setMessage] = useState('');


    //data set statefull handler
    /*
    This  will handle state of values even after refreshing page
    */
    const manager = new DataManager()



    //Initial Render
    useEffect(async () => {
        let data = await manager.getList()
        setTimeout(() => {
            setDataSet(data)
            setLoading(false)
        }, 2000)
        return () => clearTimeout()
    }, [])

    //Reload the changed/updated data
    async function reload() {
        let data = await manager.getList()
        setDataSet(data)
    }

    //name updation/input handler
    const handleNameChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ name: e.target.value } }))
    }
    //description updation/input handler
    const handleDecChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ description: e.target.value } }))
    }
    ////view updation/input handler
    const handleViewChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ viewed: e.target.checked } }))
    }
    //status updation/input handler
    const handleStatusChange = (e) => {
        setDrawerItem((prev) => ({ ...prev, ...{ status: e.target.value } }))
    }


    // this will delete an item from row and update the state of application
    const handleDelete = (id) => {
        setLoading(true)
        manager.deleteData(id).then((res) => {
            const [status, data] = res;
            setOpen(false)
            setDataSet(data?.data)
            setMessage("Data Deleted Succesfully")
            setDialog(true)
            reload()
        }).catch((err) => {
            let message = "[ERROR] " + err?.response.data.message
            setMessage(message)
            setDialog(true)

        })
        setLoading(false)
    }

    /*
    This handlesubmit function has two functionalities
    1. This will add new Item
    2. This will update existing item
    */
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newEntry) {
            //ADDING
            setLoading(true)
            manager.addNewData(drawerItem).then((res) => {
                const [status, data] = res
                if (status === 201) {
                    setOpen(false)
                    setNewEntry(false)
                    setMessage(data?.message)
                    setDialog(true)
                    reload()
                }
            }).catch((err) => {
                let message = "[ERROR] " + err?.response.data.message
                setMessage(message)
                setDialog(true)

            })
            setLoading(false)
        }
        else {
            //UPDATING
            setLoading(true)
            manager.updateData(drawerItem).then((res) => {
                const [status, data] = res
                if (status === 200) {
                    setOpen(false)
                    setMessage("Updated Successfully")
                    setDialog(true)
                    reload()
                }
            }).catch((err) => {
                let message = "[ERROR] " + err?.response.data.message
                setMessage(message)
                setDialog(true)

            })
            setLoading(false)
        }
    }


    return (

        loading ? <CircularBar /> : <div>
            <div className='row'>
                <div className='col-sm-4'>
                {
                        <ListBuilder
                            schema={schema}
                            dataSet={dataSet}
                            setDrawerItem={setDrawerItem}
                            setNewEntry={setNewEntry}
                            setOpen={setOpen}
                        />
                    }
                </div>
                <div className='col-sm-4'>
                    
                </div>
                <div className='col-sm-4'></div>
            </div>

            <Drawer
                open={open}
                className='px-5'
                anchor='right'
                onClose={() => { setNewEntry(false); setOpen(false) }}
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
                                {drawerItem.status !== 'complete' ? <RadioGroup
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
                                </RadioGroup> : <Typography variant='h6'>Completed</Typography>}
                            </FormControl>
                            <Divider className='my-3' />
                            <ButtonGroups
                                handleDelete={handleDelete}
                                id={drawerItem.id}
                                newEntry={newEntry}
                                setNewEntry={setNewEntry}
                                setOpen={setOpen}
                            />
                        </center>
                    </div>
                </form>
            </Drawer>
            <DialogComp dialog={dialog} setDialog={setDialog} message={message} />
        </div>

    )
}

export default ListTile
