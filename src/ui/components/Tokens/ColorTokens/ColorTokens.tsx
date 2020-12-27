import * as React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import Token from "../../../../consts/Token";
import ColorToken from "./ColorToken";
import TokenType from "../../../../consts/TokenType";
import ColorsForm from "./ColorsForm";
import validationSchema from "./validationSchema";
import tokenMessenger from "../../../messages/tokenMessenger";
import { storeTokens } from "../../../redux/actions";

const ColorTokens = ({ tokens, onDelete }) => {
  const colorTokens = tokens.filter(
    (token: Token) => token.type === TokenType.COLOR
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
        value: `#${values.value}`,
      };
      updateToken(tokenUpdated);
      return;
    }

    const token = {
      id: uuid(),
      type: TokenType.COLOR,
      name: values.name,
      value: `#${values.value}`,
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

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const clearFields = () => {
    setTokenSelected({});
    formik.resetForm();
  };

  const onCreate = () => {
    clearFields();
    onOpenModal();
  };

  const onUpdateToken = (token: Token) => {
    const values = { name: token.name, value: token.value.slice(1, 7) };
    onOpenModal();
    formik.setValues(values);
    setTokenSelected(token);
  };

  const updateToken = (token) => {
    const colorTokensCopy = _cloneDeep(tokens);
    const index = _findIndex(colorTokensCopy, ["id", token.id]);
    colorTokensCopy.splice(index, 1, token);

    dispatch(storeTokens(colorTokensCopy));
    clearFields();
    onCloseModal();
    tokenMessenger.postUpdateColorTokenMessage(token);
  };

  return (
    <section className="border-bottom p-sm">
      <div className="tokens-section-header">
        <h3 className="section-title">Colors</h3>

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

      {_isEmpty(colorTokens) ? (
        <p className="label my-0">No color tokens</p>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {colorTokens.map((token: Token) => (
            <ColorToken
              key={token.id}
              token={token}
              onUpdate={onUpdateToken}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <ColorsForm
        onSubmit={formik.handleSubmit}
        formik={formik}
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
      />
    </section>
  );
};

export default ColorTokens;
