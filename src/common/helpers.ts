
export const celsiusToFahrenheit = (celcius: number) => (celcius * 9) / 5 + 32;

export const hoursDisplay = (datetime: string) => new Date(datetime).toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
