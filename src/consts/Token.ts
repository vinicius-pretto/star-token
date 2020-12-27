import TokenType from "./TokenType";

interface Token {
  id: string;
  type: TokenType;
  name: string;
  value: string;
}

export default Token;
