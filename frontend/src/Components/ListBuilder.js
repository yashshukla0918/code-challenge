import React from 'react'
import { List,ListItem,Button,ListItemAvatar,Avatar ,Typography} from "@mui/material";
import { Folder } from "@mui/icons-material";
const ListBuilder = ({schema,setDrawerItem,setNewEntry,setOpen,dataSet}) => {
  return (
    <List style={{
        float:'left',
        display: 'flex',
        flexDirection:'column'
      }}>
    <ListItem>
        <Button fullWidth color='primary' variant="contained" className='px-4' onClick={() => {
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
                <ListItem key={item?.id}  style={{
                    display:'grid'
                }}  >
                    <Button fullWidth className='px-4' onClick={() => { setDrawerItem((prev) => ({ ...prev, ...item })); setOpen(true) }}>
                        <ListItemAvatar >
                            <Avatar>
                                <Folder />
                            </Avatar>
                        </ListItemAvatar>
                        <Typography variant='span'>{item.description}</Typography>
                    </Button>
                </ListItem>
            )
        })
    }
</List>
  )
}

export default ListBuilder
