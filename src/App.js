// import React from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Footer from "./components/Footer";
// // import Header from "./components/Header";
// // import ProductViewModal from "./components/ProductViewModal";
// import { publicRoutes } from "./routes/Routes";
// import DefaultLayout from "./layouts/DefaultLayout";
// import ExtraLayout from "./layouts/ExtraLayout";
// import { Fragment } from "react";

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {publicRoutes.map((route, index) => {
//             const Page = route.component;
//             let Layout = DefaultLayout;
//             //let privateRoute = route.property;

//             if (route.layout) {
//               Layout = route.layout;
//             } else if (route.layout === null) {
//               Layout = Fragment;
//             }
//             return (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={
//                   <Layout>
//                     <Page />
//                   </Layout>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
