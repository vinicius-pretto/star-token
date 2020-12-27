import EventType from "../consts/EventType";
import UiEventType from "../consts/UIEventType";
import figmaHelpers from "./figmaHelpers";
import colorToken from "./colorToken";
import fontSizeToken from "./fontSizeToken";
import borderRadiusToken from "./borderRadiusToken";
import Token from "../consts/Token";

function setNodeTokens(node: BaseNode, tokens: any) {
  node.setPluginData("tokens", JSON.stringify(tokens));
}

const handleEvents = (msg) => {
  switch (msg.type) {
    case EventType.GET_TOKENS:
      figma.ui.postMessage({
        type: UiEventType.GET_TOKENS,
        values: figmaHelpers.getAllTokens(),
      });
      return;

    case EventType.SET_TOKENS:
      figmaHelpers.setAllTokens(msg.tokens);
      return;

    case EventType.DELETE_TOKEN:
      const nodes = figma.currentPage.findAll((node: BaseNode) => {
        const tokens = figmaHelpers.getNodeTokens(node);
        return tokens.some((token: Token) => token.id === msg.tokenId);
      });

      nodes.forEach((node: BaseNode) => {
        const tokens = figmaHelpers.getNodeTokens(node);
        const tokensUpdated = tokens.filter(
          (token: Token) => token.id !== msg.tokenId
        );
        setNodeTokens(node, tokensUpdated);
      });

      const allTokens = figmaHelpers.getAllTokens();
      const allTokensUpdated = allTokens.filter(
        (token: Token) => token.id !== msg.tokenId
      );

      figmaHelpers.setAllTokens(allTokensUpdated);
      return;

    // Colors
    case EventType.SET_COLOR_TOKEN:
      colorToken.setToken(msg.token);
      return;

    case EventType.UPDATE_COLOR_TOKEN:
      colorToken.updateToken(msg.token);
      return;

    // Font Sizes
    case EventType.SET_FONT_SIZE_TOKEN:
      fontSizeToken.setToken(msg.payload);
      return;

    case EventType.UPDATE_FONT_SIZE_TOKEN:
      fontSizeToken.updateToken(msg.payload);
      return;

    // Border Radius
    case EventType.SET_BORDER_RADIUS_TOKEN:
      borderRadiusToken.setToken(msg.payload);
      return;

    case EventType.UPDATE_BORDER_RADIUS_TOKEN:
      borderRadiusToken.updateToken(msg.payload);
      return;

    default:
      figma.closePlugin();
      return;
  }
};

export default {
  handleEvents,
};
