import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export const Theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
