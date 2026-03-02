import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    {
      path: "./poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },

    // Optional italics
    {
      path: "./poppins/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});
