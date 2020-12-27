import Token from "../consts/Token";

function getNodeTokens(node: BaseNode): Array<object> {
  try {
    const tokens = node.getPluginData("tokens");
    return JSON.parse(tokens);
  } catch {
    return [];
  }
}

function setNodeToken(node: BaseNode, token: Token) {
  const tokens = getNodeTokens(node)
    .filter((t: Token) => t.id !== token.id)
    .concat(token);

  node.setPluginData("tokens", JSON.stringify(tokens));
}

function findAllNodesByTokenId(tokenId) {
  return figma.currentPage.findAll((node: BaseNode) => {
    const tokens = getNodeTokens(node);
    return tokens.some((token: Token) => token.id === tokenId);
  });
}

function getAllTokens() {
  try {
    const tokens = JSON.parse(figma.root.getPluginData("tokens"));
    return tokens;
  } catch {
    return [];
  }
}

function setAllTokens(tokens: Token[]) {
  figma.root.setPluginData("tokens", JSON.stringify(tokens));
}

export default {
  getNodeTokens,
  setNodeToken,
  findAllNodesByTokenId,
  getAllTokens,
  setAllTokens,
};
