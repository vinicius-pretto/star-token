import * as React from "react";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: any;
  children: any;
}

const Modal = ({ title, isOpen, onClose, children }: Props) => {
  return (
    <div id="modal" className={isOpen ? "active" : ""}>
      <div className="modal-dialog">
        <div className="modal-dialog-header">
          <h2 className="section-title">{title}</h2>
          <div
            className="icon-button"
            role="button"
            aria-label="Close"
            tabIndex={0}
            onClick={onClose}
          >
            <div className="icon icon--close"></div>
          </div>
        </div>

        <div className="modal-dialog-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
