import * as React from "react";
import { render } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import configureStore, { initialState } from "./ui/redux/store";

const Providers = ({ children, state }) => {
  return (
    <ReduxProvider store={configureStore(state)}>{children}</ReduxProvider>
  );
};

const customRender = (ui, state = initialState) => {
  const options = {
    wrapper: (props) => <Providers {...props} state={state} />,
  };
  return render(ui, options);
};

export * from "@testing-library/react";
export { customRender as render };
