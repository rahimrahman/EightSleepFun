import { render } from "@testing-library/react-native";
import React from "react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders", () => {
    const { getByText } = render(<Header />);

    expect(getByText("Sleep report")).toBeTruthy();
  });
});
