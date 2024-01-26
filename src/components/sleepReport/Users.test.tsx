import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Users } from "./Users";

describe("Users", () => {
  it("renders", () => {
    const { getAllByTestId } = render(<Users onPress={jest.fn} />);

    expect(getAllByTestId("Avatar-Button")).toHaveLength(3);
  });

  it("registers onPress when one of the avatar is tapped", () => {
    const onPressFn = jest.fn();
    const { getAllByTestId } = render(<Users onPress={onPressFn} />);

    const avatars = getAllByTestId("Avatar-Button");

    fireEvent.press(avatars[0]);
    expect(onPressFn).toHaveBeenCalledWith("rahim");
  });
});
