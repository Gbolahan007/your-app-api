import { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SuccessPage from "./checkout/SuccessPage";
import CheckoutProgress from "./checkout/CheckoutProgress";
import ShippingForm from "./checkout/ShippingForm";
import PaymentForm from "./checkout/PaymentForm";
import OrderSummary from "./checkout/OrderSummary";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

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

  // React Hook Form for payment info
  const {
    register: registerPayment,
    handleSubmit: handleSubmitPayment,
    formState: { errors: paymentErrors },
  } = useForm({
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
  });

  // Calculate cart totals using useMemo for optimization
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 100 ? 0 : 9.99;
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
    setStep(2);
  }, []);

  const onSubmitPayment = useCallback(async (data) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPaymentComplete(true);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
              <PaymentForm
                register={registerPayment}
                errors={paymentErrors}
                handleSubmit={handleSubmitPayment}
                onSubmit={onSubmitPayment}
                loading={loading}
                total={total}
                formatCurrency={formatCurrency}
                setStep={setStep}
              />
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
