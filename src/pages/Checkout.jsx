import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SuccessPage from "./checkout/SuccessPage";
import CheckoutProgress from "./checkout/CheckoutProgress";
import ShippingForm from "./checkout/ShippingForm";
import OrderSummary from "./checkout/OrderSummary";
import sendOrderEmail from "../utils/sendOrderEmail";
import { clearItem } from "../cart/cartSlice";
import { payWithStripeCheckout } from "../utils/payWithStripe";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // React Hook Form for shipping info
  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: shippingErrors },
    watch: watchShipping,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      country: "United States",
    },
  });

  // Calculate cart totals using useMemo for optimization
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 1000 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cart]);

  const formatCurrency = useCallback((value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  // Submit handlers
  const onSubmitShipping = useCallback((data) => {
    localStorage.setItem("shippingInfo", JSON.stringify(data));
    setStep(2);
  }, []);

  const onSubmitPayment = useCallback(async () => {
    setLoading(true);
    setError(null);

    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));

    if (!shippingInfo) {
      setError("Shipping information is missing");
      setLoading(false);
      return;
    }

    await payWithStripeCheckout({
      email: shippingInfo.email,
      amount: total,
      firstName: shippingInfo.firstName,
      lastName: shippingInfo.lastName,
      onSuccess: async () => {
        try {
          await sendOrderEmail({
            shippingInfo,
            cart,
            total,
          });
          console.log("Order confirmation email sent!");
        } catch (error) {
          console.error("Failed to send order email:", error);
        }

        setPaymentComplete(true);
        setLoading(false);
        dispatch(clearItem());
      },
      onClose: () => {
        console.log("Payment closed by user");
        setLoading(false);
      },
      onError: (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      },
    });
  }, [total, cart, dispatch]);

  // If payment is complete, show SuccessPage
  if (paymentComplete) {
    return (
      <SuccessPage
        email={watchShipping("email")}
        total={total}
        formatCurrency={formatCurrency}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Checkout</h1>
        <CheckoutProgress step={step} />

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column - Form */}
          <div className="flex-1">
            {step === 1 ? (
              <ShippingForm
                register={registerShipping}
                errors={shippingErrors}
                handleSubmit={handleSubmitShipping}
                onSubmit={onSubmitShipping}
                loading={loading}
              />
            ) : (
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-semibold">Payment</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <button
                  onClick={onSubmitPayment}
                  disabled={loading}
                  className={`w-full rounded-md px-4 py-2 text-white ${
                    loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Processing..." : "Pay with Stripe"}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Back to Shipping
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96">
            <OrderSummary
              cart={cart}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
