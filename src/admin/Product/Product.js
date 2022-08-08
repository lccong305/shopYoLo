import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/";

import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getDetailProduct } from "../../redux/apiRequest";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

import { AiOutlineDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";

const Product = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.pending);
  const product = useSelector((state) => state.products.product); //detail

  const [columns, setColumns] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "price",
          selector: (row) => row.price,
          sortable: true,
        },
        {
          name: "shortDes",
          selector: (row) => row.shortDes,
          sortable: true,
        },
        {
          name: "image",
          width: "100px",
          height: "100px",
          selector: (row) => <img src={row.image} />,
          sortable: true,
        },
        {
          name: "categoryName",

          selector: (row) => row.categoryName,
          sortable: true,
        },
        {
          name: "sizes",
          selector: (row) =>
            row.sizes.map((item, idx) => (
              <div className="product_size" key={idx}>
                <span className="product_size_item">{item}</span>
              </div>
            )),
        },
        {
          name: "Action",
          cell: (row) => (
            <div className="button-action-product">
              <button
                onClick={(e) => handleEdit(e, row.code)}
                className="btn-edit-product-admin btn btn-primary"
              >
                <GrEdit />
              </button>
              <button
                onClick={(e) => handleDelete(e, row.id)}
                className="btn-edit-product-admin btn btn-primary"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ),
        },
      ]);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteProduct(dispatch, id);
  };

  const handleAdd = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleEdit = (e, slug) => {
    e.preventDefault();
    setShowEdit(!showEdit);
    getDetailProduct(dispatch, slug);
  };

  function handleClose() {
    setOpen(false);
  }

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
  }, [filterText, resetPaginationToggle]);

  return (
    <AdminLayout>
      {loading ? "isLoading" : ""}
      <DataTable
        fixedHeader
        fixedHeaderScrollHeight="500PX"
        progressPending={pending}
        columns={columns}
        data={products}
        pagination
        subHeader
        persistTableHead
        subHeaderComponent={
          <div>
            <button
              onClick={() => handleAdd()}
              className="btn.btn-sm btn-info add-product"
            >
              Add new product
            </button>
            {/* <input
              type="text"
              className="cc-input form-control"
              placeholder="Search here"
            /> */}
          </div>
        }
      />
      {showAddProduct && (
        <AddProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
        />
      )}
      {showEdit && (
        <EditProduct
          product={product}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
        />
      )}
    </AdminLayout>
  );
};

export default Product;
