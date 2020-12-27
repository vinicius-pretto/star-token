import EventType from "../consts/EventType";
import UiEventType from "../consts/UIEventType";
import subscriber from "./subscriber";
import tokens from "../testData/tokens";
import TokenType from "../consts/TokenType";
import colorToken from "./colorToken";
import fontSizeToken from "./fontSizeToken";
import borderRadiusToken from "./borderRadiusToken";

jest.mock("./colorToken", () => {
  return {
    setToken: jest.fn(),
    updateToken: jest.fn(),
  };
});

jest.mock("./fontSizeToken", () => {
  return {
    setToken: jest.fn(),
    updateToken: jest.fn(),
  };
});

jest.mock("./borderRadiusToken", () => {
  return {
    setToken: jest.fn(),
    updateToken: jest.fn(),
  };
});

describe("subscriber", () => {
  const tokenColor = {
    id: "99dd84d3-a355-4a3b-a061-6bab7a8bf285",
    type: TokenType.COLOR,
    name: "color-dark",
    value: "#222222",
  };
  const node = {
    fills: [
      {
        color: {
          r: 0,
          g: 0,
          b: 0,
        },
      },
    ],
  };
  const figma = {
    currentPage: {
      selection: [node],
    },
    root: {
      getPluginData: jest.fn(),
      setPluginData: jest.fn(),
    },
    ui: {
      postMessage: jest.fn(),
    },
    closePlugin: jest.fn(),
  };
  // @ts-ignore
  window.figma = figma;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`eventType "${EventType.GET_TOKENS}"`, () => {
    const message = {
      type: EventType.GET_TOKENS,
      payload: {},
    };

    figma.root.getPluginData.mockReturnValue(JSON.stringify(tokens));
    subscriber.handleEvents(message);

    expect(figma.ui.postMessage).toHaveBeenCalledTimes(1);
    expect(figma.ui.postMessage).toHaveBeenCalledWith({
      type: UiEventType.GET_TOKENS,
      values: tokens,
    });
  });

  it(`eventType "${EventType.SET_TOKENS}"`, () => {
    const message = {
      type: EventType.SET_TOKENS,
      tokens,
    };

    subscriber.handleEvents(message);

    expect(figma.root.setPluginData).toHaveBeenCalledTimes(1);
    expect(figma.root.setPluginData).toHaveBeenCalledWith(
      "tokens",
      JSON.stringify(tokens)
    );
  });

  it(`eventType "${EventType.SET_COLOR_TOKEN}"`, () => {
    const message = {
      type: EventType.SET_COLOR_TOKEN,
      token: tokenColor,
    };

    subscriber.handleEvents(message);

    expect(colorToken.setToken).toHaveBeenCalledTimes(1);
    expect(colorToken.setToken).toHaveBeenCalledWith(tokenColor);
  });

  it(`eventType "${EventType.UPDATE_COLOR_TOKEN}"`, () => {
    const message = {
      type: EventType.UPDATE_COLOR_TOKEN,
      token: tokenColor,
    };

    subscriber.handleEvents(message);

    expect(colorToken.updateToken).toHaveBeenCalledTimes(1);
    expect(colorToken.updateToken).toHaveBeenCalledWith(tokenColor);
  });

  it(`eventType "${EventType.SET_FONT_SIZE_TOKEN}"`, () => {
    const token = {
      id: "6552cefb-8e70-43ba-b6c7-432a8b8aa591",
      type: TokenType.FONT_SIZE,
      name: "font-size-base",
      value: "16",
    };
    const message = {
      type: EventType.SET_FONT_SIZE_TOKEN,
      payload: token,
    };

    subscriber.handleEvents(message);

    expect(fontSizeToken.setToken).toHaveBeenCalledTimes(1);
    expect(fontSizeToken.setToken).toHaveBeenCalledWith(token);
  });

  it(`eventType "${EventType.UPDATE_FONT_SIZE_TOKEN}"`, () => {
    const token = {
      id: "6552cefb-8e70-43ba-b6c7-432a8b8aa591",
      type: TokenType.FONT_SIZE,
      name: "font-size-base",
      value: "16",
    };
    const message = {
      type: EventType.UPDATE_FONT_SIZE_TOKEN,
      payload: token,
    };

    subscriber.handleEvents(message);

    expect(fontSizeToken.updateToken).toHaveBeenCalledTimes(1);
  });

  it(`eventType "${EventType.SET_BORDER_RADIUS_TOKEN}"`, () => {
    const token = {
      id: "2c679ec4-f439-4044-a4c3-fc5275e66af2",
      type: TokenType.BORDER_RADIUS,
      name: "border-radius-base",
      value: "4",
    };
    const message = {
      type: EventType.SET_BORDER_RADIUS_TOKEN,
      payload: token,
    };

    subscriber.handleEvents(message);

    expect(borderRadiusToken.setToken).toHaveBeenCalledTimes(1);
    expect(borderRadiusToken.setToken).toHaveBeenCalledWith(token);
  });

  it(`eventType: "${EventType.UPDATE_BORDER_RADIUS_TOKEN}"`, () => {
    const token = {
      id: "2c679ec4-f439-4044-a4c3-fc5275e66af2",
      type: TokenType.BORDER_RADIUS,
      name: "border-radius-base",
      value: "4",
    };
    const message = {
      type: EventType.UPDATE_BORDER_RADIUS_TOKEN,
      payload: token,
    };

    subscriber.handleEvents(message);

    expect(borderRadiusToken.updateToken).toHaveBeenCalledTimes(1);
    expect(borderRadiusToken.updateToken).toHaveBeenCalledWith(token);
  });
});
