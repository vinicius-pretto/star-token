import _set from "lodash/set";
import Token from "../../consts/Token";
import TokensFormat from "../../consts/TokensFormat";
import TokenType from "../../consts/TokenType";

const UNIT_LENGTH = "px";

const parseToCSS = (tokens: Token[]) => {
  const cssTokens = tokens
    .map((token: Token) => `  --${token.name}: ${token.value};`)
    .join("\n");

  return `:root {\n${cssTokens}\n}`;
};

const parseToSCSS = (tokens: Token[]) => {
  return tokens
    .map((token: Token) => `$${token.name}: ${token.value};`)
    .join("\n");
};

const parseToJSON = (tokens: Token[]) => {
  let jsonTokens = {};

  tokens.forEach((token: Token) => {
    _set(jsonTokens, token.name, token.value);
  });
  return JSON.stringify(jsonTokens, null, 2);
};

const formatTokens = (tokens: Token[]) => {
  const tokensTypeWithUnitLength = [
    TokenType.FONT_SIZE,
    TokenType.BORDER_RADIUS,
  ];

  return tokens.map((token: Token) => {
    if (tokensTypeWithUnitLength.includes(token.type)) {
      return {
        ...token,
        value: `${token.value}${UNIT_LENGTH}`,
      };
    }
    return token;
  });
};

const parse = (tokens: Token[], tokensFormat: TokensFormat) => {
  const tokensFormatted = formatTokens(tokens);

  if (tokensFormat === TokensFormat.CSS) {
    return parseToCSS(tokensFormatted);
  }
  if (tokensFormat === TokensFormat.SCSS) {
    return parseToSCSS(tokensFormatted);
  }
  if (tokensFormat === TokensFormat.JSON) {
    return parseToJSON(tokensFormatted);
  }
  return tokensFormatted;
};

export default {
  parse,
};
