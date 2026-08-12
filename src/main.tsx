import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import Index from "./Index";
import ProductsPage from "./products/ProductsPage";
import RequestsPage from "./requests/RequestsPage";
import UsersPage from "./users/UsersPage";
import UserCreatePage from "./users/UserCreatePage";
import RequiredAdmin from "./account/RequiredAdmin";
import ErrorPage from "./ErrorPage";
import ProductCreatePage from "./products/ProductCreatePage";
import ProductEditPage from "./products/ProductEditPage";
import  RequestDetailPage  from "./requests/RequestDetailPage";
import RequestCreatePage from "./requests/RequestCreatePage";
import RequestEditPage from "./requests/RequestEditPage";
import VendorDetailPage from "./vendors/VendorDetailPage";
import VendorsPage from "./vendors/VendorsPage";
import VendorCreatePage from "./vendors/VendorCreatePage";
import VendorEditPage from "./vendors/VendorEditPage";
import RequestLineCreate from "./requestLines/RequestLineCreate";
import RequestLineEdit from "./requestLines/RequestLineEdit";
import SignIn from "./account/SignIn";
import Layout from "./Layout";
import UserEditPage from "./users/UserEditPage";

const router = createBrowserRouter([
  {
       path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "signin", element: <SignIn /> },
      {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          { path: "requests", element: <RequestsPage /> },
          { path: "requests/create", element: <RequestCreatePage /> },
          { path: "requests/edit/:id", element: <RequestEditPage /> },
          { path: "requests/detail/:id", element: <RequestDetailPage /> },
          { path: "requests/detail/:id/requestline/create", element: <RequestLineCreate /> },
          { path: "requests/detail/:id/requestline/edit/:itemId", element: <RequestLineEdit /> },
          {
            element: <RequiredAdmin />,
            children: [
              { path: "products", element: <ProductsPage /> },
              { path: "products/create", element: <ProductCreatePage /> },
              { path: "products/edit/:id", element: <ProductEditPage /> },
              { path: "users", element: <UsersPage /> },
              { path: "users/create", element: <UserCreatePage /> },
              { path: "users/edit/:id", element: <UserEditPage /> },
              { path: "vendors", element: <VendorsPage /> },
              { path: "vendors/create", element: <VendorCreatePage /> },
              { path: "vendors/edit/:id", element: <VendorEditPage /> },
              { path: "vendors/detail/:id", element: <VendorDetailPage /> },
            ]
          }
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