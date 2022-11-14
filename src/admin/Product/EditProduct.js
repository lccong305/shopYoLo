import React, { useState } from "react";

import { BiEdit } from "react-icons/bi";
import FormEdit from "./FormEdit";
import "./style.scss";
const EditProduct = ({ product }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <div onClick={handleShow}>
        <BiEdit />
      </div>
      {show && <FormEdit product={product} setShow={setShow} />}
    </>
  );
};

export default EditProduct;
