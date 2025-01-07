/** @type {import('tailwindcss').Config} */

import tailwindTypography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme.js";
import colors from "tailwindcss/colors.js";

export default {
  content: ["./src/**/*.{njk,md}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // primary
      purple: {
        50: "#eae2f8",
        100: "#cfbcf2",
        200: "#a081d9",
        300: "#8662c7",
        400: "#724bb7",
        500: "#653cad",
        600: "#51279b",
        700: "#421987",
        800: "#34126f",
        900: "#240754",
      },
      orange: {
        50: "#ffe8d9",
        100: "#ffd0b5",
        200: "#ffb088",
        300: "#ff9466",
        400: "#f9703e",
        500: "#f35627",
        600: "#de3a11",
        700: "#c52707",
        800: "#ad1d07",
        900: "#841003",
      },
      // neutrals
      slate: {
        50: "#f0f4f8",
        100: "#d9e2ec",
        200: "#bcccdc",
        300: "#9fb3c8",
        400: "#829ab1",
        500: "#627d98",
        600: "#486581",
        700: "#334e68",
        800: "#243b53",
        900: "#102a43",
      },
      // supporting
      yellow: {
        50: "#fffbea",
        100: "#fff3c4",
        200: "#fce588",
        300: "#fadb5f",
        400: "#f7c948",
        500: "#f0b429",
        600: "#de911d",
        700: "#cb6e17",
        800: "#b44d12",
        900: "#8d2b0b",
      },
      red: {
        50: "#ffe3e3",
        100: "#ffbdbd",
        200: "#ff9b9b",
        300: "#f86a6a",
        400: "#ef4e4e",
        500: "#e12d39",
        600: "#cf1124",
        700: "#ab091e",
        800: "#8a041a",
        900: "#610316",
      },
      green: {
        50: "#e3f9e5",
        100: "#c1f2c7",
        200: "#91e697",
        300: "#51ca58",
        400: "#31b237",
        500: "#18981d",
        600: "#0f8613",
        700: "#0e7817",
        800: "#07600e",
        900: "#014807",
      },
      // legacy colors
      black: colors.black,
      gray: colors.gray,
      neutral: colors.neutral,
      white: colors.white,
    },
    extend: {
      fontFamily: {
        sans: ["Rajdhani", ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#421987",
              '&:hover': {
                color: "#653cad",
              },
              'text-decoration': 'none',
            },
            code: {
              fontWeight: 500,
            },
          },
        },
      },
    },
  },
  plugins: [tailwindTypography],
};
