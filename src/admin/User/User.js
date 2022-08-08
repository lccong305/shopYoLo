import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/";

import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser,resetPW, getUserdetailEdit, getAlluser } from "../../redux/apiRequest";
// import AddProduct from "./AddProduct";
// import EditProduct from "./EditProduct";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.isFetching);
  const [columns, setColumns] = useState([]);
  const loading1 = useSelector((state) => state.user.isAdd);
  const loading2 = useSelector((state) => state.user.isUpdate);
  const getdetail = useSelector((state) => state.user.isDetail);
  const [pending, setPending] = React.useState(true);
  const [size, setSize] = useState();
  const [open, setOpen] = useState(false);
  console.log(users);
  useEffect(()=>{
      setPending(loading1);
      console.log("loading1");
      dispatch(getAlluser());
  },[loading1]);
  useEffect(()=>{
    dispatch(getAlluser());
    console.log("loading2");
},[loading2]);
  useEffect(()=>{
    console.log("loadingne");
    dispatch(getAlluser());
},[]);
  const options = [
    {
      id :"1",
      name: "Admin",
    },
    { 
      id : "2",
      name: "User",
    },
  ];
  const options1 =[
    {
      id :"1",
      name: "Gentlemen",
    },
    { 
      id : "2",
      name: "Lady",
    },
  ];
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [success,setSuccess] = useState(false);
  useEffect(()=>{
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "ID",
          selector: (row) => row.id,
          sortable: true,
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
        },
        {
          name: "Username",
          selector: (row) => row.username,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row) => row.email,
          sortable: true,
        },
        {
          name: "Phone",
          selector: (row) => row.phone,
          sortable: true,
        },
        {
          name: "image",
          width: "100px",
          height: "100px",
          selector: (row) => <img src={row.avatar} />,
          sortable: true,
        },
        {
          name: "Action",
          width: " 400px",
          cell: (row) => (
            <div className="button-action-product">
              <button
                onClick={(e) => handleEdit(e, row.username)}
                className="btn-edit-product-admin btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleDelete(e, row.id)}
                className="btn-edit-product-admin btn btn-primary"
              >
                Delete
              </button>
              <button
                onClick={(e) => handleResetPW(e, row.id)}
                className="btn-edit-product-admin btn btn-primary"
              >
                ResetPW
              </button>
            </div>
          ),
        },
      ]);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
},[]);  
  // const columns = [
  //       {
  //         name: "ID",
  //         selector: (row) => row.id,
  //         sortable: true,
  //       },
  //       {
  //         name: "Name",
  //         selector: (row) => row.name,
  //         sortable: true,
  //       },
  //       {
  //         name: "Username",
  //         selector: (row) => row.username,
  //         sortable: true,
  //       },
  //       {
  //         name: "Email",
  //         selector: (row) => row.email,
  //         sortable: true,
  //       },
  //       {
  //         name: "Phone",
  //         selector: (row) => row.phone,
  //         sortable: true,
  //       },
  //       {
  //         name: "image",
  //         width: "100px",
  //         height: "100px",
  //         selector: (row) => <img src={row.avatar} />,
  //         sortable: true,
  //       },
  //       {
  //         name: "Action",
  //         width: " 400px",
  //         cell: (row) => (
  //           <div className="button-action-product">
  //             <button
  //               onClick={(e) => handleEdit(e, row.id)}
  //               className="btn-edit-product-admin btn btn-primary"
  //             >
  //               Edit
  //             </button>
  //             <button
  //               onClick={(e) => handleDelete(e, row.id)}
  //               className="btn-edit-product-admin btn btn-primary"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         ),
  //       },
  //     ]
    

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteUser(dispatch, id);
    console.log("hehehe" + id);
  };
  const handleResetPW = (e, id) => {
    e.preventDefault();
    resetPW(dispatch, id);
    console.log("resetpass" + id);
  };
  const handleAdd = () => {
    setShowAddUser(!showAddUser);
  };

  const handleEdit = (e, slug) => {
    e.preventDefault();
    getUserdetailEdit(dispatch, slug);
    if(!getdetail){
      setShowEdit(!showEdit);
    }
    console.log(getdetail);
      };
    const user = useSelector((state) => state.user.userdetail);
   console.log(user);

  function handleClose() {
    setOpen(false);
  };

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  // const filteredItems = products.filter(
  //   (item) =>
  //     item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  // );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
  }, [filterText, resetPaginationToggle]);
  const [search,setSearch] = useState(false);
  const [filter2,setFilter] = useState("");
  const [filter1,setFilter1] = useState([]);
  const handleSearch = (e) =>{
    if(e.target.value !==""){
      setSearch(true);
      setFilter(e.target.value);
      console.log(e.target.value);
   const filter12 = users.filter(item => item.username.includes(e.target.value));
      setFilter1(filter12);
      console.log(filter12);
    }
    else {
      setSearch(false);
      setFilter(e.target.value);
    }
    
  };
  return (
    <AdminLayout>
         <div>
            <button
              onClick={() => handleAdd()}
              className="btn.btn-sm btn-info add-product"
            >
              Add new product
            </button>
             <input
             autoFocus
             value={filter2}
              type="text"
              className="cc-input form-control"
              placeholder="Search here username"
          onChange={handleSearch}
            />
          </div>
      {search ?    <DataTable
        fixedHeader
        fixedHeaderScrollHeight="500PX"
        progressPending={pending}
        columns={columns}
        data={filter1}
        pagination
        subHeader
        persistTableHead
        // subHeaderComponent={
        //   <div>
        //     <button
        //       onClick={() => handleAdd()}
        //       className="btn.btn-sm btn-info add-product"
        //     >
        //       Add new product
        //     </button>
        //     <input
        //       onChange={handleSearch}
        //       placeholder="username"
        //       type="text"
        //       className="cc-input form-control"
        //       placeholder="Search here"
        //     />
        //   </div>
        // }
      />: 
       <DataTable
        fixedHeader
        fixedHeaderScrollHeight="500PX"
        progressPending={pending}
        columns={columns}
        data={users}
        pagination
        subHeader
        persistTableHead
        // subHeaderComponent={
        //   <div>
        //     <button
        //       onClick={() => handleAdd()}
        //       className="btn.btn-sm btn-info add-product"
        //     >
        //       Add new product
        //     </button>
        //     <input
        //       onChange={handleSearch}
        //       placeholder="username"
        //       type="text"
        //       className="cc-input form-control"
        //       placeholder="Search here"
        //     />
        //   </div>
        // }
      />
}
       {/* <div className="product__info__item">
        <div className="product__info__item__title">Kích cỡ</div>
        <div className="product__info__item__list">
          {sizeData.map((item, index) => (
            <div
              key={index}
              className={`product__info__item__list__item ${
                size === item ? "active" : ""
              }`}
              onClick={() => setSize(item.size)}
            >
              <span className="product__info__item__list__item__size">
                {item.size}
              </span>
            </div>
          ))}
        </div>
      </div>  */}
      {showAddUser && (
        <AddUser
          showAddUser={showAddUser}
          setShowAddUser={setShowAddUser}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      
      {showEdit && (
        <EditUser
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          user={user}
        />
      )} 
    </AdminLayout>
  );
};

export default User;
