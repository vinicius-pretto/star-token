import * as React from "react";
import tokenMessenger from "../../../messages/tokenMessenger";

const ColorToken = ({ token, onUpdate, onDelete }) => {
  return (
    <div
      key={token.id}
      className="d-flex flex-row align-items-center justify-content-between w-100 color-token-container"
    >
      <button
        className="color-token"
        onClick={() => tokenMessenger.postSetColorTokenMessage(token)}
      >
        <span
          className="mr-md color-token-shape"
          style={{ backgroundColor: token.value }}
        ></span>
        <span>{token.name}</span>
      </button>

      <div className="d-flex flex-row">
        <div
          className="icon-button visibility-hidden"
          role="button"
          aria-label={`Edit ${token.name}`}
          tabIndex={0}
          onClick={() => onUpdate(token)}
        >
          <div className="icon icon--adjust"></div>
        </div>

        <div
          className="icon-button visibility-hidden"
          role="button"
          aria-label={`Delete ${token.name}`}
          tabIndex={0}
          onClick={() => onDelete(token.id)}
        >
          <div className="icon icon--trash"></div>
        </div>
      </div>
    </div>
  );
};

export default ColorToken;
