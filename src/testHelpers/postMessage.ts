import { fireEvent } from "@testing-library/react";
import UiEventType from "../consts/UIEventType";

interface EventMessage {
  type: UiEventType;
  values: any;
}

const postMessage = (eventMessage: EventMessage) => {
  const message = {
    data: {
      pluginMessage: {
        type: eventMessage.type,
        values: eventMessage.values,
      },
    },
  };
  fireEvent(window, new MessageEvent("message", message));
};

export default postMessage;
