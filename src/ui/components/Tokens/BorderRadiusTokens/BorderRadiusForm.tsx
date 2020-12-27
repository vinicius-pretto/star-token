import * as React from "react";
import Input from "../../Input/Input";
import Modal from "../../Modal/Modal";

const BorderRadiusForm = ({ isModalOpen, onCloseModal, formik }) => {
  const onValueChange = (e) => {
    const input = e.target.value;
    const inputFiltered = input.replace(/[^0-9]/g, "");
    e.target.value = inputFiltered;
    formik.handleChange(e);
  };

  return (
    <Modal title="Border Radius" isOpen={isModalOpen} onClose={onCloseModal}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          touched={formik.touched.name}
          placeholder="border-radius-base"
        />

        <Input
          id="value"
          type="text"
          maxLength={6}
          value={formik.values.value}
          onChange={onValueChange}
          error={formik.errors.value}
          touched={formik.touched.value}
          placeholder="4"
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

export default BorderRadiusForm;
