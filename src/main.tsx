import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import IndexPage from "./IndexPage";
import ProductsPage from "./products/ProductsPage";
import RequestsPage from "./requests/RequestsPage";
import UserPage from "./users/UserPage";
import UserCreatePage from "./users/UserCreatePage";
import UserEditPage from "./users/UserEditPage";
import ErrorPage from "./ErrorPage";
import ProductsCreatePage from "./products/ProductsCreatePage";
import ProductsEditPage from "./products/ProductsEditPage";
import RequestsDetailPage from "./requests/RequestsDetailPage";
import RequestsCreatePage from "./requests/RequestsCreatePage";
import RequestsEditPage from "./requests/RequestsEditPage";
import VendorDetailPage from "./vendor/VendorDetailPage";
import VendorPage from "./vendor/VendorPage";
import VendorCreatePage from "./vendor/VendorCreatePage";
import VendorEditPage from "./vendor/VendorEditPage";


import SignInPage from "./account/SignInPage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: "Requests", element: <RequestsPage /> },
          { path: "Requests/create", element: <RequestsCreatePage /> },
          { path: "Requests/edit/:id", element: <RequestsEditPage /> },
          { path: "Products", element: <ProductsPage /> },
          { path: "Products/create", element: <ProductsCreatePage /> },
          { path: "Products/edit/:id", element: <ProductsEditPage /> },
          { path: "Users", element: <UserPage /> },
          { path: "Users/create", element: <UserCreatePage /> },
          { path: "Users/edit/:id", element: <UserEditPage /> },
          { path: "Requests/detail/:id", element: <RequestsDetailPage /> },
          { path: "Vendors", element: <VendorPage /> },
          { path: "Vendors/create", element: <VendorCreatePage /> },
          { path: "Vendors/edit/:id", element: <VendorEditPage /> },
          { path: "Vendors/detail/:id", element: <VendorDetailPage /> },
          { path: "Requests/detail/:id/Requestsitem/create", element: <RequestsCreatePage /> },
          { path: "Requests/detail/:id/Requestsitem/edit/:itemId", element: <RequestsEditPage /> }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
