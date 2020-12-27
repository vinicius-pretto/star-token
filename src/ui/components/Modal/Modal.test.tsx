import * as React from "react";
import { render } from "../../../testUtils";
import Modal from "./Modal";

describe("Modal", () => {
  it("snapshot", () => {
    const { asFragment } = render(
      <Modal title="Colors" isOpen={true} onClose={jest.fn()}>
        <div>Content</div>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
