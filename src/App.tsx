// import { CssBaseline, ThemeProvider } from '@mui/material';
// import theme from './theme/theme';
// import MainPage from "./app/MainPage"; 

// export function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline /> 
//       <MainPage />
//     </ThemeProvider>
//   );
// }

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from './theme/theme';
import MainPage from "./app/MainPage"; 

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
}

// import DummyEditableExample from "./components/testing";

// export function App() {
//   return (
//     <div style={{ padding: 40 }}>
//       <DummyEditableExample />
//     </div>
//   );
// }

// export default App;

