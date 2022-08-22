// The following links may provide some assistance
// https://material-ui.com/components/text-fields/#api
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
import React from 'react';
import { Checkbox, Drawer, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from '@mui/material';

export function ListItemDrawer(props) {
  const [drawerOpen, openDrawer] = React.useState(true);

  const defaultState = {
    name: '',
    viewed: 'false',
    description: '',
    status: false,
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={openDrawer}
      anchor='right'
      variant='persistent'
      style={{ width: 200, flexShrink: 0 }}
    >
      <h2>This is the drawer</h2>
      <Input name='name' value='' onChange={() => {}} />
      <label>Description</label>
      <input name='somethingElse' value={defaultState.name} type='text' onChange={() => {}} />
      <FormLabel>This is a label</FormLabel>
      <Checkbox value={false} />
      <RadioGroup name='status' value={defaultState.status}>
        <FormControlLabel value='' label='option' control={<Radio />} />
        <label>
          {' '}
          this is a label
          <Radio />
        </label>
        <Radio checked onChange={() => {}} value='a' name='radio-button-demo' />
      </RadioGroup>
    </Drawer>
  );
}
