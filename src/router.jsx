import { createBrowserRouter } from "react-router-dom";
import Signin, { actionSignin } from "./pages/Authenication/Signin";
import Signup, { actionSignup } from "./pages/Authenication/Signup";
import Category ,{ loaderCategoryPage }from "./pages/Category/Category";
import Order,{ loaderOrderPage } from "./pages/Order/Order";
import Food, { actionFood, loaderDropdown } from "./pages/Product/Food";
import RootLayout from "./components/RootLayout";
import Product, { loaderProductPage } from "./pages/Product/Product";
import ProductEdit, { actionProductEdit, loaderDropdown2 } from "./pages/Product/ProductEdit";
import RootProduct from "./components/RootProduct";
import MyAccount, { actionProfile } from "./pages/Profile/MyAccount";
import CategoryCreate, { actionCategoryCreate } from "./pages/Category/CategoryCreate";
import { checkAuthLoader } from "./Api/Authen";
import RootCategory from "./components/RootCategory";
import CategoryChange,{ actionCategoryChange } from "./pages/Category/CategoryChange";

// import ProductList from "./components/ProductList";

export const router = createBrowserRouter([
  { path: "signin", element: <Signin />, action: actionSignin },
  { path: "signup", element: <Signup />, action: actionSignup },
  {
    path: "/",
    element: <RootLayout />,
    loader: checkAuthLoader,
    action:actionProfile,
    children: [
      { index: true, element: <Order />, action: actionSignin ,loader: loaderOrderPage,},
      { path:'order', element: <Order />, action: actionSignin ,loader: loaderOrderPage,},

//  {
//         path: "order",
//         element: <RootOrder />,
//         loader: loaderOrderPage,
//         id: "order",
//         children: [
//           {
//             index: true,
//             element: <Order />,
//           },
//         ],
//       },
      {
        path: "category",
        element: <RootCategory />,
        loader: loaderCategoryPage,
        id: "category",
        children: [
          {
            index: true,
            element: <Category />,
          },
          {
            path: ":id",
            element: <CategoryChange />,
            action: actionCategoryChange,
          },
        ],
      },

      {
        path: "product",
        element: <RootProduct />,
        loader: loaderProductPage,
        id: "product",
        children: [
          {
            index: true,
            element: <Product />,
          },
          { path: ":id", element: <ProductEdit />, action: actionProductEdit,loader: loaderDropdown2 },
        ],
      },
      { path: "food", element: <Food />, action: actionFood,loader: loaderDropdown },
      { path: "myaccount", element: <MyAccount /> },
      {
        path: "categorycreate",
        element: <CategoryCreate />,
        action: actionCategoryCreate,
      },
    ],
  },
]);
