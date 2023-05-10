import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { importsTheme } from "./";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={importsTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};