import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import App from "./App";
import Index from "./Index";
import ProductsPage from "./products/ProductsPage";
import RequestsPage from "./requests/RequestsPage";
import UserPage from "./users/UserPage";
import UserCreatePage from "./users/UserCreatePage";
import RequiredAdmin from "./account/RequiredAdmin";
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
import RequestLinesCreatePage from "./requestLines/RequestLineCreatePage";
import RequestLinesEditPage from "./requestLines/RequestLineEditPage";
import SignIn from "./account/SignIn";
import Layout from "./Layout";
import UsersEditPage from "./users/UsersEditPage";

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
          { path: "Requests", element: <RequestsPage /> },
          { path: "Requests/create", element: <RequestsCreatePage /> },
          { path: "requests/edit/:id", element: <RequestsEditPage /> },
          { path: "Requests/detail/:id", element: <RequestsDetailPage /> },
          { path: "Requests/detail/:id/RequestLine/Create", element: <RequestLinesCreatePage /> },
          { path: "Requests/detail/:id/RequestLine/edit/:itemId", element: <RequestLinesEditPage /> },
          {
            element: <RequiredAdmin />,
            children: [
              { path: "Products", element: <ProductsPage /> },
              { path: "Products/create", element: <ProductsCreatePage /> },
              { path: "Products/edit/:id", element: <ProductsEditPage /> },
              { path: "Users", element: <UserPage /> },
              { path: "Users/create", element: <UserCreatePage /> },
              { path: "Users/edit/:id", element: <UsersEditPage /> },
              { path: "Vendors", element: <VendorPage /> },
              { path: "Vendors/create", element: <VendorCreatePage /> },
              { path: "Vendors/edit/:id", element: <VendorEditPage /> },
              { path: "Vendors/detail/:id", element: <VendorDetailPage /> },
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