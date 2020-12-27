import Token from "../consts/Token";
import figmaHelpers from "./figmaHelpers";

const isValidNode = (node: any): boolean => {
  return typeof node.cornerRadius === "number";
};

const setNodeToken = (node: any, token: Token) => {
  if (isValidNode(node)) {
    figmaHelpers.setNodeToken(node, token);
    node.cornerRadius = Number(token.value);
  }
  if (typeof node.cornerRadius === "symbol") {
    if (node.topLeftRadius > 0) {
      figmaHelpers.setNodeToken(node, token);
      node.topLeftRadius = Number(token.value);
    }
    if (node.topRightRadius > 0) {
      figmaHelpers.setNodeToken(node, token);
      node.topRightRadius = Number(token.value);
    }
    if (node.bottomLeftRadius > 0) {
      figmaHelpers.setNodeToken(node, token);
      node.bottomLeftRadius = Number(token.value);
    }
    if (node.bottomRightRadius > 0) {
      figmaHelpers.setNodeToken(node, token);
      node.bottomRightRadius = Number(token.value);
    }
  }
};

const setToken = (token: Token) => {
  figma.currentPage.selection.forEach((node: any) => {
    setNodeToken(node, token);
  });
};

const updateToken = (token: Token) => {
  const nodes = figmaHelpers.findAllNodesByTokenId(token.id);

  nodes.forEach((node: any) => {
    setNodeToken(node, token);
  });
};

export default {
  setToken,
  updateToken,
};
