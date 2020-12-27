import * as React from "react";
import { render } from "../../../testUtils";
import NavBar from "./Navbar";
import Tab from "../../../consts/Tab";

describe("Navbar", () => {
  it("snapshot", () => {
    const { asFragment } = render(
      <NavBar onClick={jest.fn()} tabSelected={Tab.TOKENS} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
