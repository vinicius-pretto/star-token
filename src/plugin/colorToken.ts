import { hexToFigmaRGB } from "@figma-plugin/helpers";
import Token from "../consts/Token";
import figmaHelpers from "./figmaHelpers";

const isValidNode = (node: any): boolean => {
  return node.fills && node.fills[0];
};

const setStyle = (node: any, value: string) => {
  const fills = [
    {
      ...node.fills[0],
      color: hexToFigmaRGB(value),
    },
  ];
  node.fills = fills;
};

const setNodeToken = (node: any, token: Token) => {
  if (isValidNode(node)) {
    figmaHelpers.setNodeToken(node, token);
    setStyle(node, token.value);
  }
};

const setToken = (token: Token) => {
  figma.currentPage.selection.forEach((node: any) => {
    setNodeToken(node, token);
  });
};

const updateToken = (token: Token) => {
  const nodes = figmaHelpers.findAllNodesByTokenId(token.id);

  nodes.forEach((node: BaseNode) => {
    setNodeToken(node, token);
  });
};

export default {
  setToken,
  updateToken,
};
