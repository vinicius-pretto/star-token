import FigmaNodeType from "../consts/FigmaNodeType";
import Token from "../consts/Token";
import figmaHelpers from "./figmaHelpers";

const isValidNode = (node: any): boolean => {
  return node.type === FigmaNodeType.TEXT;
};

const setNodeToken = async (node: any, token: Token) => {
  if (isValidNode(node)) {
    await figma.loadFontAsync(node.fontName);
    figmaHelpers.setNodeToken(node, token);
    node.fontSize = Number(token.value);
  }
};

const setToken = (token: Token) => {
  figma.currentPage.selection.forEach((node: any) => {
    setNodeToken(node, token);
  });
};

const updateToken = (token: Token) => {
  const nodes = figmaHelpers.findAllNodesByTokenId(token.id);

  nodes.forEach(async (node: any) => {
    setNodeToken(node, token);
  });
};

export default {
  setToken,
  updateToken,
};
