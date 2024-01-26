import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Avatar } from "./Avatar";

describe("Header", () => {
  it("renders", () => {
    const { getByTestId } = render(
      <Avatar user={"rahim"} isSelected={false} onPress={jest.fn} />
    );

    const profileImage = getByTestId("Avatar-Image");
    expect(profileImage).toBeTruthy();
    expect(profileImage.props.source).toHaveProperty(
      "testUri",
      "../../../assets/images/profilePhotos/rahim.png"
    );

    const clickable = getByTestId("Avatar-Button");
    expect(clickable).toBeTruthy();
  });

  it("changes border color when selected", () => {
    const { debug, getByTestId, rerender } = render(
      <Avatar user={"nora"} isSelected={false} onPress={jest.fn} />
    );

    const container = getByTestId("Avatar-Button");
    expect(container.props.style).toHaveProperty("borderColor", "white");

    rerender(<Avatar user={"nora"} isSelected={true} onPress={jest.fn} />);

    expect(container.props.style).toHaveProperty("borderColor", "#1911f5");
  });

  it("registers onPress when tap", () => {
    const onPressFn = jest.fn();

    const { getByTestId } = render(
      <Avatar user={"rahim"} isSelected={false} onPress={onPressFn} />
    );

    const container = getByTestId("Avatar-Button");
    fireEvent.press(container);

    expect(onPressFn).toHaveBeenCalledTimes(1);
  });
});
