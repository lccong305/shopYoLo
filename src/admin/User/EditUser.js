import "./adduser.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import PasswordStrengthBar from 'react-password-strength-bar';
import PhoneInput from 'react-phone-number-input'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { addUser,getAlluser,updateUser } from "../../redux/apiRequest";
const AddUser =({showEdit,setShowEdit,user}) => {
  const dispatch = useDispatch();
  console.log(user);
  const users = useSelector((state) => state.user.users);
  const flag = useSelector((state) => state.productModal.value);
  const [id,setid] = useState(user.id);
  const [phone,setPhone] = useState(user.phone);
  const [username,setUser] = useState(user.username);
  const [pass,setPass] = useState(user.pass);
  const [pass1,setPass1] = useState("");
  const [email,setEmail] = useState(user.email);
  const [address,setAddress] = useState(user.address);
  const [firstname,setFirstname] = useState(user.firstName);
  const [lastname,setLastname] = useState(user.name);
  const [isDisabled, setIsDisabled] = useState(true);
  const [phonevalid,setPhonevalid] = useState(true);
  const [roles,setRoles] =useState(user.roles);
  const handleAddUser = (e) => {
    e.preventDefault();
    var x = document.getElementsByTagName("BODY")[0];
    x.classList.remove("act_body");
    const newUser = {
        id : id,
        username : username,
      //  password :pass,
        email : email,
        firstName : firstname,
        name : lastname,
        phone : phone,
        address : address,
        gender : true,
       avatar : null,
      roles : roles,

    };
    if(isValidPhoneNumber(phone) && namevalid ){
      console.log("quá đã");
      setPhonevalid(true);
      console.log(newUser);
      updateUser(dispatch,newUser);
    //  dispatch(getAlluser());
      setUser('');
      setEmail('');
      setFirstname('');
      setLastname('');
      setPhone('');
      setAddress('');
   setShowEdit(!showEdit);
    }
    else {
      if(!isValidPhoneNumber(phone)){
        setPhonevalid(false);
      }
      console.log("ngu");
      console.log(passok);
      console.log(phonevalid)
      console.log(namevalid)
      console.log(errorPass);
    }
  //  addUserAccount(newUser,dispatch);
 //   addProduct(newProduct, dispatch);
  // getAllProduct(dispatch);
  };
  const handleClose = (e) => {
    e.preventDefault();
    var x = document.getElementsByTagName("BODY")[0];
    x.classList.remove("act_body");
    setUser('');
    setEmail('');
    setFirstname('');
    setLastname('');
    setPhone('');
    setAddress('');
 //   setAvatar(null);
//dispatch(closeModal());
  };
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
  // useEffect(() => {
  //   if(pass.length!==0){
  //     setIsDisabled(false);
  //   }
  //   else {
  //     setIsDisabled(true);
  //   }
  //   }, [pass]);
      const [passok,setpassoke] = useState(true);
  const handlepass = (e) =>{
    const passs = e.target.value;
    setPass(e.target.value);
    if(passs.length!==0){
      setIsDisabled(false);
      const passwordLength= passs.length;
      const poorRegExp = /[a-z]/;
      const poorRegExp1 = /[A-Z]/;
      const weakRegExp = /(?=.*?[0-9])/;;
      const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
      const whitespaceRegExp = /^$|\s+/;
      const poorPassword= poorRegExp.test(passs);
      const poorPassword1= poorRegExp1.test(passs);
      const weakPassword= weakRegExp.test(passs);
      const strongPassword= strongRegExp.test(passs);
      const whiteSpace= whitespaceRegExp.test(passs);
      console.log("a" + poorPassword + "f" + poorPassword1 + "b" +weakPassword +"c" +strongPassword +"d" + whiteSpace + "pass" + pass) ;
      if(passwordLength >= 6 && (poorPassword && weakPassword) && strongPassword){
        setpassoke(true);
      }
      else {
      setpassoke(false);}
    }
    else {
      setIsDisabled(true);
      setpassoke(true);
    }
    console.log(passs);
    console.log(passok);
  
  }
  const handlepass1 = (e) =>{
    if(e.target.value !== pass && e.target.value !==''){
      setErrorpass(true);
  }
  else {
    setErrorpass(false);

  }
      setPass1(e.target.value);
  }
  const handleemail =(e) =>{
    setEmail(e.target.value);
  }
  const [errorPass,setErrorpass] = useState(false); 
  const [value,setValue] = useState(true);
  const [errorEmail,setErroremail] = useState(false); 
  // const handleimg = (e) =>{
  //   const [file] = e.target.files;
  //   setAvatar(URL.createObjectURL(file));
  //   setAvatar1(e.target.value);
  // }
  const [namevalid,setNamevalid] = useState(true);
  const handleUser = (e) =>{
    const name = e.target.value;
    setUser(name);
    console.log(name);
     const rs = users.filter(user => user.username == name );

    if(rs.length >0){ 
      setNamevalid(false);
    }
    else {
      setNamevalid(true);
    }
  }
  const [avatar1,setAvatar1] = useState(null);
  return (
    <div className={`addproduct-wrapper ${flag  ? "active" : ""} `}>
    <div className="overlay"></div>
    <div className="edit-content">
      <h2 className="edit-tittle">User Infomation</h2>
      <form method="put" encType="multipart/form-data" onSubmit={handleAddUser}>
        <div className="form-group-edit">
          <label> Userame</label>
          <input
          required={true}
          value={username}
            type="text"
            className="product-input-ad"
            onChange={handleUser}
          />
           <div className="error">{namevalid ? "" : "Username have already use" }</div>
        </div>
        <div className="form-group-edit">
          <label>Email</label>
          <input
          required={true}
          value={email}
            type="email"
            className="product-input-ad"
            onChange={handleemail}
          />
        </div>
        <div className="name">
        <div className="form-group-edit" >
          <label>First name</label>
          <input 
          required={true}
            value={firstname}
            type="text"
            className="product-input-ad"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
            <div className="form-group-edit" >
          <label>Last name</label>
          <input 
          required={true}
          value={lastname}
            type="text"
            className="product-input-ad"
            onChange={(e) => 
              setLastname(e.target.value)}

          />
        </div>
        </div>
        
        <div className="form-group-edit">
          <label>Phone</label>
            <PhoneInput
            required={true}
  minLength="13"
  className="product-input-ad"
defaultCountry="VN"
            value={phone}
      placeholder="Enter phone number"
       onChange={setPhone}
     />
    <div className="error">{phonevalid ? "" : "Phone number is not valied" }</div> 
        </div>
        <div className="form-group-edit" >
          <label>Address</label>
          <input 
          value={address}
          required={true}
            type="text"
            className="product-input-ad"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="name1">
        {/* <div className="form-group-edit">
          <label>Avatar</label>
          <input
          required={true}
          value={avatar1}
            type="file"
            className="product-input-ad"
            onChange={handleimg}
          />
          </div>
          <div className="inside-img">
          <img src={avatar} alt="Avatar" className="avatar-add"/>
          </div> */}
        </div>
       
     
        <div className="form-button-edit1">
      
          <button
            type="submit"
            className="btn-add-product"
          >
            Edit user
          </button>

          <button onClick={() => setShowEdit(false)}   >Close</button>
        </div>
      
      </form>
    </div>
  </div>
  )
}

export default AddUser