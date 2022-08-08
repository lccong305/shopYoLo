import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import { addNewProduct } from "../../redux/apiRequest";
import "./style.scss";
const AddProduct = ({ showAddProduct, setShowAddProduct }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(null);
  const [price, setPrice] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [size, setSize] = useState([]);
  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState("");

  const getCateData = useSelector((state) => state.cate.getCategory.category);

  var Sizes = ["s", "m", "l", "xl"];

  const handleClose = (e) => {
    e.preventDefault();

    setName("");
    setPrice("");
    setShortDes("");
    setImage(null);
    setCategoryName("");
    setSize("");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      name: name,
      price: price,
      shortDes: shortDes,
      file: image,
      categoryName: categoryName,
      size: size,
      quantity: qty,
      discount: discount,
    };

    // console.log(newProduct);
    addNewProduct(history, dispatch, newProduct);
    setName("");
    setPrice("");
    setShortDes("");
    setImage(null);
    setCategoryName("");
    setSize("");
    setQty("");
    setDiscount("");
  };

  return (
    <>
      <div className="AddProductContainer">
        <div className="AddProductContent">
          <div className="overlay"></div>
          <div className="edit-content">
            <h2 className="edit-tittle">Add Product</h2>
            <form method="put" encType="multipart/form-data">
              <div className="form-group-edit">
                <label>Product Name</label>
                <input
                  type="text"
                  value={name}
                  className="product-input-ad"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group-edit">
                <label>Price</label>
                <input
                  type="text"
                  className="product-input-ad"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group-edit">
                <label>Quantity</label>
                <input
                  type="text"
                  className="product-input-ad"
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
              <div className="form-group-edit">
                <label>Discount</label>
                <input
                  type="text"
                  className="product-input-ad"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="form-group-edit">
                <label>Category</label>

                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
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
                  className="product-input-ad"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="form-button-edit">
                <button
                  type="submit"
                  className="btn-add-product"
                  onClick={handleAddProduct}
                >
                  Add product
                </button>
                <button onClick={() => setShowAddProduct(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
