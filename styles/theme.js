// styles/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(135deg, #1A202C, #2D3748)", // Dark gradient background
        color: "gray.200", // Light text color
        fontFamily: "Arial, sans-serif",
      },
      a: {
        color: "teal.300",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  colors: {
    teal: {
      300: "#4FD1C5",
    },
    gray: {
      200: "#E2E8F0",
    },
  },
});

export default theme;
