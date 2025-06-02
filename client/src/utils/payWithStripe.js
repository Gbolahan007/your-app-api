import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OHG7qBqSNRl3dSZcKHRT6pMicU85CjA5Kq1Ar48uaAWNYjyXgaTSIMLaaQi0R0e1lj5SSh0ECnKHTITxvwKutCB00V0hZ27W7",
);

const payWithStripeCheckout = async ({
  email,
  amount,
  firstName,
  lastName,
  onSuccess,
  onClose,
  onError,
}) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe failed to load!");
    }

    // Validate inputs
    if (!email || !amount || amount <= 0 || !firstName || !lastName) {
      throw new Error("Invalid input parameters");
    }

    // Create checkout session on your backend
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        currency: "usd",
        customer_email: email,
        customer_name: `${firstName} ${lastName}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    if (onError) onError(error.message);
    if (onClose) onClose();
  }
};

export { payWithStripeCheckout };
