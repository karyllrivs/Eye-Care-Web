import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Home/Main";
import Login from "./Auth/Login";
import Consultation from "./pages/Consultation";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import ConsultationHistory from "./pages/ConsultationHistory";
import ViewProduct from "./pages/ViewProduct";
import AdminLogin from "./pages/Admin/Auth/AdminLogin";
import MainAdmin from "./pages/Admin/MainAdmin";
import AdminConsultation from "./pages/Admin/pages/AdminConsultation";
import AdminSales from "./pages/Admin/pages/AdminSales";
import AdminPatientDetails from "./pages/Admin/pages/AdminPatientDetails";
import AdminInventory from "./pages/Admin/pages/AdminInventory";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./components/Checkout";
import AdminManagement from "./pages/Admin/pages/AdminManagement";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Category from "./components/Category";
import VirtualTryOn from "./pages/VirtualTryOn";
import AdminRoute from "./components/AdminRoute";
import OrderManagement from "./pages/Personnel/children/OrderManagement";
import InventoryManagement from "./pages/Personnel/children/InventoryManagement";
import ConsultationManagement from "./pages/Personnel/children/ConsultationManagement";
import PersonnelLogin from "./pages/Personnel/PersonnelLogin";
import PersonnelLayout from "./pages/Personnel/PersonnelLayout";
import PersonnelRoute from "./components/PersonnelRoute";
import StaffManagement from "./pages/Personnel/children/StaffManagement";
import PersonnelRolesRoute from "./components/PersonnelRolesRoute";
import { Roles } from "./enums/personnel.enum";
import WelcomeScreen from "./pages/Personnel/children/WelcomeScreen";
import Analytics from "./pages/Personnel/children/Analytics";
import PatientManagement from "./pages/Personnel/children/PatientManagement";
import LensManagement from "./pages/Personnel/children/LensManagement";
import AccountManagement from "./pages/Personnel/children/AccountManagement";
import SearchProduct from "./pages/SearchProduct";
import PasswordReset from "./pages/PasswordReset";
import PasswordToken from "./pages/PasswordToken";
import VerifyAccount from "./pages/VerifyAccount";

export const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/category/:category_id", element: <Category /> },
  { path: "/search/:keyword", element: <SearchProduct /> },
  {
    path: "/login",
    element: (
      <UnauthenticatedRoute>
        <Login />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: "/verify-account",
    element: (
      <UnauthenticatedRoute>
        <VerifyAccount />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: "/password-reset",
    element: (
      <UnauthenticatedRoute>
        <PasswordReset />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: "/password-token",
    element: (
      <UnauthenticatedRoute>
        <PasswordToken />
      </UnauthenticatedRoute>
    ),
  },
  {
    path: "/consultation",
    element: (
      <ProtectedRoute>
        <Consultation />
      </ProtectedRoute>
    ),
  },
  { path: "/*", element: <ErrorPage /> },
  { path: "/view-product", element: <ViewProduct /> },
  { path: "/cart", element: <Cart /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/virtual/:product_id", element: <VirtualTryOn /> },
  {
    path: "/checkout",
    // No need to pass cart here
    element: <Checkout />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-history",
    element: (
      <ProtectedRoute>
        <OrderHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/consultation-history",
    element: (
      <ProtectedRoute>
        <ConsultationHistory />
      </ProtectedRoute>
    ),
  },
  { path: "/admin-login", element: <AdminLogin /> },
  {
    path: "/admin-main",
    element: (
      <AdminRoute>
        <MainAdmin />
      </AdminRoute>
    ),
  },
  {
    path: "/admin-consultation",
    element: (
      <AdminRoute>
        <AdminConsultation />
      </AdminRoute>
    ),
  },
  {
    path: "/admin-sales",
    element: (
      <AdminRoute>
        <AdminSales />
      </AdminRoute>
    ),
  },
  {
    path: "/admin-patient-visit-datails",
    element: (
      <AdminRoute>
        <AdminPatientDetails />
      </AdminRoute>
    ),
  },
  {
    path: "/admin-inventory",
    element: (
      <AdminRoute>
        <AdminInventory />
      </AdminRoute>
    ),
  },
  {
    path: "/order-management",
    element: (
      <AdminRoute>
        <AdminManagement />
      </AdminRoute>
    ),
  },
  {
    path: "/personnel-login",
    element: <UnauthenticatedRoute>
      <PersonnelLogin />
    </UnauthenticatedRoute>,
  },
  {
    path: "/personnel",
    element: <PersonnelRoute>
      <PersonnelLayout />
    </PersonnelRoute>,
    children: [
      {
        index: true,
        element: <WelcomeScreen />
      },
      {
        path: "order",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.staff]}>
          <OrderManagement />
        </PersonnelRolesRoute>
      },
      {
        path: "inventory",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.staff]}>
          <InventoryManagement />
        </PersonnelRolesRoute>
      },
      {
        path: "consultation",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.staff]}>
          <ConsultationManagement />
        </PersonnelRolesRoute>
      },
      {
        path: "analytics",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]}>
          <Analytics />
        </PersonnelRolesRoute>
      },
      {
        path: "patient",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]}>
          <PatientManagement />
        </PersonnelRolesRoute>
      },
      {
        path: "lens",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]}>
          <LensManagement />
        </PersonnelRolesRoute>
      },
      {
        path: "staff",
        element: <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]}>
          <StaffManagement />
        </PersonnelRolesRoute>
      },
      {
        path: "accounts",
        element: <PersonnelRolesRoute roles={[Roles.super_admin]}>
          <AccountManagement />
        </PersonnelRolesRoute>
      }
    ]
  }
]);
