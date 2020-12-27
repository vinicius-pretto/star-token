import * as React from "react";
import { render } from "../../../testUtils";
import Input from "./Input";

describe("Input", () => {
  it("snapshot", () => {
    const { asFragment } = render(
      <Input
        id="name"
        type="text"
        value="#cc0000"
        onChange={jest.fn()}
        onBlur={jest.fn()}
        placeholder="color-primary"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
