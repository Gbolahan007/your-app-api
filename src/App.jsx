import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import PageNotFound from "./PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ScrollToTop from "./ScrollTop";
import ProductDisplay from "./ProductDisplay";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./contexts/ModalProvider";
import Checkout from "./pages/Checkout"; // ✅ Import Checkout Page
import SignInSignUp from "./pages/sign up/SignInSignUp";
import AuthCallback from "./pages/AuthCallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/product/:category/:slug"
                element={<ProductDisplay />}
              />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/signup" element={<SignInSignUp />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "#4CAF50",
              color: "#FFFFFF",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#D32F2F",
              color: "#FFFFFF",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "#222222",
            color: "#E0E0E0",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
