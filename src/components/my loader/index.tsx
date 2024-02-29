import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function () {
  return (
    <div style={{
      width : '100%',
      height: '100vh',
      display : 'flex',
      justifyItems : 'center',
      alignItems : 'center',
      justifyContent : 'center',
      borderWidth : 0,
      borderColor : 'black',
      borderStyle : 'solid'
    }}>
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>
    </div>
  );
}