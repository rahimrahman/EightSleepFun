import { Platform } from "react-native";

export const celsiusToFahrenheit = (celcius: number) => (celcius * 9) / 5 + 32;

export const hoursDisplay = (datetime: string) => new Date(datetime).toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export const defaultFontFamily = Platform.select({ ios: "Helvetica", default: "serif" });

export const getFontProperties = (fontSize: number, fontStyle: "normal" | "italic", fontWeight: string) => ({
  fontFamily: defaultFontFamily,
  fontSize,
  fontStyle,
  fontWeight,
});
