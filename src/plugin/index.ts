import subscriber from "./subscriber";

const uiOptions: ShowUIOptions = {
  width: 400,
  height: 600,
};

figma.showUI(__html__, uiOptions);

figma.ui.onmessage = subscriber.handleEvents;
