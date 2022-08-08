import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getAllOrder,
  getOrderDetail,
  updatePendingOrder,
} from "../../redux/apiRequest";

import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { TbNotes, TbNotesOff } from "react-icons/tb";

// import Modal from "@mui/material/Modal";

import Modal from "./Modal";
import OrderDetail from "./OrderDetail";
import "./style.scss";

const Order = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const [showDetailOrder, setShowDetailOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [idDeleteOrder, setIdDeleteOrder] = useState(null);

  const order = useSelector((state) => state.payment.dataOrder);
  const orderDetail = useSelector((state) => state.payment.dataOrderDetail);
  const orderDetailLoading = useSelector(
    (state) => state.payment.orderDetailFetching
  );

  //modal

  const handleOpen = (e, id) => {
    e.preventDefault();
    setIdDeleteOrder(id);
    setShowModal(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    console.log("close modal");
    setShowModal(false);
  };

  useEffect(() => {
    getAllOrder(dispatch);
  }, [dispatch]);

  const [columns, setColumns] = useState([]);
  const [pending, setPending] = React.useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "createdDate",
          selector: (row) => row.createdDate,
          sortable: true,
        },
        {
          name: "code",
          selector: (row) => row.code,
          sortable: true,
        },
        {
          name: "customerPhone",
          selector: (row) => row.customerPhone,
          sortable: true,
        },
        {
          name: "customerName",
          selector: (row) => row.customerName,
          sortable: true,
        },

        {
          name: "customerAddress",
          selector: (row) => row.customerAddress,
          sortable: true,
        },
        {
          name: "Method Payment",
          selector: (row) => row.payment,
          sortable: true,
        },
        {
          name: "Pending",
          selector: (row) => (
            <div
              className="action-order-icon"
              onClick={() => handleUpdatePending(row.id)}
            >
              {row.status ? <TbNotes /> : <TbNotesOff />}
            </div>
          ),

          sortable: true,
        },

        {
          name: "Action",
          cell: (row) => (
            <div className="button-action-orders" style={{ fontSize: "10px" }}>
              <div
                className="action-order-icon"
                onClick={(e) => handleShowDetailOrder(e, row.id)}
              >
                <GrView />
              </div>
              <div
                className="action-order-icon"
                // onClick={(e) => handleDeleteOrder(row.id)}
                onClick={(e) => handleOpen(e, row.id)}
              >
                <AiFillDelete />
              </div>
            </div>
          ),
        },
      ]);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  const handleShowDetailOrder = (e, id) => {
    e.preventDefault();
    setShowDetailOrder(true);
    getOrderDetail(id, dispatch);
  };
  const handleUpdatePending = (id) => {
    updatePendingOrder(id, dispatch);
  };

  return (
    <AdminLayout>
      <DataTable
        scrollWidth
        fixedHeader
        fixedHeaderScrollHeight="600PX"
        progressPending={pending}
        columns={columns}
        data={order}
        pagination
        subHeader
        persistTableHead
        subHeaderComponent={
          <div>
            {/* <input
              type="text"
              className="cc-input form-control"
              placeholder="Search here"
            /> */}
          </div>
        }
      />
      {showModal && (
        <Modal
          showModal={showModal}
          handleClose={handleClose}
          idDeleteOrder={idDeleteOrder}
          setShowModal={setShowModal}
        />
      )}
      {showDetailOrder && (
        <OrderDetail
          showDetailOrder={showDetailOrder}
          setShowDetailOrder={setShowDetailOrder}
          orderDetail={orderDetail}
          orderDetailLoading={orderDetailLoading}
        />
      )}
    </AdminLayout>
  );
};

export default Order;
