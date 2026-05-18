import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import LoadingSkeleton from "../components/LoadingSkeleton";

const HomePage = lazy(() => import("../pages/HomePage"));
const ProductListingPage = lazy(() => import("../pages/ProductListingPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccessPage"));
const FestivalCollectionPage = lazy(() => import("../pages/FestivalCollectionPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Admin Pages
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const AdminOrdersPage = lazy(() => import("../pages/admin/AdminOrdersPage"));
const AdminSlotsPage = lazy(() => import("../pages/admin/AdminSlotsPage"));
const AdminRidersPage = lazy(() => import("../pages/admin/AdminRidersPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success" element={<OrderSuccessPage />} />
          <Route path="/festival/:name" element={<FestivalCollectionPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="slots" element={<AdminSlotsPage />} />
          <Route path="riders" element={<AdminRidersPage />} />
        </Route>

        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
      </Routes>
    </Suspense>
  );
}
