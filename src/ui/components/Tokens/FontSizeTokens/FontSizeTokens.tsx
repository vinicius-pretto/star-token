import * as React from "react";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import Token from "../../../../consts/Token";
import FontSizeToken from "./FontSizeToken";
import FontSizeForm from "./FontSizeForm";
import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import TokenType from "../../../../consts/TokenType";
import { storeTokens } from "../../../redux/actions";
import tokenMessenger from "../../../messages/tokenMessenger";
import EventType from "../../../../consts/EventType";

const FontSizeTokens = ({ tokens, onDelete }) => {
  const fontSizeTokens = tokens.filter(
    (token: Token) => token.type === TokenType.FONT_SIZE
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tokenSelected, setTokenSelected] = React.useState({});
  const initialValues = {
    name: "",
    value: "",
  };

  const onSubmit = (values) => {
    if (!_isEmpty(tokenSelected)) {
      const tokenUpdated = {
        ...tokenSelected,
        name: values.name,
        value: values.value,
      };
      updateToken(tokenUpdated);
      return;
    }
    const token = {
      id: uuid(),
      type: TokenType.FONT_SIZE,
      name: values.name,
      value: values.value,
    };
    const tokensUpdated = tokens.concat(token);

    onCloseModal();
    clearFields();
    dispatch(storeTokens(tokensUpdated));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const clearFields = () => {
    setTokenSelected({});
    formik.resetForm();
  };

  const onCreate = () => {
    clearFields();
    onOpenModal();
  };

  const onUpdateToken = (token: Token) => {
    const values = { name: token.name, value: token.value };
    onOpenModal();
    formik.setValues(values);
    setTokenSelected(token);
  };

  const updateToken = (token) => {
    const tokensCopy = _cloneDeep(tokens);
    const index = _findIndex(tokensCopy, ["id", token.id]);
    tokensCopy.splice(index, 1, token);

    dispatch(storeTokens(tokensCopy));
    clearFields();
    onCloseModal();
    tokenMessenger.postMessage({
      type: EventType.UPDATE_FONT_SIZE_TOKEN,
      payload: token,
    });
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="border-bottom p-sm">
      <div className="tokens-section-header">
        <h3 className="section-title">Font Size</h3>

        <div
          className="icon-button"
          role="button"
          aria-label="Add token"
          tabIndex={0}
          onClick={onCreate}
          data-testid="add-token-btn"
        >
          <div className="icon icon--plus"></div>
        </div>
      </div>

      {_isEmpty(fontSizeTokens) ? (
        <p className="label my-0">No font size tokens</p>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {fontSizeTokens.map((token: Token) => (
            <FontSizeToken
              key={token.id}
              token={token}
              onUpdate={onUpdateToken}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <FontSizeForm
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        formik={formik}
      />
    </section>
  );
};

export default FontSizeTokens;
