import React, { PropsWithChildren } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import defaultTheme, { getDesignTokens } from "@/helper/theme";
import { useIsomorphicLayoutEffect } from "ahooks";
import NextAppDirEmotionCacheProvider from "@/helper/EmotionCache";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const ThemeSwitchProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = React.useState(defaultTheme);
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  useIsomorphicLayoutEffect(() => {
    const rootElement = document.getElementById("__next");
    // All `Portal`-related components need to have the the main app wrapper element as a container
    // so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
    setTheme(
      createTheme({
        ...getDesignTokens(mode),
        components: {
          MuiPopover: {
            defaultProps: {
              container: rootElement,
            },
          },
          MuiPopper: {
            defaultProps: {
              container: rootElement,
            },
          },
          MuiDialog: {
            defaultProps: {
              container: rootElement,
            },
          },
          MuiDrawer: {
            defaultProps: {
              container: rootElement,
            },
          },
        },
      })
    );
  }, [mode]);
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "css", prepend: true }}>
      <StyledEngineProvider injectFirst>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </StyledEngineProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
export default ThemeSwitchProvider;
