import * as React from "react";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";

const ColorsForm = ({ onSubmit, formik, isModalOpen, onCloseModal }) => {
  const formatToHex = (input: string) => {
    if (input.length === 1) {
      return input.repeat(6);
    }
    if (input.length === 2) {
      return input.repeat(3);
    }
    if (input.length > 2 && input.length < 6) {
      const r = input.charAt(0);
      const g = input.charAt(1);
      const b = input.charAt(2);
      return `${r.repeat(2)}${g.repeat(2)}${b.repeat(2)}`;
    }
    return input;
  };

  const onValueChange = (e) => {
    const input = e.target.value.toUpperCase();
    const inputFiltered = input.replace(/[^A-Z|0-9]/g, "");
    e.target.value = inputFiltered;
    formik.handleChange(e);
  };

  const onValueBlur = (e) => {
    const hexColor = formatToHex(e.target.value);
    formik.setFieldValue("value", hexColor);
    formik.handleBlur(e);
  };

  return (
    <Modal title="Colors" isOpen={isModalOpen} onClose={onCloseModal}>
      <form onSubmit={onSubmit}>
        <Input
          id="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          touched={formik.touched.name}
          placeholder="color-primary"
        />

        <Input
          id="value"
          type="text"
          maxLength={6}
          value={formik.values.value}
          onChange={onValueChange}
          onBlur={onValueBlur}
          error={formik.errors.value}
          touched={formik.touched.value}
          placeholder="#cc0000"
        />

        <div className="d-flex justify-content-end">
          <button type="submit" className="button button--primary">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ColorsForm;
