import { createBrowserRouter } from "react-router-dom";
import Signin, { actionSignin } from "./pages/Signin";
import Signup, { actionSignup } from "./pages/Signup";
import Category from "./pages/Category";
import { loaderCategoryPage } from "./pages/Category";
import { loaderOrderPage } from "./pages/Order";
import Order from "./pages/Order";
import { actionFood, loaderDropdown } from "./pages/Food";
import Food from "./pages/Food";
import RootLayout from "./components/RootLayout";
import Product, { loaderProductPage } from "./pages/Product";
import ProductEdit, { actionProductEdit, loaderDropdown2 } from "./pages/ProductEdit";
import RootProduct from "./components/RootProduct";
import RootOrder from "./components/RootOrder";
import MyAccount from "./pages/MyAccount";
import CategoryCreate, { actionCategoryCreate } from "./pages/CategoryCreate";
import { checkAuthLoader } from "./Api/Authen";
import RootCategory from "./components/RootCategory";
import { actionCategoryChange } from "./pages/CategoryChange";
import CategoryChange from "./pages/CategoryChange";
// import ProductList from "./components/ProductList";

export const router = createBrowserRouter([
  { path: "signin", element: <Signin />, action: actionSignin },
  { path: "signup", element: <Signup />, action: actionSignup },
  {
    path: "/",
    element: <RootLayout />,
    loader: checkAuthLoader,
    children: [
      { index: true, element: <Order />, action: actionSignin ,loader: loaderOrderPage,},
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
