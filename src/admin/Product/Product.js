import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/";

import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getDetailProduct } from "../../redux/apiRequest";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

import { AiFillEye, AiFillEyeInvisible, AiOutlineDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Product = () => {
  const dispatch = useDispatch();
  const [productO, setProductO] = useState([]);

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.pending);
  const product = useSelector((state) => state.products.product); //detail

  console.log({ products });

  const [columns, setColumns] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setColumns([
  //       {
  //         name: "Name",
  //         selector: (row) => row.name,
  //         sortable: true,
  //       },
  //       {
  //         name: "price",
  //         selector: (row) => row.price,
  //         sortable: true,
  //       },
  //       {
  //         name: "shortDes",
  //         selector: (row) => row.shortDes,
  //         sortable: true,
  //       },
  //       {
  //         name: "image",
  //         width: "100px",
  //         height: "100px",
  //         selector: (row) => <img src={row.image} />,
  //         sortable: true,
  //       },
  //       {
  //         name: "categoryName",

  //         selector: (row) => row.categoryName,
  //         sortable: true,
  //       },
  //       {
  //         name: "sizes",
  //         selector: (row) =>
  //           row.sizes.map((item, idx) => (
  //             <div className="product_size" key={idx}>
  //               <span className="product_size_item">{item}</span>
  //             </div>
  //           )),
  //       },
  //       {
  //         name: "Action",
  //         cell: (row) => (
  //           <div className="button-action-product">
  //             <button
  //               onClick={(e) => handleEdit(e, row.code)}
  //               className="btn-edit-product-admin btn btn-primary"
  //             >
  //               <GrEdit />
  //             </button>
  //             <button
  //               onClick={(e) => handleDelete(e, row.id)}
  //               className="btn-edit-product-admin btn btn-primary"
  //             >
  //               <AiOutlineDelete />
  //             </button>
  //           </div>
  //         ),
  //       },
  //     ]);
  //     setPending(false);
  //   }, 2000);
  //   return () => clearTimeout(timeout);
  // }, []);

  const fetchData = async () => {
    const res = await axios.get("https://yoloshopapi.herokuapp.com/Product");
    setProductO(res.data);
    console.log("first");
  };
  const handleDelete = (id) => {
    // e.preventDefault();
    alert(id);
    console.log(typeof id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await deleteProduct(dispatch, id);
        fetchData();
        try {
          let _id = JSON.stringify(id);
          await axios({
            method: "DELETE",
            url: "https://yoloshopapi.herokuapp.com/Product",
            data: _id,
            headers: { "Content-Type": "application/json" },
          }).then((res) => {
            fetchData();
          });
        } catch (err) {
          console.log(err);
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleAdd = () => {
    setShowAddProduct(!showAddProduct);
  };

  const handleEdit = (slug) => {
    document.querySelector("body").classList.add("add-modal");
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

  useEffect(() => {
    fetchData();
  }, []);
  console.log(productO);

  const tableRef = useRef();
  useEffect(() => {
    document.querySelector("body").classList.add("add-modal");

    return () => {
      document.querySelector("body").classList.remove("add-modal");
    };
  }, []);

  return (
    <AdminLayout>
      {loading ? "isLoading" : ""}
      {/* <DataTable
        fixedHeader
        fixedHeaderScrollHeight="500PX"
        progressPending={pending}
        columns={columns}
        data={productO}
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
          </div>
        }
      /> */}

      <button onClick={handleAdd}>Add Product</button>
      <div
        style={{
          height: "90vh",
          overflow: "hidden",
          scrollBehavior: "auto",
          overflow: "scroll",
        }}
        ref={tableRef}
      >
        <table>
          <thead>
            <tr>
              <th className="th-heading">Name</th>
              <th className="th-heading">Image</th>
              <th className="th-heading">Price</th>
              <th className="th-heading">Description</th>
              <th className="th-heading">Quantity</th>
              <th className="th-heading">Discount</th>
              <th className="th-heading">Category</th>
              <th className="th-heading">Size</th>
              <th className="th-heading">Status</th>
              <th className="th-heading" style={{ width: "7%" }}>
                Action
              </th>
            </tr>
          </thead>
          {productO.length > 0 &&
            productO?.map((item) => (
              <tbody>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td style={{ width: "100px", height: "100px" }}>
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.price}</td>
                  <td>{item.shortDes}</td>
                  <td>{item.quantity}</td>
                  <td>{item.discount}</td>
                  <td>{item.categoryName}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0 5px" }}>
                      {item.sizes.map((item) => (
                        <div
                          style={{
                            display: "inline-flex",
                            width: "30px",
                            height: "30px",
                            border: "1px solid",
                            borderRadius: "100rem",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "30px", textAlign: "center" }}>
                      {item.status ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                  </td>
                  <td style={{ width: "100px" }}>
                    <div
                      style={{ fontSize: "24px", display: "flex", gap: "10px" }}
                    >
                      <div onClick={() => handleDelete(item.id)}>
                        <MdDeleteForever />
                      </div>
                      <div onClick={() => handleEdit(item.code)}>
                        <BiEdit />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      {showAddProduct && (
        <AddProduct
          fetchData={fetchData}
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
