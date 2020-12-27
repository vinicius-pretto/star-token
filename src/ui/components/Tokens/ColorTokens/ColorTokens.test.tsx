import * as React from "react";
import { screen, render, waitFor } from "../../../../testUtils";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import ColorTokens from "./ColorTokens";
import tokenMessenger from "../../../messages/tokenMessenger";
import TokenType from "../../../../consts/TokenType";
import tokens from "../../../../testData/tokens";

jest.mock("../../../messages/tokenMessenger");

describe("ColorTokens", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("snapshot", () => {
    it("no color tokens", () => {
      const { asFragment } = render(
        <ColorTokens tokens={[]} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("with color tokens", () => {
      const { asFragment } = render(
        <ColorTokens tokens={tokens} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("form validation", () => {
    beforeEach(() => {
      render(<ColorTokens tokens={[]} onDelete={jest.fn()} />);

      const addButton = screen.getByTestId("add-token-btn");
      userEvent.click(addButton);
    });

    it("display error when submit empty form", async () => {
      const submitButton = screen.getByRole("button", { name: /save/i });
      await waitFor(() => userEvent.click(submitButton));

      expect(screen.getAllByText("Required")).toHaveLength(2);
      expect(tokenMessenger.postSetTokensMessage).not.toHaveBeenCalled();
    });

    describe("input name", () => {
      it("display error when fill out invalid character", async () => {
        const inputName = screen.getByPlaceholderText("color-primary");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage =
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)";

        userEvent.type(inputName, "-/*+");
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      it("display error when length is greather than 48 characters", async () => {
        const inputName = screen.getByPlaceholderText("color-primary");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage = "Maximum 48 characters";

        userEvent.type(inputName, "a".repeat(49));
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe("input value", () => {
      it("replace characters which does not follow the pattern A-Z|0-9", async () => {
        const inputName = screen.getByPlaceholderText("color-primary");
        const inputValue = screen.getByPlaceholderText("#cc0000");
        const submitButton = screen.getByRole("button", { name: /save/i });

        userEvent.type(inputName, "color-primary");
        userEvent.type(inputValue, "/*-)$!%CC0000");
        await waitFor(() => userEvent.click(submitButton));

        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
          {
            id: expect.any(String),
            name: "color-primary",
            type: TokenType.COLOR,
            value: "#CC0000",
          },
        ]);
      });
    });
  });

  it("update token", async () => {
    render(<ColorTokens tokens={tokens} onDelete={jest.fn()} />);

    const editButton = screen.getByRole("button", {
      name: /edit color-dark/i,
    });

    userEvent.hover(screen.getByText("color-dark"));
    await waitFor(() => userEvent.click(editButton));

    const inputName = screen.getByPlaceholderText("color-primary");
    const inputValue = screen.getByPlaceholderText("#cc0000");
    const submitButton = screen.getByRole("button", { name: /save/i });

    expect(inputName).toHaveValue("color-dark");
    expect(inputValue).toHaveValue("222222");

    await waitFor(() =>
      fireEvent.change(inputName, { target: { value: "color-white" } })
    );
    await waitFor(() =>
      fireEvent.change(inputValue, { target: { value: "FFFFFF" } })
    );
    await waitFor(() => userEvent.click(submitButton));

    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
      { ...tokens[0], name: "color-white", value: "#FFFFFF" },
      tokens[1],
      tokens[2],
      tokens[3],
      tokens[4],
      tokens[5],
    ]);
    expect(tokenMessenger.postUpdateColorTokenMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postUpdateColorTokenMessage).toHaveBeenCalledWith({
      id: "99dd84d3-a355-4a3b-a061-6bab7a8bf285",
      name: "color-white",
      type: "color",
      value: "#FFFFFF",
    });
  });
});
