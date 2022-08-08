import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { addNewProduct, updateProduct } from "../../redux/apiRequest";
const EditProduct = ({ showEdit, setShowEdit, product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getCateData = useSelector((state) => state.cate.getCategory.category);

  const [id, setID] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [shortDes, setShortDes] = useState(product.shortDes);
  const [image, setImage] = useState(product.image);
  const [categoryName, setCategoryName] = useState(product.categoryName);
  const [size, setSize] = useState([]);
  console.log(typeof image);
  var Sizes = ["s", "m", "l", "xl"];

  const handleClose = (e) => {
    e.preventDefault();
    setShowEdit(false);
    setName("");
    setPrice("");
    setShortDes("");
    setImage(null);
    setCategoryName("");
    setSize("");
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: product.id,
      name: name,
      price: price,
      shortDes: shortDes,
      file: image,
      categoryName: categoryName,
      size: size,
    };

    updateProduct(dispatch, newProduct);
    setID("");
    setName("");
    setPrice("");
    setShortDes("");
    setImage(null);
    setCategoryName("");
    setSize("");
  };
  const handleFileImage = (e) => {
    let file = e.target.files[0];

    setImage(file);
  };
  return (
    <>
      <div className="AddProductContainer">
        <div className="AddProductContent">
          <div className="overlay"></div>
          <div className="edit-content">
            <h2 className="edit-tittle">Edit product</h2>
            <div className="form-group-edit">
              <label>Product ID</label>
              <input type="text" value={id} className="product-input-ad" />
            </div>
            <form method="put" encType="multipart/form-data">
              <div className="form-group-edit">
                <label>Name</label>
                <input
                  value={name}
                  type="text"
                  className="product-input-ad"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group-edit">
                <label>Price</label>
                <input
                  value={price}
                  type="text"
                  className="product-input-ad"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group-edit">
                <label>Category</label>

                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    {getCateData?.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-group-edit">
                <label>Description</label>
                <input
                  type="text"
                  className="product-input-ad"
                  value={shortDes}
                  onChange={(e) => setShortDes(e.target.value)}
                />
              </div>
              <div className="form-group-edit">
                <label>Size</label>
                <div className="product-sizes act_size">
                  {Sizes.map((item, index) => (
                    <div
                      key={index}
                      className={`product__info__item__list__item ${
                        size === item ? "active" : ""
                      }`}
                      onClick={() => setSize(item)}
                    >
                      <span className="product__info__item__list__item__size">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group-edit">
                <label>Image</label>
                <input
                  type="file"
                  // value={image}
                  className="product-input-ad"
                  onChange={handleFileImage}
                />
              </div>
              <div className="form-button-edit">
                <button
                  type="submit"
                  className="btn-add-product"
                  onClick={handleEditProduct}
                >
                  Edit product
                </button>
                <button onClick={handleClose}>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
