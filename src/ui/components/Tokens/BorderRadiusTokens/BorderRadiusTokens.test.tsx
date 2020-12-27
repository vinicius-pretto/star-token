import * as React from "react";
import _ from "lodash";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import { render, screen, waitFor } from "../../../../testUtils";
import BorderRadiusTokens from "./BorderRadiusTokens";
import tokens from "../../../../testData/tokens";
import tokenMessenger from "../../../messages/tokenMessenger";
import TokenType from "../../../../consts/TokenType";
import EventType from "../../../../consts/EventType";

jest.mock("../../../messages/tokenMessenger");

describe("BorderRadiusTokens", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("snapshot", () => {
    it("no color tokens", () => {
      const { asFragment } = render(
        <BorderRadiusTokens tokens={[]} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("with color tokens", () => {
      const { asFragment } = render(
        <BorderRadiusTokens tokens={tokens} onDelete={jest.fn()} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("form validation", () => {
    beforeEach(() => {
      render(<BorderRadiusTokens tokens={[]} onDelete={jest.fn()} />);

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
        const inputName = screen.getByPlaceholderText("border-radius-base");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage =
          "Must start with a letter and contain only letters, numbers, hyphens (-), and underscores (_)";

        userEvent.type(inputName, "-/*+");
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });

      it("display error when length is greather than 48 characters", async () => {
        const inputName = screen.getByPlaceholderText("border-radius-base");
        const submitButton = screen.getByRole("button", { name: /save/i });
        const errorMessage = "Maximum 48 characters";

        userEvent.type(inputName, "a".repeat(49));
        await waitFor(() => userEvent.click(submitButton));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    describe("input value", () => {
      it("replace characters which does not follow the pattern A-Z|0-9", async () => {
        const inputName = screen.getByPlaceholderText("border-radius-base");
        const inputValue = screen.getByPlaceholderText("4");
        const submitButton = screen.getByRole("button", { name: /save/i });

        userEvent.type(inputName, "border-radius-base");
        userEvent.type(inputValue, "/*aZ*/-)$!%4");
        await waitFor(() => userEvent.click(submitButton));

        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
        expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith([
          {
            id: expect.any(String),
            name: "border-radius-base",
            type: TokenType.BORDER_RADIUS,
            value: "4",
          },
        ]);
      });
    });
  });

  it("update token", async () => {
    render(<BorderRadiusTokens tokens={tokens} onDelete={jest.fn()} />);

    const editButton = screen.getByRole("button", {
      name: /edit border-radius-base/i,
    });

    userEvent.hover(screen.getByText("border-radius-base"));
    await waitFor(() => userEvent.click(editButton));

    const inputName = screen.getByPlaceholderText("border-radius-base");
    const inputValue = screen.getByPlaceholderText("4");
    const submitButton = screen.getByRole("button", { name: /save/i });

    expect(inputName).toHaveValue("border-radius-base");
    expect(inputValue).toHaveValue("4");

    await waitFor(() =>
      fireEvent.change(inputName, { target: { value: "border-radius-md" } })
    );
    await waitFor(() =>
      fireEvent.change(inputValue, { target: { value: "6" } })
    );
    await waitFor(() => userEvent.click(submitButton));

    const tokensCopy = _.cloneDeep(tokens);
    const index = _.findIndex(tokensCopy, [
      "id",
      "2c679ec4-f439-4044-a4c3-fc5275e66af2",
    ]);
    const tokenUpdated = {
      id: "2c679ec4-f439-4044-a4c3-fc5275e66af2",
      type: TokenType.BORDER_RADIUS,
      name: "border-radius-md",
      value: "6",
    };
    tokensCopy.splice(index, 1, tokenUpdated);

    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postSetTokensMessage).toHaveBeenCalledWith(
      tokensCopy
    );
    expect(tokenMessenger.postMessage).toHaveBeenCalledTimes(1);
    expect(tokenMessenger.postMessage).toHaveBeenCalledWith({
      type: EventType.UPDATE_BORDER_RADIUS_TOKEN,
      payload: tokenUpdated,
    });
  });
});
