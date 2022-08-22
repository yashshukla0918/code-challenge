import React from 'react';
import { List, ListItem } from '@mui/material';
import { ListItemDrawer } from '../ListItemDrawer';

export function CustomList() {
  const data = ['item', 'item', 'item', 'item'];

  return (
    <div>
      <List>
        {data.map((item) => (
          <ListItem>{item}</ListItem>
        ))}
      </List>
      <ListItemDrawer />
    </div>
  );
}
