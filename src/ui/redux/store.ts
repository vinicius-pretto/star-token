import { createStore } from "redux";
import ActionType from "../../consts/ActionType";
import Token from "../../consts/Token";

interface ReduxAction {
  type: string;
  payload: any;
}

export interface AppState {
  tokens: Token[];
}

export const initialState: AppState = {
  tokens: [],
};

const configureStore = (preloadedState = initialState) => {
  const tokens = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
      case ActionType.SET_TOKENS:
        return {
          ...state,
          tokens: action.payload,
        };
      default:
        return state;
    }
  };

  const store = createStore(tokens, preloadedState);
  return store;
};

export default configureStore;
