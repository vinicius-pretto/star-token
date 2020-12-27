import ActionType from "../../consts/ActionType";
import Token from "../../consts/Token";
import tokenMessenger from "../messages/tokenMessenger";

export const storeTokens = (tokens: Token[]) => {
  tokenMessenger.postSetTokensMessage(tokens);

  return {
    type: ActionType.SET_TOKENS,
    payload: tokens,
  };
};
