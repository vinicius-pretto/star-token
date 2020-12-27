import * as React from "react";
import _ from "lodash";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import { render, screen, waitFor } from "../../../../testUtils";
import FontSizeTokens from "./FontSizeTokens";
import tokens from "../../../../testData/tokens";
import tokenMessenger from "../../../messages/tokenMessenger";
import TokenType from "../../../../consts/TokenType";
import EventType from "../../../../consts/EventType";

jest.mock("../../../messages/tokenMessenger");

describe("FontSizeTokens", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("snapshot", () => {
    it("no color tokens", () => {
      const { asFragment } = render(
        <FontSizeTokens tokens={[]} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("with color tokens", () => {
      const { asFragment } = render(
        <FontSizeTokens tokens={tokens} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("form validation", () => {
    beforeEach(() => {
      render(<FontSizeTokens tokens={[]} onDelete={jest.fn()} />);

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
        const inputName = screen.getByPlaceholderText("font-size-base");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage =
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)";

        userEvent.type(inputName, "-/*+");
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      it("display error when length is greather than 48 characters", async () => {
        const inputName = screen.getByPlaceholderText("font-size-base");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage = "Maximum 48 characters";

        userEvent.type(inputName, "a".repeat(49));
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe("input value", () => {
      it("replace characters which does not follow the pattern A-Z|0-9", async () => {
        const inputName = screen.getByPlaceholderText("font-size-base");
        const inputValue = screen.getByPlaceholderText("16");
        const submitButton = screen.getByRole("button", { name: /save/i });

        userEvent.type(inputName, "font-size-base");
        userEvent.type(inputValue, "/*aZ*/-)$!%16");
        await waitFor(() => userEvent.click(submitButton));

        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
          {
            id: expect.any(String),
            name: "font-size-base",
            type: TokenType.FONT_SIZE,
            value: "16",
          },
        ]);
      });
    });
  });

  it("update token", async () => {
    render(<FontSizeTokens tokens={tokens} onDelete={jest.fn()} />);

    const editButton = screen.getByRole("button", {
      name: /edit font-size-base/i,
    });

    userEvent.hover(screen.getByText("font-size-base"));
    await waitFor(() => userEvent.click(editButton));

    const inputName = screen.getByPlaceholderText("font-size-base");
    const inputValue = screen.getByPlaceholderText("16");
    const submitButton = screen.getByRole("button", { name: /save/i });

    expect(inputName).toHaveValue("font-size-base");
    expect(inputValue).toHaveValue("16");

    await waitFor(() =>
      fireEvent.change(inputName, { target: { value: "font-size-md" } })
    );
    await waitFor(() =>
      fireEvent.change(inputValue, { target: { value: "18" } })
    );
    await waitFor(() => userEvent.click(submitButton));

    const tokensCopy = _.cloneDeep(tokens);
    const index = _.findIndex(tokensCopy, [
      "id",
      "6552cefb-8e70-43ba-b6c7-432a8b8aa591",
    ]);
    const tokenUpdated = {
      id: "6552cefb-8e70-43ba-b6c7-432a8b8aa591",
      type: TokenType.FONT_SIZE,
      name: "font-size-md",
      value: "18",
    };
    tokensCopy.splice(index, 1, tokenUpdated);

    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith(
      tokensCopy
    );
    expect(tokenMessenger.postMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postMessage).toHaveBeenCalledWith({
      type: EventType.UPDATE_FONT_SIZE_TOKEN,
      payload: tokenUpdated,
    });
  });
});
