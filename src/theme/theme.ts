// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   typography: {
//     fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`, 
//   },
// });

// export default theme;

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
        },
      },
    },
  },
});

export default theme;
