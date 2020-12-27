import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import UiEventType from "../../consts/UIEventType";
import tokenMessenger from "../messages/tokenMessenger";
import Tokens from "./Tokens/Tokens";
import Navbar from "./Navbar/Navbar";
import Tab from "../../consts/Tab";
import TokensClipboard from "./TokensClipboard";
import ActionType from "../../consts/ActionType";

const App = () => {
  const dispatch = useDispatch();
  const [tabSelected, setTabSelected] = React.useState(Tab.TOKENS);

  React.useEffect(() => {
    tokenMessenger.postGetTokensMessage();

    window.onmessage = (e) => {
      const { type, values } = e.data.pluginMessage;

      if (type === UiEventType.GET_TOKENS) {
        dispatch({ type: ActionType.SET_TOKENS, payload: values });
      }
    };
  }, []);

  const onDeleteToken = (tokenId: string) => {
    tokenMessenger.postDeleteTokenMessage(tokenId);
    tokenMessenger.postGetTokensMessage();
  };

  return (
    <>
      <Navbar
        onClick={(tab: Tab) => setTabSelected(tab)}
        tabSelected={tabSelected}
      />

      <main>
        {tabSelected === Tab.TOKENS ? (
          <Tokens onDelete={onDeleteToken} />
        ) : (
          <TokensClipboard tokensFormat={tabSelected} />
        )}
      </main>
    </>
  );
};

export default App;
